import os
import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.oauth2 import service_account
from googleapiclient.discovery import build

# --- 1. SETTINGS & PATHS ---
base_dir = os.path.dirname(os.path.abspath(__file__)) 

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    db_path = os.path.join(base_dir, 'czech_master.db')
    return sqlite3.connect(db_path)

# --- 2. API LOGIKA ---

@app.route('/get_verbs')
def get_verbs():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # FIXED: Changed 'word' to 'lemma' to match your database
        cursor.execute("SELECT lemma FROM words WHERE pos = 'verb'")
        verbs = [row[0] for row in cursor.fetchall()]
        conn.close()
        return jsonify(verbs)
    except Exception as e:
        # This will now tell us if there's any other column mismatch
        return jsonify(["Error: " + str(e)])

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_word():
    # Handle the browser's "handshake" (Preflight request)
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.json
        word = data.get('word')
        mode = data.get('mode')
        
        return jsonify({
            "result": f"Processing {word} as {mode}...",
            "status": ["CONNECTED", "BETA"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/save_to_google', methods=['POST', 'OPTIONS'])
def save_to_google():
    if request.method == 'OPTIONS': return '', 200
    
    data = request.json
    doc_id = data.get('doc_id')
    sentences = data.get('sentences')
    date_str = datetime.now().strftime("%d.%m.%Y")
    
    SERVICE_ACCOUNT_FILE = os.path.join(base_dir, 'credentials.json')

    try:
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/documents']
        )
        service = build('docs', 'v1', credentials=creds)
        
        full_text = f"\n\n--- Lekce Minulý čas ({date_str}) ---\n"
        full_text += "\n".join(sentences)
        
        requests = [{'insertText': {'location': {'index': 1}, 'text': full_text}}]
        service.documents().batchUpdate(documentId=doc_id, body={'requests': requests}).execute()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)