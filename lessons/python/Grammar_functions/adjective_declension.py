def declension_adjective(lemma, case, number, gender):
    case = int(case)
    number = number.upper()
    gender = gender.lower() # 'm' (animate), 'mi' (inanimate), 'f', 'n'

    # Hard Adjectives (mladý) vs Soft (jarní)
    is_soft = True if lemma.endswith('í') else False
    stem = lemma[:-1]

    # --- THE SUFFIX MAP ---
    adj_suffixes = {
        'hard': {
            'S': {
                'm':  {1:'ý', 2:'ého', 3:'ému', 4:'ého', 5:'ý', 6:'ém', 7:'ým'},
                'mi': {1:'ý', 2:'ého', 3:'ému', 4:'ý',   5:'ý', 6:'ém', 7:'ým'},
                'f':  {1:'á', 2:'é',   3:'é',   4:'ou',  5:'á', 6:'é',  7:'ou'},
                'n':  {1:'é', 2:'ého', 3:'ému', 4:'é',   5:'é', 6:'ém', 7:'ým'}
            },
            'P': {
                'm':  {1:'í', 2:'ých', 3:'ým', 4:'é',   5:'í', 6:'ých', 7:'ými'},
                'mi': {1:'é', 2:'ých', 3:'ým', 4:'é',   5:'é', 6:'ých', 7:'ými'},
                'f':  {1:'é', 2:'ých', 3:'ým', 4:'é',   5:'é', 6:'ých', 7:'ými'},
                'n':  {1:'á', 2:'ých', 3:'ým', 4:'á',   5:'á', 6:'ých', 7:'ými'}
            }
        },
        'soft': {
            'S': {
                'm':  {1:'í', 2:'ího', 3:'ímu', 4:'ího', 5:'í', 6:'ím', 7:'ím'},
                'f':  {1:'í', 2:'í',   3:'í',   4:'í',   5:'í', 6:'í',  7:'í'},
                'n':  {1:'í', 2:'ího', 3:'ímu', 4:'í',   5:'í', 6:'ím', 7:'ím'}
            },
            # Soft adjectives are easy: almost everything is 'í', 'ích', or 'ími'
        }
    }

    type_key = 'soft' if is_soft else 'hard'
    
    # Simple fallback: Soft adjectives use 'm' rules for 'mi' and 'n'
    lookup_gender = gender if gender in adj_suffixes[type_key][number] else 'm'
    
    res_suffix = adj_suffixes[type_key][number][lookup_gender].get(case, '')
    
    result = stem + res_suffix
    # Return 4 values to stay consistent with your main.py
    return result, "UNVERIFIED", False, False