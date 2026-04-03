import sqlite3
import os
from unittest import result

def guess_pattern(lemma, is_animate=False, is_soft=False):
    """Guesses pattern based on endings, animacy, and softness."""
    last = lemma[-1].lower()
    
    # Neutral
    if last == 'o':
        return 'město'
    if last == 'í':
        return 'stavení'
    
    # Feminine
    if last == 'a':
        return 'žena'
    if last in ['e', 'ě']:
        return 'růže'
    
    # Masculine (Consonants)
    if is_soft:
        return 'muž' if is_animate else 'stroj'
    
    if lemma.lower().endswith('um'):
        return 'město'
    
    return 'pán' if is_animate else 'hrad'

def apply_consonant_shift(lemma, stem, suffix, pattern_id, case, number):
    """Handles Barbora->Barboře, ruka->ruce, kluk->kluci, and hochu!"""
    # 3rd & 6th Case Singular (Dativ/Lokál)
    if number == 'S' and case in [3, 6]:
        if pattern_id in ['žena', 'předseda', 'husita', 'ulice']:
            if lemma.endswith('ka'): return stem[:-1] + 'ce'
            if lemma.endswith('ha'): return stem[:-1] + 'ze'
            if lemma.endswith('cha'): return stem[:-1] + 'še'
            if lemma.endswith('ra'): return stem[:-1] + 'ře'
            if lemma.endswith('ga'): return stem[:-1] + 'ze'
        
        if pattern_id in ['hrad', 'les'] and case == 6:
            if lemma.endswith('r'): return stem + 'ře'

    # 5th Case Singular (Vocative) - special check for guessed words like 'hoch'
    if number == 'S' and case == 5 and pattern_id == 'pán':
        if lemma.endswith(('k', 'h', 'ch')):
            return stem + 'u'

    # 1st Case Plural (Nominative) for Masculine Animated
    if number == 'P' and case == 1 and pattern_id == 'pán':
        if lemma.endswith('k'): return stem + 'ci'
        if lemma.endswith('h'): return stem + 'zi'
        if lemma.endswith('ch'): return stem + 'ši'
        if lemma.endswith('r'): return stem + 'ři'

    # Final check to prevent 'rě' - always convert to 'ře'
    final_form = stem + suffix
    if final_form.endswith('rě'):
        return final_form[:-2] + 'ře'
    
    # 2. Safety: lě -> le (Czech usually uses 'le' after 'l')
    if final_form.endswith('lě'):
        final_form = final_form[:-2] + 'le'

    return final_form


