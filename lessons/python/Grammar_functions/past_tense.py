import sqlite3
import os
import requests          # New: For Wiktionary
import urllib.parse       # New: For Czech URL encoding
from bs4 import BeautifulSoup # New: For parsing
import gspread            # New: For Google Sheets
import re
from oauth2client.service_account import ServiceAccountCredentials # New: For Auth




def get_wiktionary_verb_past(lemma, gender, number):
    debug_log = []
    debug_log.append(f"STARTING SCRAPER FOR: {lemma}")

    if not lemma:
        debug_log.append("NO LEMMA PROVIDED")
        return None, debug_log

    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(lemma.strip())}"
    debug_log.append(f"URL: {url}")

    try:
        headers = {
            "User-Agent": "CzechDeclensionBot/1.0 (contact: your_email@example.com) Python-requests",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
            "Referer": "https://cs.wiktionary.org/"
        }

        response = requests.get(url, headers=headers, timeout=10)
        print("FINAL URL:", response.url)
        debug_log.append(f"STATUS CODE: {response.status_code}")

        if response.status_code != 200:
            return None, debug_log

        soup = BeautifulSoup(response.text, "html.parser")
        debug_log.append("PAGE LOADED")

        participle_table = None
        
        # Look for headers containing either "příčestí" or "časování"
        for tag in soup.find_all(["h2", "h3", "h4"]):
            txt = tag.get_text(" ", strip=True).lower()
            debug_log.append(f"HEADER FOUND: {txt}")
            
            if "příčestí" in txt or "časování" in txt:
                # 🟢 FIX: Look through ALL upcoming tables under this section header, not just the first one!
                current_element = tag
                while True:
                    current_element = current_element.find_next(["table", "h2", "h3", "h4"])
                    
                    # If we hit a new section header before finding our table, stop looking in this section
                    if not current_element or current_element.name in ["h2", "h3", "h4"]:
                        break
                        
                    if current_element.name == "table":
                        table_text = current_element.get_text().lower()
                        if "činné" in table_text:
                            participle_table = current_element
                            debug_log.append(f"FOUND MATCHING TABLE UNDER HEADER: {txt}")
                            break
                
                # If we found the correct participle table, exit the header loop
                if participle_table:
                    break

        if not participle_table:
            debug_log.append("NO MATCHING VERB PARTICIPLE TABLE FOUND ON PAGE")
            return None, debug_log

        debug_log.append("FOUND TABLE AFTER PŘÍČESTÍ")
        rows = participle_table.find_all("tr")
        debug_log.append(f"TOTAL ROWS: {len(rows)}")

        for row in rows:
            cells = row.find_all(["th", "td"])
            cleaned = [
                re.sub(r"\[.*?\]", "", c.get_text(" ", strip=True)).strip()
                for c in cells
            ]

            if not cleaned:
                continue

            debug_log.append(f"ROW: {cleaned}")
            cleaned_lower = [c.lower() for c in cleaned]

            # 🟢 FIXED: Check if 'činné' is ANYWHERE inside the first cell (handles irregular formats)
            if "činné" not in cleaned_lower[0]:
                continue

            debug_log.append("FOUND ČINNÉ ROW")

            # 🟢 FIXED: Handle different column counts safely
            # Wide tables have separate columns for anim/inanim, narrow tables combine them
            if number == "S":
                if gender in ["M", "Mi"]:
                    return cleaned[1], debug_log
                elif gender == "F":
                    return cleaned[2], debug_log
                elif gender == "N":
                    return cleaned[3], debug_log

            elif number == "P":
                # Safe fallback mapping depending on how many columns Wiktionary rendered
                if len(cleaned) >= 7: 
                    if gender == "M":
                        return cleaned[4], debug_log
                    elif gender in ["Mi", "F"]:
                        return cleaned[5], debug_log
                    elif gender == "N":
                        return cleaned[6], debug_log
                else:
                    # Narrow tables fallback layout
                    if gender in ["M", "Mi", "F"]:
                        return cleaned[4] if len(cleaned) > 4 else cleaned[-1], debug_log
                    elif gender == "N":
                        return cleaned[-1], debug_log

        debug_log.append("NO ČINNÉ ROW FOUND")
        return None, debug_log

    except Exception as e:
        debug_log.append(f"SCRAPER ERROR: {e}")
        return None, debug_log










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
        return (
                "Verb not known (doesn't end in 't')",
                False,
                bool(is_reflexive),
                False,
                None,
                ["INVALID VERB ENDING"]
         )

    # 2. Database Check
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, "..", "czech_master.db")
    conn = sqlite3.connect(db_path)
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, is_irr, irr_type, pos FROM words WHERE lemma = ?", (base_verb,))
        row = cur.fetchone()

        is_verified = False
        l_participle = None 
        is_actually_irregular = False 
        irr_type = 0  # <--- ADD THIS LINE HERE!

        if row is None or row[3] != 'verb':
            print(f"DEBUG: '{base_verb}' NOT FOUND IN DATABASE")
            is_verified = False
        else:
            print(f"DEBUG: FOUND '{base_verb}' IN DATABASE")
            is_verified = True  # FIX: Set to True when word exists in DB

            # irregular handling
            if row[1] == 1:
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
        my_word_only = result_str.split(' ')[0].lower().strip()
        wiki_val, wiki_debug = get_wiktionary_verb_past(base_verb, gender, number)

        if wiki_val is None:
            is_verified = False
        else:
            wiki_val_clean = wiki_val.strip().lower()
            my_word_only = result_str.split(' ')[0].lower().strip()

            if my_word_only == wiki_val_clean:
                # The guess matched Wiktionary perfectly!
                is_verified = True
            else:
                # The guess was wrong (e.g., pomocl vs pomohl), log it and fix it!
                is_verified = True  # 🟢 Set to True because we are fixing it with a real verified Wiki word!
                form_label = f"Past {gender} {number}"

                log_verb_mismatch_to_gsheet(
                    lemma,
                    "Minulý čas",
                    form_label,
                    gender,
                    my_word_only,
                    wiki_val
                )

                # 🟢 FORCE the correct Wiktionary word into our final result string
                parts[0] = wiki_val
                result_str = " ".join(parts)

    except Exception as e:
        print(f"Verb Wiki check bypassed: {e}")
        is_verified = False

    return result_str, is_verified, bool(is_reflexive), is_actually_irregular, wiki_val, wiki_debug