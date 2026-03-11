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

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
            
        mode = data.get('mode') 
        word = data.get('word')
        tense = data.get('tense')
        person = data.get('person')
        number = data.get('number')
        gender = data.get('gender')
        case = data.get('case')
        is_animate = data.get('is_animate', False)
        is_soft = data.get('is_soft', False)

        result_text = ""
        status_badges = []
        
        # Initialize default values to avoid errors if a mode doesn't match
        res, ver, refl, irr = "", False, False, False

        # --- 3. Main Grammar Logic ---
        if mode == 'verb':
            if tense == 'past':
                res, ver, refl, irr = create_past_tense(word, person, gender, number)
            elif tense == 'present':
                res, ver, refl, irr = create_present_tense(word, person, gender, number)
            elif tense == 'future':
                res, vid, ver, irr = create_future_tense(word, person, gender, number)
                status_badges.append(vid)
            result_text = res

        elif mode == 'noun':
            res, ver, refl, irr = declension_noun(word, case, number, is_animate, is_soft)
            result_text = res

        elif mode == 'adjective':
            res, ver, refl, irr = declension_adjective(word, case, number, gender)
            result_text = res

        elif mode in ['pronoun', 'number']:
            # Call our new combined logic
            res, ver, refl, irr = declension_pronoun_number(word, case, number, gender, mode)
            result_text = res

        # --- UNIVERSAL BADGE LOGIC ---
        if ver is True:
            status_badges.append(True)
        else:
            status_badges.append("UNVERIFIED")

        if irr is True:
            status_badges.append("IRREGULAR")

        # --- 4. SUCCESSFUL RESPONSE ---
        resp = jsonify({"result": result_text, "status": status_badges})
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    except Exception as e:
        error_resp = jsonify({"error": str(e)})
        error_resp.headers.add("Access-Control-Allow-Origin", "*")
        return error_resp, 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)