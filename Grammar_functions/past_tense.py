import sqlite3
import os

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
    db_path = os.path.join(current_dir, "..", "czech_master.db")    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    cur.execute("SELECT id, is_irr, irr_type, pos FROM words WHERE lemma = ?", (lemma_clean,))
    row = cur.fetchone()

    is_verified = True
    l_participle = None 
    is_actually_irregular = False 
    
    if row is None or row[3] != 'verb':
        is_verified = False
        conn.close()
    elif row[1] == 1:
        irr_type = int(row[2]) if row[2] is not None else 0
        
        # Types 1, 2, and 5 use the overrides table
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
                # 1. Get the base (e.g., "přišel" from "přišel si")
                base_l = over_row[0].split(" ")[0] 
                
                # 2. Extract Stem (e.g., "přišel" -> "přiše")
                stem_l = base_l[:-1] if base_l.endswith('l') else base_l
                
                # --- NEW: FLEETING E LOGIC (The Š-Rule) ---
                # If stem ends in 'še' (přiše, še, odeše) and it's NOT Masc Singular
                if stem_l.endswith("še") and not (gender == 'M' and number == 'S'):
                    stem_l = stem_l[:-1] # "přiše" -> "přiš"
                # ------------------------------------------

                suffixes = {
                    'S': {'M': 'l', 'Mi': 'l', 'F': 'la', 'N': 'lo'},
                    'P': {'M': 'li', 'Mi': 'ly', 'F': 'ly', 'N': 'la'}
                }
                l_participle = stem_l + suffixes[number][gender]
        
        conn.close()

    # 3. Form the L-Participle (if not already set by overrides)
    if l_participle is None:
        stem = base_verb[:-1] # Remove 't'
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

    return " ".join(parts), is_verified, bool(is_reflexive), is_actually_irregular