from Grammar_functions.past_tense import create_past_tense
from Grammar_functions.present_tense import create_present_tense
from Grammar_functions.future_tense import create_future_tense
from Grammar_functions.noun_declension import declension_noun

def test_tool():
    print("--- Czech Grammar Tester (Verbs & Nouns) ---")
    
    mode = input("Choose Mode (verb/noun): ").strip().lower()
    word = input(f"Enter {mode}: ").strip()
    
    result_text = ""
    verified = False
    status = []
    info_text = ""
    is_reflexive = False
    irregular = False

    # --- NOUN LOGIC ---
    if mode == "noun":
        case = input("Choose Case (1-7): ").strip()
        n = input("Number (S, P): ").strip().upper()
        
        # Initial check in database
        result_text, verified = declension_noun(word, case, n)

        if not verified:
            print(f"--> Word '{word}' not in DB. Let's identify the pattern:")
            is_animate = False
            is_soft = False
            last_char = word[-1].lower()

            # Consonant Logic: Only ask if it's not a vowel
            if last_char not in ['o', 'í', 'a', 'e']:
                is_animate = input("Is it Living (person/animal)? (y/n): ").lower() == 'y'
                
                soft_cons = ['ž', 'š', 'č', 'ř', 'c', 'j', 'ď', 'ť', 'ň']
                hard_cons = ['h', 'ch', 'k', 'r', 'd', 't', 'n']
                
                if any(word.endswith(c) for c in soft_cons):
                    is_soft = True
                elif word.endswith('ch') or any(word.endswith(c) for c in hard_cons):
                    is_soft = False
                else:
                    # Ambiguous consonants (b, f, l, m, p, s, v, z)
                    is_soft = input("Is the ending SOFT (muž/stroj) or HARD (pán/hrad)? (s/h): ").lower() == 's'
            
            # Re-run declension with guessed parameters
            result_text, _ = declension_noun(word, case, n, is_animate, is_soft)
            status.append("UNVERIFIED")

    # --- VERB LOGIC ---
    elif mode == "verb":
        tense = input("Choose Tense (past/present/future): ").strip().lower()
        p = input("Person (1, 2, 3): ").strip()
        n = input("Number (S, P): ").strip().upper()
        
        g = "N/A"
        if tense == "past":
            g = input("Gender (M, Mi, F, N): ").strip()

        if tense == "present":
            result_text, verified, is_reflexive, irregular = create_present_tense(word, p, g, n)
        elif tense == "future":
            result_text, info_text, verified, irregular = create_future_tense(word, p, g, n)
            is_reflexive = " se" in word.lower() or " si" in word.lower()
        elif tense == "past":
            result_text, verified, is_reflexive, irregular = create_past_tense(word, p, g, n)
        
        if irregular: status.append("IRREGULAR")
        if is_reflexive: status.append("REFLEXIVE")
        if info_text: status.append(info_text)
        if not verified: status.append("UNVERIFIED")

    else:
        print("Invalid mode.")
        return

    # --- SHARED FINAL OUTPUT ---
    note = f" ({', '.join(status)})" if status else ""
    print("\n" + "="*30)
    print(f"Result: {result_text}{note}")
    print("="*30)

if __name__ == "__main__":
    test_tool()