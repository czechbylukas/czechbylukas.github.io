export class GameEngine {
    fetchData(db, level, lesson, gameType) {
        let query = "";
        // If it's a phrase-based game, prioritize rows with phrases
        if (['fillGap', 'orderWords', 'sentenceBuilder'].includes(gameType)) {
            query = `SELECT lemma, phrase, trans_en, image_path FROM words 
                     WHERE level='${level}' AND lesson='${lesson}' 
                     AND phrase IS NOT NULL AND phrase != '' 
                     ORDER BY RANDOM() LIMIT 10`;
        } else {
            query = `SELECT lemma, trans_en, image_path FROM words 
                     WHERE level='${level}' AND lesson='${lesson}' 
                     ORDER BY RANDOM() LIMIT 10`;
        }

        const res = db.exec(query);
        if (!res[0]) return [];

        return res[0].values.map(row => ({
            czech: row[0],
            phrase: row[1] || "",
            english: row[2],
            image: row[3]
        }));
    }

    render(type, data, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!data || data.length === 0) {
            container.innerHTML = "<div>No data found for this selection.</div>";
            return;
        }
        container.innerHTML = ""; 

        switch(type) {
            case 'fillGap': this.startFillGap(data[0], container); break;
            case 'mcq': this.startMCQ(data, container); break;
            case 'orderWords': this.startOrderWords(data[0], container); break;
            default: container.innerHTML = `Game "${type}" is coming soon!`;
        }
    }

    // --- GAME: MULTIPLE CHOICE ---
    startMCQ(data, container) {
        const current = data[0];
        // Get 3 random wrong answers from the rest of the data
        let distractors = data.slice(1, 4).map(d => d.czech);
        let choices = this.shuffle([current.czech, ...distractors]);

        container.innerHTML = `
            <div class="game-expanded">
                <h3>Multiple Choice</h3>
                <p style="font-size: 1.5rem;">How do you say: <b>${current.english}</b>?</p>
                <div id="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    ${choices.map(c => `<button class="game-btn" onclick="this.dispatchEvent(new CustomEvent('check', {detail: '${c}'}))">${c}</button>`).join('')}
                </div>
                <div id="feedback" style="margin-top: 20px; font-weight: bold;"></div>
            </div>
        `;

        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('check', (e) => {
                const feedback = container.querySelector('#feedback');
                if (e.detail === current.czech) {
                    feedback.innerText = "Correct! 🎉";
                    feedback.style.color = "green";
                } else {
                    feedback.innerText = "Try again! ❌";
                    feedback.style.color = "red";
                }
            });
        });
    }

    // --- GAME: FILL IN THE GAP ---
    startFillGap(item, container) {
        const regex = new RegExp(item.czech, 'gi');
        const displayPhrase = item.phrase.replace(regex, `____`);

        container.innerHTML = `
            <div class="game-expanded">
                <h3>Fill in the Gap</h3>
                <p><i>${item.english}</i></p>
                <div style="font-size: 1.8rem; margin: 20px 0;">
                    ${displayPhrase.replace('____', `<input type="text" id="gap-input" style="width: 200px; text-align: center;">`)}
                </div>
                <button id="check-btn" class="test-btn">Check</button>
                <div id="feedback" style="margin-top: 20px;"></div>
            </div>
        `;

        const input = container.querySelector('#gap-input');
        container.querySelector('#check-btn').onclick = () => {
            const feedback = container.querySelector('#feedback');
            if (input.value.trim().toLowerCase() === item.czech.toLowerCase()) {
                feedback.innerHTML = "<span style='color:green'>Excellent!</span>";
            } else {
                feedback.innerHTML = `<span style='color:red'>Not quite. Correct answer: ${item.czech}</span>`;
            }
        };
    }



    // --- GAME: ORDER THE WORDS ---
    startOrderWords(item, container) {
        // 1. Prepare the words
        const originalPhrase = item.phrase.trim();
        const wordsArray = originalPhrase.split(/\s+/); // Split by any whitespace
        let shuffledWords = this.shuffle([...wordsArray]);
        let userSequence = [];

        container.innerHTML = `
            <div class="game-expanded">
                <h3>Order the Words</h3>
                <p><i>${item.english}</i></p>
                
                <div id="sentence-builder-area" style="min-height: 60px; border-bottom: 2px dashed #ccc; margin: 20px 0; padding: 10px; font-size: 1.5rem;"></div>
                
                <div id="word-pool" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                    ${shuffledWords.map((word, index) => `<button class="game-btn word-chip" data-index="${index}">${word}</button>`).join('')}
                </div>

                <div style="margin-top: 30px;">
                    <button id="reset-sentence" class="test-btn" style="background: #666;">Reset</button>
                    <button id="check-sentence" class="test-btn">Check</button>
                </div>
                <div id="feedback" style="margin-top: 20px; font-weight: bold;"></div>
            </div>
        `;

        const builderArea = container.querySelector('#sentence-builder-area');
        const feedback = container.querySelector('#feedback');

        // Handle clicking words in the pool
        container.querySelectorAll('.word-chip').forEach(btn => {
            btn.onclick = () => {
                const word = btn.innerText;
                userSequence.push(word);
                
                // Add to builder area
                const span = document.createElement('span');
                span.innerText = word + " ";
                span.style.marginRight = "5px";
                builderArea.appendChild(span);
                
                // Hide the button so it can't be clicked twice
                btn.style.visibility = 'hidden';
            };
        });

        // Reset Logic
        container.querySelector('#reset-sentence').onclick = () => {
            userSequence = [];
            builderArea.innerHTML = "";
            container.querySelectorAll('.word-chip').forEach(btn => btn.style.visibility = 'visible');
            feedback.innerText = "";
        };

        // Check Logic
        container.querySelector('#check-sentence').onclick = () => {
            const userJoined = userSequence.join(' ').toLowerCase().replace(/[.?!]/g, "");
            const originalJoined = originalPhrase.toLowerCase().replace(/[.?!]/g, "");

            if (userJoined === originalJoined) {
                feedback.innerHTML = "<span style='color:green'>Perfectly assembled! 🎉</span>";
            } else {
                feedback.innerHTML = `<span style='color:red'>Not quite. Try: ${originalPhrase}</span>`;
            }
        };
    }


    

    // Helper: Shuffle Array
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}