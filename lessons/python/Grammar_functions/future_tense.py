import sqlite3
import os
from .present_tense import create_present_tense, log_error

def create_future_tense(lemma, person, gender, number):
    # 1. Cleaning
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean
    person_num = f"{person}{number}" # e.g., '1S'

    if not base_verb.endswith("t"):
        return "Not a verb", None, False, False

    # --- HARD OVERRIDES (Fixes 'jít' and 'udělat' regardless of DB) ---
    if base_verb == "jít":
        pres, _, _, _ = create_present_tense(lemma, person, gender, number)
        # Manually transform 'jdu' -> 'půjdu', 'jdeš' -> 'půjdeš'
        future_form = pres.replace("jd", "půjd")
        return future_form, "Aspect: imperfective (Movement)", True, False

    if base_verb == "udělat":
        # Force 'udělat' to just use the present tense conjugation
        return create_present_tense(lemma, person, gender, number)
    # -----------------------------------------------------------------

    # 2. Database Lookup
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT id, is_irr, irr_type, vid, category FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        if not row:
            conn.close()
            return "Verb not found", None, False, False
        
        word_id, is_irr, irr_type, vid, category = row
        vid_clean = str(vid).strip().lower()
        
        # 3. IRREGULAR LOGIC (from overrides table)
        if int(float(is_irr or 0)) == 1:
            col_map = {'1S':'ja_future', '2S':'ty_future', '3S':'on_future', 
                       '1P':'my_future', '2P':'vy_future', '3P':'oni_future'}
            target_col = col_map.get(person_num)
            
            cur.execute(f"SELECT {target_col} FROM overrides WHERE word_id = ?", (word_id,))
            over_row = cur.fetchone()
            if over_row and over_row[0] and str(over_row[0]).lower() != "nan":
                res = str(over_row[0]).strip()
                conn.close()
                return res, f"Aspect: {vid_clean}", True, True

        conn.close()
    except Exception as e:
        if conn: conn.close()
        return f"DB Error: {str(e)}", None, False, False

    # 4. GENERAL LOGIC
    # A) PERFECTIVE (e.g. koupit -> koupím)
    if vid_clean == 'perfective':
        return create_present_tense(lemma, person, gender, number)
    
    # B) MOVEMENT (e.g. jet -> pojedu)
    elif vid_clean == 'movement' or category == 'motion':
        pres, _, _, _ = create_present_tense(lemma, person, gender, number)
        future_form = f"po{pres}" if not is_reflexive else f"po{pres.split(' ')[0]} {is_reflexive}"
        return future_form, f"Aspect: {vid_clean}", True, False

    # C) IMPERFECTIVE (e.g. dělat -> budu dělat)
    else:
        aux_map = {'1S':'budu', '2S':'budeš', '3S':'bude', '1P':'budeme', '2P':'budete', '3P':'budou'}
        aux = aux_map.get(person_num, "bude")
        return f"{aux} {lemma}", f"Aspect: {vid_clean}", True, False