import sqlite3
import os
import csv
import requests          # New
import urllib.parse       # New
from bs4 import BeautifulSoup # New
import gspread            # New
from oauth2client.service_account import ServiceAccountCredentials # New
from datetime import datetime
from .prefix_function import is_likely_perfective




def get_wiktionary_verb_present(lemma, person, number):
    """Scrapes present tense conjugation tables from Wiktionary."""
    if not lemma: return None
    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(lemma)}"
    headers = {'User-Agent': 'HackCzech-Bot/1.0'}
    try:
        response = requests.get(url, timeout=3.0, headers=headers)
        if response.status_code != 200: return None
        soup = BeautifulSoup(response.content, 'html.parser')
        table = soup.find('table', {'class': 'inflection-table'})
        if not table: return None
        
        # Maps coordinates to rows inside typical Wiktionary layout
        # Row indicators: 1. osoba (Singular/Plural)
        person_idx = int(person) - 1 # 0 for 1st person, 1 for 2nd, etc.
        col_idx = 0 if number == 'S' else 1
        
        rows = [row for row in table.find_all('tr') if "osoba" in row.get_text().lower()]
        if len(rows) >= 3:
            tds = rows[person_idx].find_all('td')
            if len(tds) >= 2:
                return tds[col_idx].get_text(strip=True).split(',')[0].split('[')[0].replace('\xad', '')
        return None
    except:
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
        
        # CHANGED: Targets the "verbs" tab inside your spreadsheet file
        sheet = client.open("Czech_Declension_Log").worksheet("verbs")
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        
        # CHANGED: Appends rows containing unified verb data structure
        sheet.append_row([lemma, tense, form_key, gender or "N/A", my_val, wiki_val, timestamp])
    except Exception as e:
        print(f"Logging to Verb Sheet failed: {e}")





def log_error(lemma, word_id, person_num, error_type):
    """Appends a report to grammar_errors.csv inside the Grammar_functions folder."""
    # Locates the folder where this script lives
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

def create_present_tense(lemma, person, gender, number, tense="present"):
    # 1. Cleaning & Reflexive Check
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean

    if not base_verb.endswith("t"):
        return "Not a verb", "UNVERIFIED", bool(is_reflexive), False


    # 2. Database Connection (Dynamic Path)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # --- 1. INITIALIZE EVERYTHING AT THE TOP ---
    present_form = None
    is_verified = False  # Default to 'Guilty' (Yellow badge)
    is_actually_irregular = False
    is_perfective = False
    pattern_id = None
    is_irr = 0      # Ensure this exists for regular verbs
    irr_type = 0    # Ensure this exists for regular verbs

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, is_irr, irr_type, pos, pattern_id, vid FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        # --- 2. THE STRICT VERIFICATION CHECK ---
        if row and row[3] == 'verb':
            is_verified = True
            # Unpack the columns
            word_id, db_is_irr, db_irr_type, _, pattern_id, vid = row
            is_perfective = (vid == 'perfective')
            # Clean numeric values ONLY if found in DB
            is_irr = int(float(db_is_irr)) if db_is_irr is not None else 0
            irr_type = int(float(db_irr_type)) if db_irr_type is not None else 0
        else:
            # Word not in DB: use prefix guessing logic
            is_verified = False
            is_perfective = is_likely_perfective(lemma_clean)
            is_irr = 0
            irr_type = 0

        # If user wants PRESENT but verb is perfective (found or guessed), block it
        if is_perfective and tense == "present":
            return f"The verb '{lemma}' is perfective and has no present form.", is_verified, bool(is_reflexive), False
            
        # --- 3. IRREGULAR LOGIC ---
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
                # Log it, but DON'T return. 
                # Let the code move to 'Step 4. FALLBACK' automatically.
                log_error(lemma_clean, word_id, person_num, f"Missing {target_col}")
                    
    finally:
        conn.close()

    # 4. FALLBACK: Regular Patterns
    if present_form is None:
        patterns = {
            'dělat':   {'1S':'ám',  '2S':'áš',  '3S':'á',   '1P':'áme',  '2P':'áte',  '3P':'ají'},
            'prosit':  {'1S':'ím',  '2S':'íš',  '3S':'í',   '1P':'íme',  '2P':'íte',  '3P':'í'},
            'sázet':  {'1S':'ím', '2S':'íš', '3S':'í', '1P':'íme', '2P':'íte', '3P':'ejí'}, # Use this for prosít
            'děkovat': {'1S':'uji', '2S':'uješ','3S':'uje', '1P':'ujeme','2P':'ujete','3P':'ují'},
            'tisknout':{'1S':'u',   '2S':'neš', '3S':'ne',  '1P':'neme', '2P':'nete', '3P':'nou'},
            'nést':    {'1S':'u',   '2S':'eš',  '3S':'e',   '1P':'eme',  '2P':'ete',  '3P':'ou'}
        }
        
        cut_map = {'dělat': 2, 'prosit': 2, 'sázet': 2, 'děkovat': 4, 'tisknout': 4, 'nést': 2}
        if pattern_id and str(pattern_id) in patterns:
            active_p = str(pattern_id)
        else:
            # Guessing logic based on lemma ending
            if base_verb.endswith("ovat"): active_p = 'děkovat'
            elif base_verb.endswith("nout"): active_p = 'tisknout'
            elif base_verb.endswith("at"): active_p = 'dělat'
            elif any(base_verb.endswith(s) for s in ["it", "ít", "et", "ět"]): active_p = 'prosit'
            else: active_p = 'nést'
        
        stem = base_verb[:-cut_map.get(active_p, 2)]
        present_form = stem + patterns[active_p][f"{person}{number}"]

    # --- WIKTIONARY VERIFICATION ---
    try:
        # Strip reflexive particle away momentarily to compare bases accurately
        my_base_only = present_form.split(' ')[0] if is_reflexive else present_form
        
        wiki_val = get_wiktionary_verb_present(lemma, person, number)
        if wiki_val and wiki_val.strip():
            wiki_val = wiki_val.strip().lower()
            if my_base_only.lower().strip() != wiki_val:
                person_num = f"{person}{number}"
                log_verb_mismatch_to_gsheet(lemma, "Přítomný čas", person_num, None, my_base_only, wiki_val)
                
                # Overwrite presentation string with verified Wiktionary token
                if is_reflexive:
                    present_form = f"{wiki_val} {is_reflexive}"
                else:
                    present_form = wiki_val
                is_verified = True
    except Exception as e:
        print(f"Present Verb Wiki check bypassed: {e}")

    return present_form, is_verified, bool(is_reflexive), is_actually_irregular
