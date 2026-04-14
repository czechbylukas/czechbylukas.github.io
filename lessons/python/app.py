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