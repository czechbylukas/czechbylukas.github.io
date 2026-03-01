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

# 1. Apply CORS globally to all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Health Check Route (To see if server is even running)
@app.route('/')
def home():
    return "HackCzech API is Running", 200

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    # 2. Handshake handling for the Browser "Scout" (OPTIONS)
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    # 3. Main Grammar Logic
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
            # 1. Get the dictionary from your function
            noun_data = declension_noun(word, case, number, is_animate, is_soft)
            
            # 2. Extract the pieces
            result_text = noun_data['result']
            is_ver = noun_data['verified']
            debug_string = noun_data['debug']
            
            # 3. Add to status
            status_badges.append("VERIFIED" if is_ver else "UNVERIFIED")
            
            # 4. SEND THE DEBUG INFO BACK (Crucial step!)
            resp = jsonify({
                "result": result_text, 
                "status": status_badges,
                "debug": debug_string  # This makes it appear in F12
            })
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp

        # 4. Successful Response with CORS header
        resp = jsonify({"result": result_text, "status": status_badges})
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    except Exception as e:
        # 5. Error Response with CORS header (So you see the real error in Console)
        error_resp = jsonify({"error": str(e)})
        error_resp.headers.add("Access-Control-Allow-Origin", "*")
        return error_resp, 500

if __name__ == '__main__':
    # Cloud environments use the PORT env variable
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)