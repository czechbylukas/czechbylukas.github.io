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
    db_path = os.path.join("VocabSQL_database", "czech_master.db")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # After (The fix)
    # After
    cur.execute("SELECT id, is_irr, irr_type, pos FROM words WHERE lemma = ?", (lemma_clean,))
    row = cur.fetchone()

    is_verified = True
    l_participle = None # Placeholder
    is_actually_irregular = False # <--- ADD THIS HERE
    
    if row is None:
        is_verified = False
        conn.close()
    elif row[3] != 'verb': # Check if 'pos' column is 'verb'
        is_verified = False
        print(f"Note: '{lemma_clean}' found but is {row[3]}, not a verb.")
        conn.close()
    elif row[1] == 1:
        # Only types 1, 2, and 5 use the overrides table for Past Tense
        irr_type = int(row[2]) if row[2] is not None else 0
        
        if irr_type in [1, 2, 5]:
            word_id = row[0]
            # Search by ID or the cleaned lemma name
            cur.execute("""
                SELECT past_participle FROM overrides 
                WHERE (word_id = ? OR form_key = ?) 
                AND past_participle IS NOT NULL
            """, (word_id, lemma_clean))
            
            over_row = cur.fetchone()
            if over_row and over_row[0]:
                # If the override is "dal si", we only want "dal"
                base_l = over_row[0].split(" ")[0] 
                
                # Now stem "dal" -> "da"
                stem_l = base_l[:-1] if base_l.endswith('l') else base_l
                
                suffixes = {
                    'S': {'M': 'l', 'Mi': 'l', 'F': 'la', 'N': 'lo'},
                    'P': {'M': 'li', 'Mi': 'ly', 'F': 'ly', 'N': 'la'}
                }
                l_participle = stem_l + suffixes[number][gender]
        else:
            # If type is 3, 4, etc., it stays None here and falls through to regular logic
            print(f"Note: {lemma_clean} is Type {irr_type}, treating as regular for past.")
    

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