import os
import sqlite3
import urllib.parse
import requests
from bs4 import BeautifulSoup
from .prefix_function import is_likely_perfective
from .present_tense import create_present_tense, get_wiktionary_verb_present, log_error


def get_wiktionary_verb_future(lemma):
    """
    Scrapes Czech Wiktionary strictly for aspect and an explicit 'Budoucí čas' table row.
    """
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

        # Look specifically for an explicit 'budoucí' row
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
    # -------------------------------------------------------------------------
    # STEP 1: CLEANING
    # -------------------------------------------------------------------------
    is_reflexive = (
        "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    )
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean
    person_num = f"{person}{number}"

    if not base_verb.endswith("t"):
        return "Not a verb", None, False, False

    # -------------------------------------------------------------------------
    # STEP 2: DATABASE OVERRIDES & ASPECT LOOKUP
    # -------------------------------------------------------------------------
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    is_verified = False
    is_actually_irregular = False
    vid_clean = None

    try:
        cur.execute(
            "SELECT id, is_irr, irr_type, vid FROM words WHERE lemma = ?",
            (lemma_clean,),
        )
        row = cur.fetchone()

        if not row:
            cur.execute(
                "SELECT id, is_irr, irr_type, vid FROM words WHERE lemma = ?",
                (base_verb,),
            )
            row = cur.fetchone()

        if row:
            word_id, is_irr, irr_type, vid = row
            is_verified = True
            vid_clean = str(vid).strip().lower() if vid else None

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
                    return res, f"Aspect: {vid_clean or 'imperfective'}", True, True
        conn.close()
    except Exception:
        if conn:
            conn.close()

    # -------------------------------------------------------------------------
    # STEP 3: WIKTIONARY CHECK FOR BUDOUCÍ ČAS
    # -------------------------------------------------------------------------
    wiki_lookup_lemma = lemma_clean if is_reflexive else base_verb
    wiki = get_wiktionary_verb_future(wiki_lookup_lemma)

    if wiki:
        is_verified = True
        if wiki.get("aspect"):
            vid_clean = wiki.get("aspect")

        # RULE 1: If explicit 'budoucí' row is found, use it NO MATTER WHAT
        wiki_forms = wiki.get("forms", {})
        if person_num in wiki_forms and wiki_forms[person_num]:
            wiki_future = wiki_forms[person_num].strip()
            if is_reflexive and not wiki_future.endswith(f" {is_reflexive}"):
                wiki_future = f"{wiki_future} {is_reflexive}"
            return wiki_future, f"Aspect: {vid_clean}", True, is_actually_irregular

    # -------------------------------------------------------------------------
    # STEP 4: NO BUDOUCÍ ČAS FOUND -> FALLBACK BASED ON ASPECT
    # -------------------------------------------------------------------------
    if not vid_clean:
        if is_likely_perfective(base_verb):
            vid_clean = "perfective"
        else:
            vid_clean = "imperfective"

    # RULE 2: If Dokonavé (perfective) -> Use the present form
    if vid_clean == "perfective":
        # Scrape present table via Wiktionary present function
        wiki_pres = get_wiktionary_verb_present(wiki_lookup_lemma)
        if wiki_pres and wiki_pres.get("forms", {}).get(person_num):
            pres_val = wiki_pres["forms"][person_num].strip()
            if is_reflexive and not pres_val.endswith(f" {is_reflexive}"):
                pres_val = f"{pres_val} {is_reflexive}"
            return pres_val, f"Aspect: {vid_clean}", True, is_actually_irregular

        # Grammatical fallback for present form if Wiktionary scraping fails
        patterns = {
            'dělat':   {'1S':'ám',  '2S':'áš',  '3S':'á',   '1P':'áme',  '2P':'áte',  '3P':'ají'},
            'prosit':  {'1S':'ím',  '2S':'íš',  '3S':'í',   '1P':'íme',  '2P':'íte',  '3P':'í'},
            'sázet':   {'1S':'ím',  '2S':'íš',  '3S':'í',   '1P':'íme',  '2P':'íte',  '3P':'ejí'}, 
            'děkovat': {'1S':'uji', '2S':'uješ','3S':'uje', '1P':'ujeme','2P':'ujete','3P':'ují'},
            'tisknout':{'1S':'u',   '2S':'neš', '3S':'ne',  '1P':'neme', '2P':'nete', '3P':'nou'},
            'nést':    {'1S':'u',   '2S':'eš',  '3S':'e',   '1P':'eme',  '2P':'ete',  '3P':'ou'}
        }
        cut_map = {'dělat': 2, 'prosit': 2, 'sázet': 2, 'děkovat': 4, 'tisknout': 4, 'nést': 2}
        
        if base_verb.endswith("ovat"): active_p = 'děkovat'
        elif base_verb.endswith("nout"): active_p = 'tisknout'
        elif base_verb.endswith("at"): active_p = 'dělat'
        elif any(base_verb.endswith(s) for s in ["it", "ít", "et", "ět"]): active_p = 'prosit'
        else: active_p = 'nést'

        stem = base_verb[:-cut_map.get(active_p, 2)]
        fut_form = stem + patterns[active_p][person_num]
        if is_reflexive:
            fut_form = f"{fut_form} {is_reflexive}"
            
        return fut_form, f"Aspect: {vid_clean}", is_verified, False

    # RULE 3: If Nedokonavé (imperfective) -> Use budu / budeš / ... + infinitive
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