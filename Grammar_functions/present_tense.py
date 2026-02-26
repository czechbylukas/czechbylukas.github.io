import sqlite3
import os
import csv
from datetime import datetime

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

def create_present_tense(lemma, person, gender, number):
    # 1. Cleaning & Reflexive Check
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean

    if not base_verb.endswith("t"):
        return "Not a verb", False, bool(is_reflexive), False

    # 2. Database Connection
    db_path = os.path.join("VocabSQL_database", "czech_master.db")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute("SELECT id, is_irr, irr_type, pos, pattern_id FROM words WHERE lemma = ?", (lemma_clean,))
    row = cur.fetchone()

    present_form = None
    is_verified = False
    is_actually_irregular = False

    if row and row[3] == 'verb':
        is_verified = True
        word_id, is_irr, irr_type, _, pattern_id = row
        
        # Safe type casting for SQLite
        is_irr = int(float(is_irr)) if is_irr is not None else 0
        irr_type = int(float(irr_type)) if irr_type is not None else 0

        # 3. PRIORITY: Irregular Logic
        if is_irr == 1 and irr_type in [1, 3, 6]:
            col_map = {'1S':'ja_present', '2S':'ty_present', '3S':'on_present', 
                       '1P':'my_present', '2P':'vy_present', '3P':'oni_present'}
            person_num = f"{person}{number}"
            target_col = col_map.get(person_num)

            cur.execute(f"SELECT {target_col} FROM overrides WHERE word_id = ?", (word_id,))
            over_row = cur.fetchone()
            
            # Use string conversion to check for 'nan' or empty cells
            val = str(over_row[0]).strip() if over_row and over_row[0] else ""
            
            if val and val.lower() != "nan":
                present_form = val
                is_actually_irregular = True
            else:
                # FIXED: Only sending 4 arguments now to match the function definition
                log_error(lemma_clean, word_id, person_num, f"Missing {target_col}")
                conn.close()
                return f"ERROR: Data missing (logged in Grammar_functions/grammar_errors.csv)", True, bool(is_reflexive), True

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
        
        cut_map = {'dělat': 2, 'prosit': 2, 'děkovat': 4, 'tisknout': 4, 'nést': 2}
        active_p = pattern_id if pattern_id in patterns else 'dělat'
        
        stem = base_verb[:-cut_map.get(active_p, 2)]
        present_form = stem + patterns[active_p][f"{person}{number}"]

    if is_reflexive:
        present_form = f"{present_form} {is_reflexive}"

    return present_form, is_verified, bool(is_reflexive), is_actually_irregular