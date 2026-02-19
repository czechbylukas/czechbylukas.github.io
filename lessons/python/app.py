import os
import sqlite3
from datetime import datetime
from flask import Flask, render_template, jsonify, request, send_from_directory
from google.oauth2 import service_account
from googleapiclient.discovery import build

# --- 1. SETTINGS & PATHS ---
# base_dir is /lessons
base_dir = os.path.dirname(os.path.abspath(__file__)) 
# root_dir is /czechbylukas.github.io
root_dir = os.path.dirname(base_dir)

app = Flask(__name__, template_folder=base_dir)

def get_db_connection():
    # Now it looks in /czechbylukas.github.io/VocabSQL_database/...
    db_path = os.path.join(root_dir, 'VocabSQL_database', 'czech_master.db')
    return sqlite3.connect(db_path)

# --- 2. FILE SERVING ROUTES ---

@app.route('/')
def index():
    return render_template('001_lesson.html')

@app.route('/css/style.css')
def serve_main_css():
    return send_from_directory(os.path.join(root_dir, 'css'), 'style.css')

@app.route('/footer.html')
def serve_footer():
    return send_from_directory(root_dir, 'footer.html')

@app.route('/scripts-header.js')
def serve_header_js():
    return send_from_directory(root_dir, 'scripts-header.js')

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(root_dir, 'images'), filename)

@app.route('/sidebar/sidebar.html')
def serve_sidebar():
    return send_from_directory(os.path.join(root_dir, 'sidebar'), 'sidebar.html')

# --- 3. API LOGIKA ---

@app.route('/get_verbs')
def get_verbs():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Using 'words' table as confirmed
        cursor.execute("SELECT word FROM words WHERE pos = 'verb'")
        verbs = [row[0] for row in cursor.fetchall()]
        conn.close()
        return jsonify(verbs)
    except Exception as e:
        return jsonify(["Error: " + str(e)])

@app.route('/save_to_google', methods=['POST'])
def save_to_google():
    data = request.json
    doc_id = data.get('doc_id')
    sentences = data.get('sentences')
    date_str = datetime.now().strftime("%d.%m.%Y")
    
    SERVICE_ACCOUNT_FILE = os.path.join(base_dir, 'credentials.json')

    try:
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, 
            scopes=['https://www.googleapis.com/auth/documents']
        )
        service = build('docs', 'v1', credentials=creds)
        
        full_text = f"\n\n--- Lekce Minulý čas ({date_str}) ---\n"
        full_text += "\n".join(sentences)
        full_text += "\n\nDomácí úkol:\nnapiš 10 vět s minulým časem\n1.\n2.\n3...\n"

        requests = [{'insertText': {'location': {'index': 1}, 'text': full_text}}]
        service.documents().batchUpdate(documentId=doc_id, body={'requests': requests}).execute()
        
        return jsonify({"status": "success"})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)