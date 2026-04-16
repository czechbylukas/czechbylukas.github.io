import requests # Add this
from bs4 import BeautifulSoup # Add this
import os
import sqlite3
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

# --- IMPORT YOUR GRAMMAR BRAINS ---
from Grammar_functions.past_tense import create_past_tense
from Grammar_functions.present_tense import create_present_tense
from Grammar_functions.future_tense import create_future_tense
from Grammar_functions.noun_declension import declension_noun
# Check if this path matches your folder exactly:
from Grammar_functions.adjective_declension import declension_adjective
from Grammar_functions.declension_pronoun_number import declension_pronoun_number


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})







def scrape_wiktionary_table(word):
    url = f"https://cs.wiktionary.org/wiki/{word}"
    headers = {'User-Agent': 'Mozilla/5.0'}
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

        for table in soup.find_all('table'):
            rows = table.find_all('tr')
            results = []
            for case in target_cases:
                for row in rows:
                    cells = row.find_all(['th', 'td'])
                    if cells and any(k in cells[0].get_text().lower() for k in case["keys"]):
                        if len(cells) >= 3:
                            results.append({
                                "case": case["label"],
                                "singular": cells[1].get_text(strip=True),
                                "plural": cells[2].get_text(strip=True)
                            })
                        break
            if len(results) >= 3:
                return results
    except Exception as e:
        print(f"Scraper error: {e}")
        return None
    return None





@app.route('/scrape_declension', methods=['GET'])
def get_external_declension():
    word = request.args.get('word')
    if not word:
        return jsonify({"error": "No word provided"}), 400
    
    data = scrape_wiktionary_table(word)
    if data:
        return jsonify(data)
    return jsonify({"error": "Table not found on Wiktionary"}), 404



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
        tense = data.get('tense')
        person = data.get('person')
        
        gender = data.get('gender')
        case = data.get('case')
        number = data.get('number')
        is_animate = data.get('is_animate', False)
        is_soft = data.get('is_soft', False)

        result_text = ""
        status_badges = []
        
        # Initialize default values (Add 'pattern' here)
        res, ver, refl, irr, pattern = "", False, False, False, None 

        # --- 3. Main Grammar Logic ---
        if mode == 'verb':
            if tense == 'past':
                res, ver, refl, irr = create_past_tense(word, person, gender, number)
            elif tense == 'present':
                res, ver, refl, irr = create_present_tense(word, person, gender, number)
            elif tense == 'future':
                # Future tense has 'vid' instead of 'refl' usually
                res, vid, ver, irr = create_future_tense(word, person, gender, number)
                status_badges.append(vid)
            result_text = res

        elif mode == 'noun':
            # 1. Call the function (returns the word and the verification status)
            res, ver, refl, irr, pattern = declension_noun(word, case, number, is_animate, is_soft)
            result_text = res
            
            # 2. Add the Verification Badge (True = Green, "UNVERIFIED" = Yellow)
            if ver is True:
                status_badges.append(True)
            else:
                status_badges.append("UNVERIFIED")

            # 3. Add the Pattern Badge (e.g., "hrad")
            if pattern:
                status_badges.append(pattern)

        elif mode == 'adjective':
            res, ver, refl, irr = declension_adjective(word, case, number, gender)
            result_text = res

        elif mode in ['pronoun', 'number']:
            # Call our new combined logic
            res, ver, refl, irr = declension_pronoun_number(word, case, number, gender, mode)
            result_text = res

        # --- UNIVERSAL BADGE LOGIC ---        
        # 1. Verification (Green/Yellow)
        if ver is True:
            status_badges.append(True)        # JS will turn this Green (VERIFIED)
        else:
            status_badges.append("UNVERIFIED") # JS will turn this Yellow (GUESSED)

        # 2. Irregularity (Red)
        if irr is True:
            status_badges.append("Irregular")

        # 3. Number Badge
        if number:
            status_badges.append("Singular" if number == 'S' else "Plural")
            

        # 4. CLEAN RETURN
        # Notice: No more manual "Access-Control-Allow-Origin" lines here!
        return jsonify({"result": result_text, "status": status_badges})

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)