import requests
from bs4 import BeautifulSoup
import os
import traceback
import sqlite3
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

# --- IMPORT YOUR GRAMMAR BRAINS ---
from Grammar_functions.past_tense import create_past_tense
from Grammar_functions.present_tense import create_present_tense
from Grammar_functions.future_tense import create_future_tense
from Grammar_functions.noun_declension import declension_noun
from Grammar_functions.declension_pronoun_number import declension_pronoun_number

# ==============================================================================
# ADJECTIVE DECLENSION FUNCTION
# ==============================================================================
def declension_adjective(lemma, case, gender, number):
    try:
        case = int(case)
    except (ValueError, TypeError):
        case = 1

    number = str(number).upper()
    gender = str(gender).lower()  # 'm' (animate), 'mi' (inanimate), 'f', 'n'

    # Standardize gender inputs
    if gender in ['ma', 'm']:
        gender = 'm'
    elif gender == 'mi':
        gender = 'mi'
    elif gender in ['f', 'female']:
        gender = 'f'
    elif gender in ['n', 'neuter']:
        gender = 'n'
    else:
        gender = 'm'

    lemma = str(lemma).strip()
    is_soft = lemma.endswith('í')
    stem = lemma[:-1] if len(lemma) > 1 else lemma

    # Helper for Czech palatalization (Hard adj plural M. anim - 1. & 5. case)
    def palatalize(s):
        if s.endswith('sk'): return s[:-2] + 'št'
        if s.endswith('ck'): return s[:-2] + 'čt'
        if s.endswith('k'):  return s[:-1] + 'č'
        if s.endswith('h'):  return s[:-1] + 'z'
        if s.endswith('ch'): return s[:-2] + 'š'
        if s.endswith('r'):  return s[:-1] + 'ř'
        if s.endswith('t'):  return s[:-1] + 't'  # t + í (written as tí)
        if s.endswith('d'):  return s[:-1] + 'd'  # d + í (written as dí)
        if s.endswith('n'):  return s[:-1] + 'n'  # n + í (written as ní)
        return s

    # --- SUFFIX DICTIONARY ---
    adj_suffixes = {
        'hard': {
            'S': {
                'm':  {1: 'ý', 2: 'ého', 3: 'ému', 4: 'ého', 5: 'ý', 6: 'ém', 7: 'ým'},
                'mi': {1: 'ý', 2: 'ého', 3: 'ému', 4: 'ý',   5: 'ý', 6: 'ém', 7: 'ým'},
                'f':  {1: 'á', 2: 'é',   3: 'é',   4: 'ou',  5: 'á', 6: 'é',  7: 'ou'},
                'n':  {1: 'é', 2: 'ého', 3: 'ému', 4: 'é',   5: 'é', 6: 'ém', 7: 'ým'}
            },
            'P': {
                'm':  {1: 'í', 2: 'ých', 3: 'ým', 4: 'é',   5: 'í', 6: 'ých', 7: 'ými'},
                'mi': {1: 'é', 2: 'ých', 3: 'ým', 4: 'é',   5: 'é', 6: 'ých', 7: 'ými'},
                'f':  {1: 'é', 2: 'ých', 3: 'ým', 4: 'é',   5: 'é', 6: 'ých', 7: 'ými'},
                'n':  {1: 'á', 2: 'ých', 3: 'ým', 4: 'á',   5: 'á', 6: 'ých', 7: 'ými'}
            }
        },
        'soft': {
            'S': {
                'm':  {1: 'í', 2: 'ího', 3: 'ímu', 4: 'ího', 5: 'í', 6: 'ím', 7: 'ím'},
                'mi': {1: 'í', 2: 'ího', 3: 'ímu', 4: 'í',   5: 'í', 6: 'ím', 7: 'ím'},
                'f':  {1: 'í', 2: 'í',   3: 'í',   4: 'í',   5: 'í', 6: 'í',  7: 'í'},
                'n':  {1: 'í', 2: 'ího', 3: 'ímu', 4: 'í',   5: 'í', 6: 'ím', 7: 'ím'}
            },
            'P': {
                'm':  {1: 'í', 2: 'ích', 3: 'ím', 4: 'í',   5: 'í', 6: 'ích', 7: 'ími'},
                'mi': {1: 'í', 2: 'ích', 3: 'ím', 4: 'í',   5: 'í', 6: 'ích', 7: 'ími'},
                'f':  {1: 'í', 2: 'ích', 3: 'ím', 4: 'í',   5: 'í', 6: 'ích', 7: 'ími'},
                'n':  {1: 'í', 2: 'ích', 3: 'ím', 4: 'í',   5: 'í', 6: 'ích', 7: 'ími'}
            }
        }
    }

    type_key = 'soft' if is_soft else 'hard'
    num_key = number if number in ['S', 'P'] else 'S'
    lookup_gender = gender if gender in adj_suffixes[type_key][num_key] else 'm'

    res_suffix = adj_suffixes[type_key][num_key][lookup_gender].get(case, '')

    # Apply palatalization for hard adjectives in M. anim Plural (1st and 5th case)
    if not is_soft and num_key == 'P' and lookup_gender == 'm' and case in [1, 5]:
        current_stem = palatalize(stem)
    else:
        current_stem = stem

    result = current_stem + res_suffix

    is_possessive = False
    is_verified = True
    is_irregular = False
    wiki_value = None
    wiki_debug = None

    return result, is_verified, is_possessive, is_irregular, wiki_value, wiki_debug