# 1. Update the signature to include is_soft=False
def declension_noun(lemma, case, number, is_animate=False, is_soft=False):
    case = int(case)
    number = number.upper()
    
    
    # --- LOG 1: What are we searching for? ---
    lemma_clean = lemma.strip().lower()
    print(f"DEBUG: Declining noun '{lemma}' -> Cleaned as '{lemma_clean}'")

    # Dynamic Path (Fix for Google Cloud)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.abspath(os.path.join(current_dir, "..", "czech_master.db"))
    

    # --- LOG 2: Path Check ---
    print(f"DEBUG: Searching for DB at {db_path}")


    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    verified = "UNVERIFIED" # Default to Yellow
    is_actually_irregular = False # nouns can use this for special patterns

    try:
        cur.execute("SELECT id, pattern_id, is_irr, irr_type FROM words WHERE lemma = ?", (lemma_clean,))
        row = cur.fetchone()

        # --- LOG 3: Result Check ---
        if row:
            print(f"DEBUG: Found '{lemma_clean}' in DB! Pattern: {row[0]}")
        else:
            print(f"DEBUG: '{lemma_clean}' NOT found in DB. Falling back to guess_pattern.")



    except Exception as e:
        print(f"DB Error: {e}")
        row = None
    finally:
        conn.close()

    if not row:
        verified = "UNVERIFIED" # Stays Yellow
        pattern_id = guess_pattern(lemma, is_animate, is_soft)
        is_irr, irr_type = 0, 0
    else:
        verified = True # Turns Green
        word_id, pattern_id, is_irr, irr_type = row
        # If it's a special irr_type, you can mark it irregular here
        if is_irr == 1:
            is_actually_irregular = True


    col_map = {
        (1, 'S'): ['nominativ', 'nominativ_2', 'nominativ_3'],
        (2, 'S'): ['genitiv', 'genitiv_2'],
        (3, 'S'): ['dativ', 'dativ_2'],
        (4, 'S'): ['akuzativ'],
        (5, 'S'): ['vokativ', 'vokativ_2', 'vokativ_3'],
        (6, 'S'): ['lokal', 'lokal_2', 'lokal_3'],
        (7, 'S'): ['instumental'], 
    }

    
    # --- LOG 4: Final Selection ---
    print(f"DEBUG: Using pattern_id: {pattern_id} (Verified: {verified})")


    # 1. INITIAL STEM
    if lemma.lower().endswith('um'):
        stem = lemma[:-2]
    else:
        stem = lemma[:-1] if lemma[-1] in ['o', 'a', 'e','ě', 'í'] else lemma

    # --- NEW: IRREGULAR STEM OVERRIDE (Updated for Singular & Plural) ---
    if is_irr == 1:
        # Define mapping based on Singular (S) or Plural (P)
        if number == 'S':
            mapping = {
                1: ['nominativ', 'nominativ_2', 'nominativ_3'],
                2: ['genitiv', 'genitiv_2'],
                3: ['dativ', 'dativ_2'],
                4: ['akuzativ'],
                5: ['vokativ', 'vokativ_2', 'vokativ_3'],
                6: ['lokal', 'lokal_2', 'lokal_3'],
                7: ['instumental']
            }
        else: # number == 'P'
            mapping = {
                1: ['nominativ_plural', 'nominativ_plural2', 'nominativ_plural3'],
                2: ['genitiv_plural'],
                3: ['dativ_plural'],
                4: ['akuzativ_plural'],
                5: ['vokativ_plural', 'vokativ_plural2', 'vokativ_plural3'],
                6: ['lokativ_plural', 'lokativ_plural2', 'lokativ_plural3'],
                7: ['instrumenatl_plural']
            }

        target_cols = mapping.get(case, [])

        if target_cols:
            conn = sqlite3.connect(db_path)
            cur = conn.cursor()
            try:
                # Select only the columns relevant to the current Case and Number
                query = f"SELECT {', '.join(target_cols)} FROM overrides WHERE word_id = ?"
                cur.execute(query, (word_id,))
                over_row = cur.fetchone()

                if over_row:
                    valid_values = [str(val).strip() for val in over_row 
                                    if val and str(val).lower() != 'nan' and str(val).strip() != ""]
                    
                    if valid_values:
                        result = ", ".join(valid_values)
                        return result, True, False, True, pattern_id
            except Exception as e:
                print(f"Override Error: {e}")
            finally:
                conn.close()

   # --- NEW: MOVABLE E LOGIC (e.g., pes -> ps-, zámek -> zámk-) ---
    # Works for both Verified (is_irr=1) and Guessed (is_irr=0) words
    if irr_type == 9 and not (case == 1 and number == 'S'):
        # Find the last occurrence of 'e' or 'ě'
        last_e_idx = max(stem.rfind('e'), stem.rfind('ě'))
        
        # If 'e' exists and is not the very first letter (e.g., 'erb' stays 'erb')
        if last_e_idx > 0:
            # Create a new stem by removing that specific 'e'
            stem = stem[:last_e_idx] + stem[last_e_idx+1:]
            print(f"DEBUG: Movable E removed. New stem: {stem}")

    # 2. SUFFIXES
    suffixes = {
        'město': {'S': {1:'o', 2:'a', 3:'u', 4:'o', 5:'o', 6:'u/ě', 7:'em'}, 'P': {1:'a', 2:'-', 3:'ům', 4:'a', 5:'a', 6:'ech', 7:'y'}},
        'jablko': {'S': {1:'o', 2:'a', 3:'u', 4:'o', 5:'o', 6:'u', 7:'em'}, 'P': {1:'a', 2:'-', 3:'ům', 4:'a', 5:'a', 6:'ách/ích', 7:'y'}},
        'moře': {'S': {1:'e', 2:'e', 3:'i', 4:'e', 5:'e', 6:'i', 7:'em'}, 'P': {1:'e', 2:'í', 3:'ím', 4:'e', 5:'e', 6:'ích', 7:'i'}},
        'kuře': {'S': {1:'e', 2:'ete', 3:'eti', 4:'e', 5:'e', 6:'eti', 7:'etem'}, 'P': {1:'ata', 2:'at', 3:'atům', 4:'ata', 5:'ata', 6:'atech', 7:'aty'}},
        'stavení': {'S': {1:'í', 2:'í', 3:'í', 4:'í', 5:'í', 6:'í', 7:'ím'}, 'P': {1:'í', 2:'í', 3:'ím', 4:'í', 5:'í', 6:'ích', 7:'í'}},
        # FEMININE
        'žena': {'S': {1:'a', 2:'y', 3:'ě', 4:'u', 5:'o', 6:'ě', 7:'ou'}, 'P': {1:'y', 2:'-', 3:'ám', 4:'y', 5:'y', 6:'ách', 7:'ami'}},
        'růže': {'S': {1:'e', 2:'e', 3:'i', 4:'i', 5:'e', 6:'i', 7:'í'}, 'P': {1:'e', 2:'í', 3:'ím', 4:'e', 5:'e', 6:'ích', 7:'emi'}},
        'ulice': {'S': {1:'e', 2:'e', 3:'i', 4:'i', 5:'e', 6:'i', 7:'í'}, 'P': {1:'e', 2:'í', 3:'ím', 4:'e', 5:'e', 6:'ích', 7:'emi'}},
        'píseň': {'S': {1:'', 2:'ě', 3:'i', 4:'', 5:'i', 6:'i', 7:'í'}, 'P': {1:'ě', 2:'í', 3:'ím', 4:'ě', 5:'ě', 6:'ích', 7:'ěmi'}},
        'kost': {'S': {1:'', 2:'i', 3:'i', 4:'', 5:'i', 6:'i', 7:'í'}, 'P': {1:'i', 2:'í', 3:'em', 4:'i', 5:'i', 6:'ech', 7:'mi'}},
        # MASCULINE ANIMATED
        'pán': {'S': {1:'', 2:'a', 3:'ovi/u', 4:'a', 5:'e', 6:'ovi/u', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'y', 5:'i/ové', 6:'ech', 7:'y'}},
        'hoch': {'S': {1:'', 2:'a', 3:'ovi/u', 4:'a', 5:'u', 6:'ovi/u', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'y', 5:'i/ové', 6:'ích', 7:'y'}},
        'občan': {'S': {1:'', 2:'a', 3:'ovi/u', 4:'a', 5:'e', 6:'ovi/u', 7:'em'}, 'P': {1:'é/i', 2:'ů', 3:'ům', 4:'y', 5:'é/i', 6:'ech', 7:'y'}},
        'muž': {'S': {1:'', 2:'e', 3:'ovi/i', 4:'e', 5:'i', 6:'ovi/i', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'e', 5:'i/ové', 6:'ích', 7:'i'}},
        'otec': {'S': {1:'', 2:'e', 3:'ovi/i', 4:'e', 5:'e', 6:'ovi/i', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'e', 5:'i/ové', 6:'ích', 7:'i'}},
        'obyvatel': {'S': {1:'', 2:'e', 3:'ovi/i', 4:'e', 5:'i', 6:'ovi/i', 7:'em'}, 'P': {1:'é/i', 2:'ů', 3:'ům', 4:'e', 5:'é/i', 6:'ích', 7:'i'}},
        'předseda': {'S': {1:'a', 2:'y', 3:'ovi', 4:'u', 5:'o', 6:'ovi', 7:'ou'}, 'P': {1:'ové', 2:'ů', 3:'ům', 4:'y', 5:'ové', 6:'ech', 7:'y'}},
        'husita': {'S': {1:'a', 2:'y', 3:'ovi', 4:'u', 5:'o', 6:'ovi', 7:'ou'}, 'P': {1:'é', 2:'ů', 3:'ům', 4:'y', 5:'é', 6:'ech', 7:'y'}},
        'soudce': {'S': {1:'e', 2:'e', 3:'ovi/i', 4:'e', 5:'e', 6:'ovi/i', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'e', 5:'i/ové', 6:'ích', 7:'i'}},
        # MASCULINE INANIMATED
        'hrad': {'S': {1:'', 2:'u', 3:'u', 4:'', 5:'e', 6:'u/ě', 7:'em'}, 'P': {1:'y', 2:'ů', 3:'ům', 4:'y', 5:'y', 6:'ech', 7:'y'}},
        'les': {'S': {1:'', 2:'a', 3:'u', 4:'', 5:'e', 6:'e/u', 7:'em'}, 'P': {1:'y', 2:'ů', 3:'ům', 4:'y', 5:'y', 6:'ích', 7:'y'}},
        'kalich': {'S': {1:'', 2:'u', 3:'u', 4:'', 5:'u', 6:'u', 7:'em'}, 'P': {1:'y', 2:'ů', 3:'ům', 4:'y', 5:'y', 6:'cích', 7:'y'}},
        'zámek': {'S': {1:'', 2:'u', 3:'u', 4:'', 5:'u', 6:'u/ě', 7:'em'}, 'P': {1:'y', 2:'ů', 3:'ům', 4:'y', 5:'y', 6:'ech', 7:'y'}},
        'stroj': {'S': {1:'', 2:'e', 3:'i', 4:'', 5:'i', 6:'i', 7:'em'}, 'P': {1:'e', 2:'ů', 3:'ím', 4:'e', 5:'e', 6:'ích', 7:'i'}}
    }

   

    
    # result_text with pattern badge, verified_status, is_reflexive, is_irregular
    # --- 3. APPLY SUFFIX & CONSONANT SHIFTS ---
    p_data = suffixes.get(pattern_id, suffixes['hrad'])
    
    if lemma.lower().endswith('um') and number == 'S':
        if case in [1, 4, 5]: 
            result = lemma
        else:
            suf = 'u' if case == 6 else p_data[number].get(case, '')
            result = apply_consonant_shift(lemma, stem, suf, pattern_id, case, number)
    else:
        suf = p_data[number].get(case, '')
        if '/' in suf:
            parts = suf.split('/')
            res1 = apply_consonant_shift(lemma, stem, parts[0], pattern_id, case, number)
            res2 = apply_consonant_shift(lemma, stem, parts[1], pattern_id, case, number)
            result = f"{res1}, {res2}"
        else:
            result = apply_consonant_shift(lemma, stem, suf, pattern_id, case, number)

    # --- 4. ADD PREPOSITIONS ---
    prepositions = {1: "", 2: "bez", 3: "k", 4: "pro", 5: "voláme:", 6: "o", 7: "s"}
    prep = prepositions.get(case, "")
    if prep and result:
        if "," in result:
            result = ", ".join([f"{prep} {r.strip()}" for r in result.split(",")])
        else:
            result = f"{prep} {result}"

    # --- 5. UNIFIED RETURN (Crucial to prevent 500 error) ---
    status_badges = [verified]
    status_badges.append("Singular" if number == 'S' else "Plural")
    if is_actually_irregular: status_badges.append("Irregular")
    status_badges.append(pattern_id)

    # Returns: result string, verified (bool), reflexive (bool), irregular (bool), pattern (str)
    return result, (verified is True), False, is_actually_irregular, pattern_id
