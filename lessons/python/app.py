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
CORS(app)

# Important: Update the base_dir to help the functions find the DB
base_dir = os.path.dirname(os.path.abspath(__file__))

def get_db_connection():
    # Points to your symlinked database
    db_path = os.path.join(base_dir, 'czech_master.db')
    return sqlite3.connect(db_path)

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.json
        mode = data.get('mode') # 'verb' or 'noun'
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

        # --- VERB LOGIC ---
        if mode == 'verb':
            if tense == 'past':
                res, ver, refl, irr = create_past_tense(word, person, gender, number)
            elif tense == 'present':
                res, ver, refl, irr = create_present_tense(word, person, gender, number)
            elif tense == 'future':
                res, vid, ver, irr = create_future_tense(word, person, gender, number)
                status_badges.append(vid) # Show Aspect (Perfective/Imperfective)
            
            result_text = res
            if ver: status_badges.append("VERIFIED")
            else: status_badges.append("GUESSED")
            if irr: status_badges.append("IRREGULAR")

        # --- NOUN LOGIC ---
        elif mode == 'noun':
            res, ver = declension_noun(word, case, number, is_animate, is_soft)
            result_text = res
            status_badges.append("VERIFIED" if ver else "UNVERIFIED")

        return jsonify({
            "result": result_text,
            "status": status_badges
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)