# ==============================================================================
# FLASK SERVER & ROUTE SETUP
# ==============================================================================
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

def scrape_wiktionary_table(word, mode='noun', gender='M'):
    url = f"https://cs.wiktionary.org/wiki/{word}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        target_cases = [
            {"label": "Nominativ (1.)", "keys": ["nominativ", "1. pád"]},
            {"label": "Genitiv (2.)", "keys": ["genitiv", "2. pád"]},
            {"label": "Dativ (3.)", "keys": ["dativ", "3. pád"]},
            {"label": "Akuzativ (4.)", "keys": ["akuzativ", "4. pád"]},
            {"label": "Vokativ (5.)", "keys": ["vokativ", "5. pád"]},
            {"label": "Lokál (6.)", "keys": ["lokál", "6. pád"]},
            {"label": "Instrumentál (7.)", "keys": ["instrumentál", "7. pád"]}
        ]

        for table in soup.find_all('table', {'class': 'deklinace'}):
            rows = table.find_all('tr')
            results = []
            
            for case in target_cases:
                for row in rows:
                    cells = row.find_all(['th', 'td'])
                    if cells and any(k in cells[0].get_text().lower() for k in case["keys"]):
                        
                        # --- NOUN LOGIC (3 columns) ---
                        if mode == 'noun' and len(cells) >= 3:
                            results.append({
                                "case": case["label"],
                                "singular": cells[1].get_text(strip=True),
                                "plural": cells[2].get_text(strip=True)
                            })
                            break

                        # --- ADJECTIVE LOGIC (Dynamic column layout by gender) ---
                        elif mode in ['adj', 'adjective']:
                            col_s = 1
                            col_p = 5
                            
                            if gender == 'F':
                                col_s, col_p = 3, 7
                            elif gender == 'N':
                                col_s, col_p = 4, 8
                            elif gender in ['M', 'MA']:
                                col_s, col_p = 1, 5
                            elif gender == 'MI':
                                col_s, col_p = 2, 6

                            if len(cells) > max(col_s, col_p):
                                results.append({
                                    "case": case["label"],
                                    "singular": cells[col_s].get_text(strip=True),
                                    "plural": cells[col_p].get_text(strip=True)
                                })
                            else:
                                sing_txt = cells[1].get_text(strip=True) if len(cells) > 1 else ""
                                plur_txt = cells[2].get_text(strip=True) if len(cells) > 2 else sing_txt
                                results.append({
                                    "case": case["label"],
                                    "singular": sing_txt,
                                    "plural": plur_txt
                                })
                            break

            if len(results) > 0:
                return results

    except Exception as e:
        print(f"Error scraping Wiktionary: {e}")
        print(traceback.format_exc())
        return None

    return None

@app.route('/scrape_declension', methods=['GET'])
def get_external_declension():
    word = request.args.get('word')
    mode = request.args.get('mode', 'noun')
    gender = request.args.get('gender', 'M')

    if not word:
        return jsonify({"error": "No word provided"}), 400
    
    data = scrape_wiktionary_table(word, mode=mode, gender=gender)
    if data:
        return jsonify(data)
    return jsonify({"error": "Table not found on Wiktionary"}), 404

