from flask import Flask, request, jsonify
from flask_cors import CORS
import sys

# Import your functions
try:
    from Grammar_functions.past_tense import create_past_tense
    from Grammar_functions.present_tense import create_present_tense
    from Grammar_functions.future_tense import create_future_tense
    from Grammar_functions.noun_declension import declension_noun
except ImportError as e:
    print(f"IMPORT ERROR: {e}")

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_grammar():
    try:
        data = request.json
        print(f"---> Received from HTML: {data}")

        mode = data.get('mode')
        word = data.get('word')
        tense = data.get('tense')
        
        # Verb Logic
        if mode == "verb":
            p = data.get('person')
            g = data.get('gender')
            n = data.get('number', 'S')

            if tense == "past":
                res, ver, refl, irr = create_past_tense(word, p, g, n)
                return jsonify({"result": res, "status": ["PAST"]})
            
            elif tense == "present":
                res, ver, refl, irr = create_present_tense(word, p, g, n)
                return jsonify({"result": res, "status": ["PRESENT"]})
            
            elif tense == "future":
                # Adjusted for your future_tense signature (result, info, verified, irregular)
                res, info, ver, irr = create_future_tense(word, p, g, n)
                return jsonify({"result": res, "status": ["FUTURE"]})

        # Noun Logic
        elif mode == "noun":
            case = data.get('case')
            num = data.get('number', 'S')
            res, ver = declension_noun(word, case, num)
            return jsonify({"result": res, "status": ["NOUN"]})

        # Catch-all for unmatched logic
        return jsonify({"result": "No matching rule found", "status": ["ERROR"]})

    except Exception as e:
        print(f"CRASH: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)