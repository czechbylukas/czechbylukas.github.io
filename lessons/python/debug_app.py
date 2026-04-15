import urllib.parse
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def scrape_genitive(word):
    url = f"https://cs.wiktionary.org/wiki/{urllib.parse.quote(word)}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    try:
        print(f"--- Attempting to scrape: {word} ---")
        response = requests.get(url, timeout=5, headers=headers)
        
        if response.status_code != 200:
            return f"Error: Status code {response.status_code}"

        soup = BeautifulSoup(response.content, 'html.parser')
        table = soup.find('table', {'class': 'inflection-table'})
        
        if not table:
            return "Error: No inflection table found."

        # The Genitive (2. pád) is almost always the SECOND row (index 1) 
        # that contains data cells (td).
        rows = table.find_all('tr')
        data_rows = [r for r in rows if r.find_all('td')]
        
        if len(data_rows) >= 2:
            genitive_cell = data_rows[1].find_all('td')[0]
            # Clean the result
            result = genitive_cell.get_text(strip=True).split(',')[0].split('[')[0]
            print(f"Success! Found: {result}")
            return result
        
        return "Error: Could not find Genitive row."

    except Exception as e:
        return f"System Error: {str(e)}"

@app.route('/test', methods=['POST'])
def test_route():
    data = request.get_json()
    word = data.get('word', '')
    result = scrape_genitive(word)
    return jsonify({"word": word, "genitive": result})

if __name__ == '__main__':
    app.run(port=5001, debug=True)