@app.route('/scrape_conjugation', methods=['GET'])
def scrape_conjugation():
    """Exposes verb engines to frontend validation calls with detailed terminal print logging."""
    word = request.args.get('word', '').strip()
    tense = request.args.get('tense', '').strip()
    person = request.args.get('person', '1')
    number = request.args.get('number', 'S')
    gender = request.args.get('gender', 'M')

    if not word:
        return jsonify({"error": "No word provided"}), 400

    try:
        if tense == 'past':
            res_str, is_ver, refl, irr, wiki_val, wiki_debug = create_past_tense(word, person, gender, number)
        elif tense == 'present':
            res_str, is_ver, refl, irr, wiki_val, wiki_debug = create_present_tense(
                word, person, gender, number
            )
        elif tense == 'future':
            res_str, vid, is_ver, irr = create_future_tense(word, person, gender, number)
            refl = "se" in word or "si" in word
            wiki_val, wiki_debug = None, None
        else:
            return jsonify({"error": f"Invalid tense parameter: {tense}"}), 400

        print("\n" + "="*50)
        print(f"VERB VERIFICATION LOG FOR: '{word}' ({tense.upper()})")
        print(f"Parameters: Person={person}, Number={number}, Gender={gender}")
        print("-"*50)
        print(f"-> MY BACKEND RESULT:   '{res_str}'")
        print(f"-> WAS IT IRREGULAR?:  {irr}")
        print(f"-> FINAL API RETURN:   '{res_str}' (Verified status: {is_ver})")
        print("="*50 + "\n")

        return jsonify({
            "form": res_str,
            "verified": is_ver,
            "reflexive": refl,
            "irregular": irr,
            "wiki_debug_extracted": wiki_val,
            "wiki_debug_log": wiki_debug
        })

    except Exception as e:
        print("\n" + "!"*50)
        print(f"CRITICAL ROUTE ERROR IN SCRAPE_CONJUGATION: {e}")
        print("!"*50 + "\n")
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "HackCzech API is Running", 200

@app.route('/process', methods=['POST'])
def process_word():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
            
        mode = data.get('mode') 
        word = data.get('word')
        
        if data.get('check_only'):
            res, ver, refl, irr, pattern = declension_noun(word, "1", "S", False, False)
            status = "VERIFIED" if ver is True else "UNVERIFIED"
            return jsonify({"status": status})
            
        tense = data.get('tense')
        person = data.get('person')
        gender = data.get('gender')
        case = data.get('case')
        number = data.get('number')
        degree = data.get('degree', '1')
        is_animate = data.get('is_animate', False)
        is_soft = data.get('is_soft', False)

        result_text = ""
        status_badges = []
        
        wiki_val = None
        wiki_debug = None
        
        res, ver, refl, irr, pattern = "", False, False, False, None 

        # --- Main Grammar Logic ---
        if mode == 'verb':
            if tense == 'past':
                res, ver, refl, irr, wiki_val, wiki_debug = create_past_tense(word, person, gender, number)
            elif tense == 'present':
                res, ver, refl, irr, wiki_val, wiki_debug = create_present_tense(
                    word, person, gender, number
                )
            elif tense == 'future':
                res, vid, ver, irr = create_future_tense(word, person, gender, number)
                if vid:
                    status_badges.append(vid)
                refl = "se" in word or "si" in word
            result_text = res

        elif mode == 'noun':
            res, ver, refl, irr, pattern = declension_noun(word, case, number, is_animate, is_soft)
            result_text = res
            if pattern:
                status_badges.append(pattern)

        elif mode in ['adj', 'adjective']:
            res, ver, is_possessive, irr, wiki_val, wiki_debug = declension_adjective(
                word, case, gender, number
            )
            result_text = res
            if is_possessive:
                status_badges.append("Possessive")
            if degree in ['2', '3']:
                status_badges.append(f"Degree {degree}")

        elif mode in ['pronoun', 'number']:
            res, ver, refl, irr = declension_pronoun_number(word, case, number, gender, mode)
            result_text = res

        # --- UNIVERSAL BADGE LOGIC ---        
        if ver is True:
            status_badges.append(True)
        else:
            status_badges.append("UNVERIFIED")

        if irr is True:
            status_badges.append("Irregular")

        if number:
            status_badges.append("Singular" if number == 'S' else "Plural")
            
        return jsonify({
            "result": result_text, 
            "status": status_badges,
            "wiki_value": wiki_val,
            "wiki_debug": wiki_debug
        })

    except Exception as e:
        error_trace = traceback.format_exc()
        print(error_trace)
        return jsonify({
            "error": str(e),
            "traceback": error_trace
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)