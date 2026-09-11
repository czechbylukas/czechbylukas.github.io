import os
import sqlite3
import traceback
import urllib.parse
import requests
from bs4 import BeautifulSoup
from .prefix_function import is_likely_perfective
from .present_tense import create_present_tense, get_wiktionary_verb_present, log_error


def get_wiktionary_verb_future(lemma):
    """Scrapes Czech Wiktionary specifically for future tense forms (Budoucí čas)."""
    if not lemma:
        return None

    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(lemma)}"
    headers = {
        "User-Agent": "CzechDeclensionBot/1.0 (contact: your_email@example.com) Python-requests",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
        "Referer": "https://cs.wiktionary.org/",
    }

    try:
        response = requests.get(url, timeout=5, headers=headers)
        if response.status_code != 200:
            return None

        soup = BeautifulSoup(response.content, "html.parser")
        page_text = soup.get_text(" ", strip=True).lower()

        aspect = None
        if "nedokonavé" in page_text:
            aspect = "imperfective"
        elif "dokonavý" in page_text or "dokonavé" in page_text:
            aspect = "perfective"

        forms = {}
        form_keys = ("1S", "2S", "3S", "1P", "2P", "3P")

        def clean_form(cell):
            return (
                cell.get_text(" ", strip=True)
                .split(",")[0]
                .split("[")[0]
                .replace("\xad", "")
                .strip()
            )

        tables = soup.find_all("table")
        for table in tables:
            table_text = table.get_text(" ", strip=True).lower()
            if "budoucí" not in table_text:
                continue

            for row in table.find_all("tr"):
                cells = row.find_all(["th", "td"])
                if len(cells) < 7:
                    continue

                row_label = cells[0].get_text(" ", strip=True).lower()
                if "budoucí" in row_label:
                    values = [clean_form(cell) for cell in cells[1:7]]
                    if all(values):
                        forms = dict(zip(form_keys, values))
                        break

            if len(forms) == 6:
                break

        return {"aspect": aspect, "forms": forms}

    except Exception:
        return None


def create_future_tense(lemma, person, gender, number):
    # 1. Cleaning
    is_reflexive = (
        "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    )
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean
    person_num = f"{person}{number}"

    if not base_verb.endswith("t"):
        return "Not a verb", None, False, False

    # 2. Database Lookup
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(
        os.path.join(current_dir, "..", "czech_master.db")
    )

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    is_verified = False
    is_actually_irregular = False
    vid_clean = "unknown"

    try:
        cur.execute(
            "SELECT id, is_irr, irr_type, vid, category FROM words WHERE lemma"
            " = ?",
            (lemma_clean,),
        )
        row = cur.fetchone()

        if not row:
            cur.execute(
                "SELECT id, is_irr, irr_type, vid, category FROM words WHERE"
                " lemma = ?",
                (base_verb,),
            )
            row = cur.fetchone()

        if row:
            word_id, is_irr, irr_type, vid, category = row
            is_verified = True
            vid_clean = str(vid).strip().lower() if vid else "imperfective"

            # Irregular overrides lookup
            if int(float(is_irr or 0)) == 1:
                col_map = {
                    "1S": "ja_future",
                    "2S": "ty_future",
                    "3S": "on_future",
                    "1P": "my_future",
                    "2P": "vy_future",
                    "3P": "oni_future",
                }
                target_col = col_map.get(person_num)

                cur.execute(
                    f"SELECT {target_col} FROM overrides WHERE word_id = ?",
                    (word_id,),
                )
                over_row = cur.fetchone()
                if (
                    over_row
                    and over_row[0]
                    and str(over_row[0]).lower() != "nan"
                ):
                    res = str(over_row[0]).strip()
                    conn.close()
                    return res, f"Aspect: {vid_clean}", True, True
        else:
            if is_likely_perfective(base_verb):
                vid_clean = "perfective"
            else:
                vid_clean = "imperfective"

        conn.close()
    except Exception as e:
        if conn:
            conn.close()
        return f"DB Error: {str(e)}", None, False, False

    # 3. Wiktionary Verification (looks specifically for dedicated 'Budoucí čas' table)
    wiki_lookup_lemma = lemma_clean if is_reflexive else base_verb
    wiki = get_wiktionary_verb_future(wiki_lookup_lemma)

    if wiki:
        if wiki.get("aspect") == "perfective":
            vid_clean = "perfective"

        wiki_forms = wiki.get("forms", {})
        if person_num in wiki_forms and wiki_forms[person_num]:
            wiki_future = wiki_forms[person_num]
            if is_reflexive and not wiki_future.endswith(f" {is_reflexive}"):
                wiki_future = f"{wiki_future} {is_reflexive}"
            return wiki_future, f"Aspect: {vid_clean}", True, is_actually_irregular

    # 4. Perfective Fallback (Perfective verbs express future via present forms)
    if vid_clean == "perfective":
        res, ver, refl, irr, _, _ = create_present_tense(
            lemma, person, gender, number
        )
        return res, f"Aspect: {vid_clean}", ver, irr

    # 5. Default Imperfective Fallback (budu / budeš / bude / budeme / budete / budou + infinitive)
    aux_map = {
        "1S": "budu",
        "2S": "budeš",
        "3S": "bude",
        "1P": "budeme",
        "2P": "budete",
        "3P": "budou",
    }
    aux = aux_map.get(person_num, "bude")
    return f"{aux} {lemma}", f"Aspect: {vid_clean}", is_verified, False