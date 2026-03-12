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
    pattern_id = None
    is_irr = 0      # Ensure this exists for regular verbs
    irr_type = 0    # Ensure this exists for regular verbs

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, is_irr, irr_type, pos, pattern_id FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        # --- 2. THE STRICT VERIFICATION CHECK ---
        if row and row[3] == 'verb':
            is_verified = True  # Word is officially found in DB
            word_id, db_is_irr, db_irr_type, _, pattern_id = row
            
            # Clean numeric values from DB safely
            is_irr = int(float(db_is_irr)) if db_is_irr is not None else 0
            irr_type = int(float(db_irr_type)) if db_irr_type is not None else 0

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

    if is_reflexive:
        present_form = f"{present_form} {is_reflexive}"

    return present_form, is_verified, bool(is_reflexive), is_actually_irregular