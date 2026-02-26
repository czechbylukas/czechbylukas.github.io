import sqlite3
import os

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
    if last == 'e':
        return 'růže'
    
    # Masculine (Consonants)
    if is_soft:
        return 'muž' if is_animate else 'stroj'
    
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

    return stem + suffix


# 1. Update the signature to include is_soft=False
def declension_noun(lemma, case, number, is_animate=False, is_soft=False):
    case = int(case)
    number = number.upper()
    
    db_path = os.path.join("VocabSQL_database", "czech_master.db")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    verified = True
    try:
        cur.execute("SELECT pattern_id, is_irr, irr_type FROM words WHERE lemma = ?", (lemma,))
        row = cur.fetchone()
    except:
        row = None
    conn.close()

    if not row:
        verified = False
        # 2. Update this call to pass is_soft to the guess_pattern function
        pattern_id = guess_pattern(lemma, is_animate, is_soft)
        is_irr, irr_type = 0, 0
    else:
        # If found in DB, we use the pattern from the database
        pattern_id, is_irr, irr_type = row

    # 1. STEM & DROP-E
    stem = lemma[:-1] if lemma[-1] in ['o', 'a', 'e', 'í'] else lemma
    if is_irr == 1 and irr_type == 9 and stem.endswith('e'):
        stem = stem[:-1]

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
        'pán': {'S': {1:'', 2:'a', 3:'ovi/u', 4:'a', 5:'e/i', 6:'ovi/u', 7:'em'}, 'P': {1:'i/ové', 2:'ů', 3:'ům', 4:'y', 5:'i/ové', 6:'ech', 7:'y'}},
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

    p_data = suffixes.get(pattern_id, suffixes['hrad'])
    suf = p_data[number].get(case, '')

    if '/' in suf:
        parts = suf.split('/')
        res1 = apply_consonant_shift(lemma, stem, parts[0], pattern_id, case, number)
        res2 = apply_consonant_shift(lemma, stem, parts[1], pattern_id, case, number)
        return f"{res1}, {res2}", verified

    result = apply_consonant_shift(lemma, stem, suf, pattern_id, case, number)
    return result, verified