import sqlite3
import os
import requests          # New: For Wiktionary
import urllib.parse       # New: For Czech URL encoding
from bs4 import BeautifulSoup # New: For parsing
import gspread            # New: For Google Sheets
import re
from oauth2client.service_account import ServiceAccountCredentials # New: For Auth





def get_wiktionary_verb_past(lemma, gender, number):
    """Scrapes the exact past tense forms from the Příčestí table on Wiktionary generically."""
    if not lemma:
        return None

    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(lemma.strip())}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code != 200:
            return None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for row in soup.find_all('tr'):
            cells = [c.get_text().strip().lower() for c in row.find_all(['td', 'th'])]
            
            # Find the active past tense row containing 'činné'
            if cells and any("činné" in cell for cell in cells):
                
                # Strip out the row headers generically
                forms = [f for f in cells if "činné" not in f and "příčestí" not in f]
                
                if len(forms) >= 6:
                    raw_val = None
                    if number == 'S':
                        if gender in ['M', 'Mi']: raw_val = forms[0]
                        if gender == 'F':         raw_val = forms[1]
                        if gender == 'N':         raw_val = forms[2]
                    elif number == 'P':
                        if gender == 'M':         raw_val = forms[3]
                        if gender in ['Mi', 'F']: raw_val = forms[4]
                        if gender == 'N':         raw_val = forms[5]
                    
                    if raw_val:
                        # Clean out bracketed footnotes [1] and parenthetical remarks generically
                        clean_raw = re.sub(r'\[.*?\]', '', raw_val)
                        clean_raw = re.sub(r'\(.*?\)', '', clean_raw)
                        
                        # Split by comma, clean whitespace, and re-join with a clean slash separator
                        variants = [v.strip() for v in clean_raw.split(',') if v.strip()]
                        clean_val = " / ".join(variants)
                        
                        # Universal Terminal Log
                        print("\n" + "="*50)
                        print(f"WIKTIONARY TARGET FOUND FOR: {lemma}")
                        print(f"Raw Scraper Text:  '{raw_val}'")
                        print(f"Cleaned Variants:  '{clean_val}'")
                        print("="*50 + "\n")
                        
                        return clean_val
                        
    except Exception as e:
        print(f"Scraper error parsing Příčestí table: {e}")
        
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





