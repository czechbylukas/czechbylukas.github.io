import sqlite3
import os
from .present_tense import create_present_tense, log_error

def create_future_tense(lemma, person, gender, number):
    # 1. Cleaning & Reflexive Check
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean

    if not base_verb.endswith("t"):
        return "Not a verb", None, False, False

    # 2. Database Lookup
    db_path = os.path.join("VocabSQL_database", "czech_master.db")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute("SELECT id, is_irr, irr_type, pos, vid, category FROM words WHERE lemma = ?", (lemma_clean,))
    row = cur.fetchone()

    if not row or row[3] != 'verb':
        conn.close()
        return "Verb not found", None, False, False

    word_id, is_irr, irr_type, _, vid, category = row
    is_irr = int(float(is_irr)) if is_irr is not None else 0
    irr_type = int(float(irr_type)) if irr_type is not None else 0
    
    vid_info = f"Aspect: {vid}"
    if category == "motion":
        vid_info += " (Movement)"

    person_num = f"{person}{number}"

    # 3. PRIORITY: Irregular Future (Types 1, 4, 7)
    # If the verb is irregular, we MUST find it in overrides. No guessing.
    if is_irr == 1 and irr_type in [1, 4, 7]:
        col_map = {'1S':'ja_future', '2S':'ty_future', '3S':'on_future', 
                   '1P':'my_future', '2P':'vy_future', '3P':'oni_future'}
        target_col = col_map.get(person_num)

        cur.execute(f"SELECT {target_col} FROM overrides WHERE word_id = ?", (word_id,))
        over_row = cur.fetchone()
        val = str(over_row[0]).strip() if over_row and over_row[0] else ""
        
        if val and val.lower() != "nan":
            conn.close()
            return val, vid_info, True, True
        else:
            # LOG THE ERROR AND STOP
            log_error(lemma_clean, word_id, person_num, f"Missing {target_col}")
            conn.close()
            return f"ERROR: Data missing (logged in log)", vid_info, True, True

    conn.close()

    # 4. REGULAR LOGIC (Only if not caught by irregular block)
    
    # A) PERFECTIVE: Use Present Tense logic (e.g., udělat -> udělám)
    if vid == 'perfective':
        future_form, _, _, _ = create_present_tense(lemma, person, gender, number)
        return future_form, vid_info, True, False
    
    # B) MOVEMENT: po- + present form (e.g., jet -> pojedu)
    elif vid == 'movement':
        pres, _, _, _ = create_present_tense(lemma, person, gender, number)
        if "ERROR" in pres: # Catch errors from present_tense.py
            return pres, vid_info, True, True
            
        if is_reflexive:
            verb_part = pres.split(" ")[0]
            future_form = f"po{verb_part} {is_reflexive}"
        else:
            future_form = f"po{pres}"
        return future_form, vid_info, True, False

    # C) IMPERFECTIVE: budu + lemma
    else:
        aux_map = {'1S':'budu', '2S':'budeš', '3S':'bude', '1P':'budeme', '2P':'budete', '3P':'budou'}
        aux = aux_map[person_num]
        return f"{aux} {lemma}", vid_info, True, False
    




