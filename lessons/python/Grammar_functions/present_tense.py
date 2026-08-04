import sqlite3
import os
import csv
import requests
import urllib.parse
from bs4 import BeautifulSoup
import traceback
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
from .prefix_function import is_likely_perfective


def get_wiktionary_verb_present(lemma):
    """
    Scrapes Czech Wiktionary.

    Returns:
    {
        "aspect": "imperfective" | "perfective",
        "forms": {
            "1S":"...",
            "2S":"...",
            "3S":"...",
            "1P":"...",
            "2P":"...",
            "3P":"..."
        }
    }

    Returns None if nothing could be extracted.
    """

    if not lemma:
        return None

    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(lemma)}"
    headers = {
        "User-Agent": "CzechDeclensionBot/1.0 (contact: your_email@example.com) Python-requests",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
        "Referer": "https://cs.wiktionary.org/"
    }

    try:
        print("Fetching:", url)
        response = requests.get(url, timeout=5, headers=headers)
        print("===== WIKI DEBUG START =====")
        print("URL:", url)
        print("HTTP STATUS:", response.status_code)
        print("PAGE LENGTH:", len(response.text))

        if response.status_code != 200:
            return None

        soup = BeautifulSoup(response.content, "html.parser")
        print("TITLE:", soup.title.get_text() if soup.title else "NO TITLE")

        page_text = soup.get_text(" ", strip=True).lower()
        print("HAS 'sloveso':", "sloveso" in page_text)
        print("HAS 'přítomný':", "přítomný" in page_text)
        print("HAS 'časování':", "časování" in page_text)

        print("FIRST 500 CHARS:")
        print(page_text[:500])

        # -----------------------------------------
        # Detect aspect
        # -----------------------------------------

        if "nedokonavé" in page_text:
            aspect = "imperfective"
        elif "dokonavý" in page_text or "dokonavé" in page_text:
            aspect = "perfective"
        else:
            aspect = None

        # -----------------------------------------
        # Find Present Tense row
        # -----------------------------------------

        forms = {}

        pronouns = {
            "já": "1S",
            "ty": "2S",
            "on": "3S",
            "ona": "3S",
            "ono": "3S",
            "my": "1P",
            "vy": "2P",
            "oni": "3P",
            "ony": "3P"
        }

        tables = soup.find_all("table")

        print("NUMBER OF TABLES:", len(tables))

        for index, table in enumerate(tables):

            table_text = table.get_text(" ", strip=True).lower()
            print("--- TABLE", index, "---")
            print(table_text[:300])

            if "přítomný" not in table_text:
                continue

            for row in table.find_all("tr"):

                cells = row.find_all(["th", "td"])

                if len(cells) < 2:
                    continue

                first = cells[0].get_text(" ", strip=True).lower()

                if first in pronouns:

                    value = (
                        cells[1]
                        .get_text(" ", strip=True)
                        .split(",")[0]
                        .split("[")[0]
                        .replace("\xad", "")
                        .strip()
                    )

                    if value:
                        print("FOUND FORM:", first, "=", value)
                        forms[pronouns[first]] = value

            # Stop searching once we've found all six forms
            if len(forms) >= 6:
                break

        print("FINAL WIKI FORMS:", forms)
        print("FINAL ASPECT:", aspect)
        print("===== WIKI DEBUG END =====")


        if forms:
            return {
                "aspect": aspect,
                "forms": forms
            }

        return {
            "aspect": aspect,
            "forms": {}
        }

    except Exception as e:
        print("Wiki verb scraper ERROR:")
        traceback.print_exc()
        return None

def log_verb_mismatch_to_gsheet(lemma, tense, form_key, gender, my_val, wiki_val):
    """Logs verb errors explicitly to the 'verbs' worksheet tab."""
    try:
        import datetime
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        current_dir = os.path.dirname(os.path.abspath(__file__))
        key_path = os.path.join(current_dir, "..", "service_account.json")
        creds = ServiceAccountCredentials.from_json_keyfile_name(key_path, scope)
        client = gspread.authorize(creds)
        
        sheet = client.open("Czech_Declension_Log").worksheet("verbs")
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        sheet.append_row([lemma, tense, form_key, gender or "N/A", my_val, wiki_val, timestamp])
    except Exception as e:
        print(f"Logging to Verb Sheet failed: {e}")

