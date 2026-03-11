import sqlite3
import os
from Grammar_functions.noun_declension import declension_noun
from Grammar_functions.adjective_declension import declension_adjective

def declension_pronoun_number(lemma, case, number, gender, mode):
    """
    Handles pronouns and numbers by deciding if they look like adjectives 
    or if they need a database override.
    """
    
    # 1. Check if it ends in 'ý' or 'í' (Adjectival Pronouns/Numbers)
    # Examples: každý, nějaký, první, druhý
    if lemma.endswith(('ý', 'í')):
        return declension_adjective(lemma, case, number, gender)

    # 2. Otherwise, treat it as an Irregular Noun for database lookup.
    # This handles: můj, ten, náš, jeden, dva, etc.
    # It will look in the 'overrides' table for 'genitiv', 'dativ', etc.
    return declension_noun(lemma, case, number)