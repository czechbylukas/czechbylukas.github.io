import sqlite3
import os
import requests            # New
import urllib.parse         # New
import gspread              # New
from oauth2client.service_account import ServiceAccountCredentials # New
from .present_tense import create_present_tense, log_error
from .prefix_function import is_likely_perfective



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




def create_future_tense(lemma, person, gender, number):
    # 1. Cleaning
    is_reflexive = "se" if lemma.endswith(" se") else "si" if lemma.endswith(" si") else None
    lemma_clean = lemma.strip().lower()
    base_verb = lemma_clean.split(" ")[0] if is_reflexive else lemma_clean
    person_num = f"{person}{number}" # e.g., '1S'

    if not base_verb.endswith("t"):
        return "Not a verb", None, False, False

    # --- HARD OVERRIDES (Fixes 'jít' regardless of DB) ---
    if base_verb == "jít":
        pres, _, _, _ = create_present_tense(lemma, person, gender, number)
        # Manually transform 'jdu' -> 'půjdu', 'jdeš' -> 'půjdeš'
        future_form = pres.replace("jd", "půjd")
        return future_form, "Aspect: imperfective (Movement)", True, False

    # -----------------------------------------------------------------

    # 2. Database Lookup
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # ADD THESE 3 LINES:
    is_verified = "UNVERIFIED"
    is_actually_irregular = False
    vid_clean = "unknown"
    
    try:
        cur.execute("SELECT id, is_irr, irr_type, vid, category FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone() # Only call this ONCE.

        if not row:
            # Word not in DB: use prefix logic to decide aspect
            if is_likely_perfective(base_verb):
                vid_clean = 'perfective'
                category = None
            else:
                # If not a known perfective prefix, use standard "budu" logic

                conn.close()
                aux_map = {'1S':'budu', '2S':'budeš', '3S':'bude', '1P':'budeme', '2P':'budete', '3P':'budou'}
                aux = aux_map.get(person_num, "bude")
                # Change the second value to "Unknown" so it doesn't trigger the "UNVERIFIED" logic twice
                return f"{aux} {lemma}", "Aspect: unknown", False, False
        else:
            # Now 'row' actually has the data
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
                    # ENSURE THESE ARE True, True:
                    return res, f"Aspect: {vid_clean}", True, True


        conn.close()
    except Exception as e:
        if conn: conn.close()
        return f"DB Error: {str(e)}", None, False, False

    # 4. GENERAL LOGIC
    # A) PERFECTIVE (e.g. koupit -> koupím)
    if vid_clean == 'perfective':
        res, ver, refl, irr = create_present_tense(lemma, person, gender, number, tense="future")
        return res, f"Aspect: {vid_clean}", ver, irr
    
    # B) MOVEMENT (e.g. jet -> pojedu)
    elif vid_clean == 'movement' or category == 'motion':
        pres, _, _, _ = create_present_tense(lemma, person, gender, number)
        future_form = f"po{pres}" if not is_reflexive else f"po{pres.split(' ')[0]} {is_reflexive}"
        
        # --- WIKTIONARY VERIFICATION FOR MOVEMENT ---
        try:
            from .present_tense import get_wiktionary_verb_present
            wiki_val = get_wiktionary_verb_present(f"po{base_verb}", person, number) # e.g. pojedeš
            if wiki_val and wiki_val.strip():
                wiki_val = wiki_val.strip().lower()
                my_base_only = future_form.split(' ')[0] if is_reflexive else future_form
                
                if my_base_only.lower().strip() != wiki_val:
                    log_verb_mismatch_to_gsheet(lemma, "Budoucí čas", person_num, gender, my_base_only, wiki_val)
                    future_form = f"{wiki_val} {is_reflexive}" if is_reflexive else wiki_val
        except Exception as e:
            print(f"Future Wiki check bypassed: {e}")

        return future_form, f"Aspect: {vid_clean}", True, False
    # C) IMPERFECTIVE (e.g. dělat -> budu dělat)
    else:
        aux_map = {'1S':'budu', '2S':'budeš', '3S':'bude', '1P':'budeme', '2P':'budete', '3P':'budou'}
        aux = aux_map.get(person_num, "bude")
        return f"{aux} {lemma}", f"Aspect: {vid_clean}", True, False
    
    