import os
import sqlite3
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

# --- IMPORT YOUR GRAMMAR BRAINS ---
from Grammar_functions.past_tense import create_past_tense
from Grammar_functions.present_tense import create_present_tense
from Grammar_functions.future_tense import create_future_tense
from Grammar_functions.noun_declension import declension_noun

app = Flask(__name__)

# 1. BULLETPROOF CORS: Allow all origins, all methods, and all headers
CORS(app, resources={r"/*": {"origins": "*"}}, 
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    # 2. AGGRESSIVE OPTIONS HANDLING
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response, 200

    # 3. ACTUAL LOGIC
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

        # 4. MANUALLY ATTACH HEADER TO JSON RESPONSE
        resp = jsonify({"result": result_text, "status": status_badges})
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    except Exception as e:
        err_resp = jsonify({"error": str(e)})
        err_resp.headers.add("Access-Control-Allow-Origin", "*")
        return err_resp, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)