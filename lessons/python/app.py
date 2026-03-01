import os
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

# --- IMPORT YOUR GRAMMAR BRAINS ---
from Grammar_functions.past_tense import create_past_tense
from Grammar_functions.present_tense import create_present_tense
from Grammar_functions.future_tense import create_future_tense
from Grammar_functions.noun_declension import declension_noun

app = Flask(__name__)

# Strong CORS policy
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

base_dir = os.path.dirname(os.path.abspath(__file__))

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    # 1. HANDLE THE HANDSHAKE (CORS FIX)
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response

    # 2. HANDLE THE ACTUAL LOGIC
    try:
        data = request.json
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

        if mode == 'verb':
            if tense == 'past':
                res, ver, refl, irr = create_past_tense(word, person, gender, number)
            elif tense == 'present':
                res, ver, refl, irr = create_present_tense(word, person, gender, number)
            elif tense == 'future':
                res, vid, ver, irr = create_future_tense(word, person, gender, number)
                status_badges.append(vid)
            
            result_text = res
            if ver: status_badges.append("VERIFIED")
            else: status_badges.append("GUESSED")
            if irr: status_badges.append("IRREGULAR")

        elif mode == 'noun':
            res, ver = declension_noun(word, case, number, is_animate, is_soft)
            result_text = res
            status_badges.append("VERIFIED" if ver else "UNVERIFIED")

        # 3. ATTACH CORS HEADER TO THE SUCCESSFUL RESPONSE TOO
        resp = jsonify({"result": result_text, "status": status_badges})
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    except Exception as e:
        error_resp = jsonify({"error": str(e)})
        error_resp.headers.add("Access-Control-Allow-Origin", "*")
        return error_resp, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)