def log_error(lemma, word_id, person_num, error_type):
    """Appends a report to grammar_errors.csv inside the Grammar_functions folder."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    log_file = os.path.join(current_dir, "grammar_errors.csv")
    
    file_exists = os.path.isfile(log_file)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    headers = ['Timestamp', 'Lemma', 'Word_ID', 'Person_Number', 'Error_Type']
    
    with open(log_file, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(headers)
        writer.writerow([timestamp, lemma, word_id, person_num, error_type])


def create_present_tense(lemma, person, gender, number):
    """
    Takes exactly 4 parameters to keep app.py safe.
    1. Runs Wiktionary Scraper first.
    2. Runs aspect (perfective) evaluations.
    3. Resolves form matching via Overrides or Fallbacks.
    """
    # -------------------------------------------------------------------------
    # STEP 1: CLEANING & REFLEXIVE IDENTIFICATION
    # -------------------------------------------------------------------------
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean

    if not base_verb.endswith("t"):
        return (
            "Not a verb",
            False,
            bool(is_reflexive),
            False,
            None,
            "Not a verb"
        )

    # -------------------------------------------------------------------------
    # STEP 2: SCRAPE WIKTIONARY IMMEDIATELY
    # -------------------------------------------------------------------------
    print("PRESENT CHECK WORD:", lemma_clean)

    wiki = get_wiktionary_verb_present(lemma_clean)

    print("PRESENT WIKI RESULT =", wiki)
    print("WIKI =", wiki)

    wiki_val = None

    if wiki:


        if wiki.get("aspect") == "perfective":
            return (
                f"The verb '{lemma}' is perfective and has no present tense.",
                True,
                bool(is_reflexive),
                False,
                None,
                "Perfective verb - no present tense"
            )

        wiki_val = wiki.get("forms", {}).get(f"{person}{number}")

        if wiki_val:
            wiki_val = wiki_val.lower().strip()

    # -------------------------------------------------------------------------
    # -------------------------------------------------------------------------
    # STEP 3: ESTABLISH ASPECTS & DB VALIDATION
    # -------------------------------------------------------------------------
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    present_form = None
    is_verified = False  
    is_actually_irregular = False
    is_perfective = False
    pattern_id = None
    is_irr = 0     
    irr_type = 0   

    try:
        # FIX: Query using lemma_clean ('oblékat se') instead of base_verb ('oblékat')
        cur.execute("SELECT id, is_irr, irr_type, pos, pattern_id, vid FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        # Fallback: If it's not found with 'se', try searching without it just in case
        if not row:
            cur.execute("SELECT id, is_irr, irr_type, pos, pattern_id, vid FROM words WHERE lemma = ?", (base_verb,))
            row = cur.fetchone()

        if row and row[3] == 'verb':
            is_verified = True
            word_id, db_is_irr, db_irr_type, _, pattern_id, vid = row
            is_perfective = (vid == 'perfective')
            is_irr = int(float(db_is_irr)) if db_is_irr is not None else 0
            irr_type = int(float(db_irr_type)) if db_irr_type is not None else 0
        else:
            is_verified = False
            is_perfective = is_likely_perfective(base_verb)
            is_irr = 0
            irr_type = 0

        # Perfective blockade check executed right here
        if is_perfective:
            return f"The verb '{lemma}' is perfective and has no present form.", is_verified, bool(is_reflexive), False
            
        # -------------------------------------------------------------------------
        # STEP 4: RESOLVE FROM DATABASE IRREGULAR OVERRIDES
        # -------------------------------------------------------------------------
        if is_irr == 1 and irr_type in [1, 3, 6]:
            col_map = {'1S':'ja_present', '2S':'ty_present', '3S':'on_present', 
                       '1P':'my_present', '2P':'vy_present', '3P':'oni_present'}
            person_num = f"{person}{number}"
            target_col = col_map.get(person_num)

            cur.execute(f"SELECT {target_col} FROM overrides WHERE word_id = ?", (word_id,))
            over_row = cur.fetchone()
            val = str(over_row[0]).strip() if over_row and over_row[0] else ""
            
            if val and val.lower() != "nan":
                present_form = val
                is_actually_irregular = True
            else:
                log_error(lemma_clean, word_id, person_num, f"Missing {target_col}")
                    
    finally:
        conn.close()

    # -------------------------------------------------------------------------
    # STEP 5: FALLBACK TO SYSTEM PARADIGMS
    # -------------------------------------------------------------------------
    if present_form is None:
        patterns = {
            'dělat':   {'1S':'ám',  '2S':'áš',  '3S':'á',   '1P':'áme',  '2P':'áte',  '3P':'ají'},
            'prosit':  {'1S':'ím',  '2S':'íš',  '3S':'í',   '1P':'íme',  '2P':'íte',  '3P':'í'},
            'sázet':   {'1S':'ím',  '2S':'íš',  '3S':'í',   '1P':'íme',  '2P':'íte',  '3P':'ejí'}, 
            'děkovat': {'1S':'uji', '2S':'uješ','3S':'uje', '1P':'ujeme','2P':'ujete','3P':'ují'},
            'tisknout':{'1S':'u',   '2S':'neš', '3S':'ne',  '1P':'neme', '2P':'nete', '3P':'nou'},
            'nést':    {'1S':'u',   '2S':'eš',  '3S':'e',   '1P':'eme',  '2P':'ete',  '3P':'ou'}
        }
        
        cut_map = {'dělat': 2, 'prosit': 2, 'sázet': 2, 'děkovat': 4, 'tisknout': 4, 'nést': 2}
        if pattern_id and str(pattern_id) in patterns:
            active_p = str(pattern_id)
        else:
            if base_verb.endswith("ovat"): active_p = 'děkovat'
            elif base_verb.endswith("nout"): active_p = 'tisknout'
            elif base_verb.endswith("at"): active_p = 'dělat'
            elif any(base_verb.endswith(s) for s in ["it", "ít", "et", "ět"]): active_p = 'prosit'
            else: active_p = 'nést'
        
        stem = base_verb[:-cut_map.get(active_p, 2)]
        present_form = stem + patterns[active_p][f"{person}{number}"]

    # -------------------------------------------------------------------------
    # STEP 6: COMPARE, MISMATCH LOGGING, AND VERIFICATION OVERWRITE
    # -------------------------------------------------------------------------
    my_base_only = present_form.split(' ')[0] if is_reflexive else present_form
    
    if wiki_val and wiki_val.strip():
        if my_base_only.lower().strip() != wiki_val:
            person_num = f"{person}{number}"
            log_verb_mismatch_to_gsheet(lemma, "Přítomný čas", person_num, None, my_base_only, wiki_val)
            
            # Use scraped wikitionary token
            if is_reflexive:
                present_form = f"{wiki_val} {is_reflexive}"
            else:
                present_form = wiki_val
            is_verified = True
    else:
        # Re-attach particle if fallback was kept
        if is_reflexive and not present_form.endswith(is_reflexive):
            present_form = f"{present_form} {is_reflexive}"

    return (
        present_form,
        is_verified,
        bool(is_reflexive),
        is_actually_irregular,
        wiki_val,
        str(wiki)
    )