def create_past_tense(lemma, person, gender, number):
    """
    person: 1, 2, 3
    gender: 'M' (anim), 'Mi' (inanim), 'F', 'N'
    number: 'S' (singular), 'P' (plural)
    """
    # 1. Basic Validation
    lemma = lemma.strip().lower()
    # 1. Basic Validation
    # Check for reflexive BEFORE stripping or lowercasing to be precise
    # 1. Basic Validation
    # DO NOT strip or lower yet - we need to see the exact ending
    is_reflexive = None
    if lemma.endswith(" se"): is_reflexive = "se"
    elif lemma.endswith(" si"): is_reflexive = "si"
    
    lemma_clean = lemma.strip().lower()
    
    if is_reflexive:
        # Get 'dát' from 'dát si'
        base_verb = lemma_clean.split(" ")[0]
    else:
        base_verb = lemma_clean

    if not base_verb.endswith("t"):
        return "Verb not known (doesn't end in 't')", False, bool(is_reflexive), False

    # 2. Database Check
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, "..", "czech_master.db")
    conn = sqlite3.connect(db_path)
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, is_irr, irr_type, pos FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        is_verified = True
        l_participle = None 
        is_actually_irregular = False 
        irr_type = 0  # <--- ADD THIS LINE HERE!

        if row is None or row[3] != 'verb':
            is_verified = False
        elif row[1] == 1:
            # This only runs if the verb is marked irregular in the DB
            irr_type = int(row[2]) if row[2] is not None else 0
            
            if irr_type in [1, 2, 5]:
                is_actually_irregular = True
                word_id = row[0]
                cur.execute("""
                    SELECT past_participle FROM overrides 
                    WHERE (word_id = ? OR form_key = ?) 
                    AND past_participle IS NOT NULL
                """, (word_id, lemma_clean))
                
                over_row = cur.fetchone()
                if over_row and over_row[0]:
                    base_l = over_row[0].split(" ")[0] 
                    stem_l = base_l[:-1] if base_l.endswith('l') else base_l
                    
                    if stem_l.endswith("še") and not (gender in ['M', 'Mi'] and number == 'S'):
                        stem_l = stem_l[:-1]

                    suffixes = {
                        'S': {'M': 'l', 'Mi': 'l', 'F': 'la', 'N': 'lo'},
                        'P': {'M': 'li', 'Mi': 'ly', 'F': 'ly', 'N': 'la'}
                    }
                    l_participle = stem_l + suffixes[number][gender]
    
    finally: # <--- Start the "Finally" block (Aligned with 'try')
        conn.close() # <--- This code is now "bulletproof"
    # --- IRREGULAR STEM LOGIC (e.g., jít -> šel) ---
    if l_participle is None:
        
        # Check for jít and its variants (přijít, odejít, atd.)
        if base_verb == "jít" or base_verb.endswith("jít"):
            is_actually_irregular = True
            prefix = base_verb[:-3] if base_verb.endswith("jít") and base_verb != "jít" else ""
            
            # jít stems: Masculine 'še', others 'š'
            if number == 'S' and gender in ['M', 'Mi']:
                l_participle = prefix + "šel"
            else:
                # Suffixes for non-masculine singular: š + la, lo, li, ly
                past_suffixes = {
                    'S': {'F': 'la', 'N': 'lo'},
                    'P': {'M': 'li', 'Mi': 'ly', 'F': 'ly', 'N': 'la'}
                }
                l_participle = prefix + "š" + past_suffixes[number][gender]
                
    # 3. Form the L-Participle (if not already set by overrides)
    if l_participle is None:
        if base_verb.endswith("mout"):
            stem = base_verb[:-4] + "mu"
            is_actually_irregular = True 
        elif base_verb.endswith("nout"):
            # If the letter before -nout is a vowel, keep the -nu-
            if base_verb[-5] in "aeiyou":
                stem = base_verb[:-3] + "u" # minout -> minu
            else:
                stem = base_verb[:-4] # obléknout -> oblékl, tisknout -> tiskl
        else:
            stem = base_verb[:-1]
            
        suffixes = {
            'S': {'M': 'l', 'Mi': 'l', 'F': 'la', 'N': 'lo'},
            'P': {'M': 'li', 'Mi': 'ly', 'F': 'ly', 'N': 'la'}
        }
        l_participle = stem + suffixes[number][gender]

    # 4. Auxiliary Verbs
    aux_map = {
        '1': {'S': 'jsem', 'P': 'jsme'},
        '2': {'S': 'jsi', 'P': 'jste'},
        '3': {'S': '', 'P': ''}
    }
    aux = aux_map[str(person)][number]


    # 5. Word Order & Contractions (ses/sis)
    # 5. Word Order & Contractions (ses/sis)
    # Start with the L-participle (e.g., 'dala')
    parts = [l_participle]
    
    if aux == "jsi" and is_reflexive:
        # Note: 'jsi' + 'se'/'si' becomes 'ses'/'sis'
        # We add only the contraction to the list
        parts.append("ses" if is_reflexive == "se" else "sis")
    else:
        # Standard order: L-participle + auxiliary + reflexive
        if aux:
            parts.append(aux)
        if is_reflexive:
            parts.append(is_reflexive)

# We use base_verb as the "pattern" so the badge shows the infinitive
    result_str = " ".join(parts)
    
    # --- WIKTIONARY VERIFICATION ---
    try:
        # Get your engine's single word guess (e.g., 'pomocl' or 'vyjmul')
        my_word_only = result_str.split(' ')[0].lower().strip() 
        
        wiki_val = get_wiktionary_verb_past(lemma, gender, number)
        if wiki_val and wiki_val.strip():
            wiki_val_clean = wiki_val.strip().lower()
            
            # If Wiktionary returned anything, it exists on the page -> mark verified
            is_verified = True
            
            # GENERAL CHECK: Is our engine's guess found inside the Wiktionary string?
            if my_word_only not in wiki_val_clean:
                # If it doesn't match at all (e.g., 'pomocl' is not in 'pomohl')
                form_label = f"Past {gender} {number}"
                log_verb_mismatch_to_gsheet(lemma, "Minulý čas", form_label, gender, my_word_only, wiki_val)
                
                # Overwrite with the verified string form directly
                parts[0] = wiki_val
                result_str = " ".join(parts)
                
    except Exception as e:
        print(f"Verb Wiki check bypassed: {e}")
        is_verified = False

    # ADDED wiki_val here at the end!
    return result_str, is_verified, bool(is_reflexive), is_actually_irregular, wiki_val