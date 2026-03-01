import os
import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.oauth2 import service_account
from googleapiclient.discovery import build

# --- 1. SETTINGS & PATHS ---
# This folder is: /lessons/python
base_dir = os.path.dirname(os.path.abspath(__file__)) 

# This jumps UP two levels to reach the root (czechbylukas.github.io)
# Level 1: python -> lessons
# Level 2: lessons -> root
root_dir = os.path.abspath(os.path.join(base_dir, "../.."))

app = Flask(__name__)
CORS(app) # Allows your GitHub site to talk to this server

def get_db_connection():
    # Looks for the database in the root folder
    db_path = os.path.join(root_dir, 'VocabSQL_database', 'czech_master.db')
    return sqlite3.connect(db_path)

# --- 2. API LOGIKA ---

@app.route('/get_verbs')
def get_verbs():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT word FROM words WHERE pos = 'verb'")
        verbs = [row[0] for row in cursor.fetchall()]
        conn.close()
        return jsonify(verbs)
    except Exception as e:
        return jsonify(["Error: " + str(e)])

@app.route('/save_to_google', methods=['POST', 'OPTIONS'])
def save_to_google():
    if request.method == 'OPTIONS': return '', 200
    
    data = request.json
    doc_id = data.get('doc_id')
    sentences = data.get('sentences')
    date_str = datetime.now().strftime("%d.%m.%Y")
    
    # Credentials stay inside the python folder
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