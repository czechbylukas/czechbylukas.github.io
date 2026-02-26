from flask import Flask, request, jsonify
from flask_cors import CORS # Allows your HTML to talk to this server
# Import your existing functions
from Grammar_functions.past_tense import create_past_tense
# ... import others

app = Flask(__name__)
CORS(app) 

@app.route('/process', methods=['POST'])
def process_grammar():
    data = request.json
    mode = data.get('mode')
    word = data.get('word')
    
    # Example for Verb -> Past Tense
    if mode == "verb":
        tense = data.get('tense')
        p = data.get('person')
        g = data.get('gender')
        n = data.get('number')
        
        if tense == "past":
            result, verified, is_reflexive, irregular = create_past_tense(word, p, g, n)
            return jsonify({
                "result": result,
                "status": ["PAST", "VERIFIED" if verified else "UNVERIFIED"]
            })

    # Add your Noun/Present/Future logic here...
    return jsonify({"error": "Logic not matched"}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)