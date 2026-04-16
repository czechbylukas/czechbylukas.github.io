import requests
from bs4 import BeautifulSoup

def get_czech_declension(word):
    url = f"https://cs.wiktionary.org/wiki/{word}"
    
    # Headers make the request look like it's coming from a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 404:
            return f"Error: The word '{word}' was not found on Wiktionary."
        elif response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        soup = BeautifulSoup(response.text, 'html.parser')
        tables = soup.find_all('table')

        target_cases = [
            ("Nominativ", ["nominativ", "1. pád"]),
            ("Genitiv", ["genitiv", "2. pád"]),
            ("Dativ", ["dativ", "3. pád"]),
            ("Akuzativ", ["akuzativ", "4. pád"]),
            ("Vokativ", ["vokativ", "5. pád"]),
            ("Lokál", ["lokál", "6. pád"]),
            ("Instrumentál", ["instrumentál", "7. pád"])
        ]

        for table in tables:
            rows = table.find_all('tr')
            results = []
            
            for label, keys in target_cases:
                # Find the row where the first cell matches our case keys
                for row in rows:
                    cells = row.find_all(['th', 'td'])
                    if not cells: continue
                    
                    first_cell_text = cells[0].get_text(strip=True).lower()
                    if any(k in first_cell_text for k in keys):
                        # Extract the Singular and Plural columns
                        if len(cells) >= 3:
                            singular = cells[1].get_text(strip=True)
                            plural = cells[2].get_text(strip=True)
                            results.append(f"{label:15} | {singular:15} | {plural}")
                        break
            
            # If we found at least 3 cases, we found the right table
            if len(results) >= 3:
                print(f"\nDeclension for: {word.upper()}")
                print("-" * 50)
                print(f"{'Pád':15} | {'Jednotné':15} | {'Množné'}")
                print("-" * 50)
                for line in results:
                    print(line)
                return

        print("Could not find a declension table for this word.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
word_to_search = input("Enter a Czech noun: ")
get_czech_declension(word_to_search)