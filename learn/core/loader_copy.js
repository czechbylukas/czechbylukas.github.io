/**
 * GameEngine - Handles data preparation and dynamic loading of game modules.
 */
export class GameEngine {
    /**
     * fetchData is a helper if you want the engine to query the DB directly.
     * Note: In your games.html, you are already doing this, but this is here for consistency.
     */
    fetchData(db, level, lesson, topic) {
        // 1. Removed 'phrase' from query (it doesn't exist as a column)
        const query = `SELECT lemma, trans_en, image_path, ext1, pos FROM words 
                       WHERE level='${level}' AND lesson='${lesson}' AND pos='${topic}'
                       ORDER BY RANDOM() LIMIT 20`;
                       
        const res = db.exec(query);
        if (!res[0]) return [];

        console.log("RAW SQL RESULT:", res[0].values[0]); 

        return res[0].values.map(row => ({
            cs: row[0] || "",
            en: row[1] || "",
            image: row[2] || null,
            ext1: row[3] || "",   // ext1 is row index 3
            pos: row[4] || "",    // pos is row index 4
            
            phrase: row[3] || row[0] // Use ext1 (where the keywords/phrase usually live) or fallback to lemma
          
        }));
    }

    /**
     * render - The main "switchboard" that launches games.
     * Matches the logic of your old loader but wrapped in a class.
     */
    async render(gameType, data, containerSelector, language = 'en') {
        const container = document.querySelector(containerSelector);

        // --- THE DATA TRANSFORMER ---
        // This converts Database Words into Game Questions
        // Inside async render(...) in loader.js
// --- THE DATA TRANSFORMER ---
        // 1. FILTER: For 'fillGap' and 'writeAnswer', only keep rows where pos is 'Phrase'
        // 1. Use the pre-linked data from games.html
        const formattedQuestions = data.map((item, index) => {
            
            
            
            const targetVerb = item.cs;     // e.g. "dívat se"
            const sentence = item.phrase;   // e.g. "Dívám se na nový film."
            
            // Clean root to find "Dívám" inside the sentence
            const cleanVerb = targetVerb.replace(/\b(se|si)\b/g, '').trim();
// If word is short (like "dát"), use only the 1st letter as root. 
// If long, use the first 3 letters.
            const root = cleanVerb.length > 3 ? cleanVerb.substring(0, 3) : cleanVerb.substring(0, 1);
            const regex = new RegExp(`\\b${root}[a-zěščřžýáíéůú]*\\b`, 'gi');
                        
            let displayHtml = "";
            let gapData = [];

            if (sentence && sentence !== targetVerb) {
                const match = sentence.match(regex);
                const surfaceWord = match ? match[0] : targetVerb;
                
                displayHtml = `
                    <div style="font-size: 0.9rem; color: #666;">${item.phraseEn || item.en}</div>
                    <div style="font-size: 1.4rem;">${sentence.replace(regex, "{{gap}}")}</div>`;
                // UPDATE THIS LINE:
                gapData = [{ 
                    surface: surfaceWord, 
                    lemma: targetVerb, 
                    synonym: item.synonym || "" 
                     }];

        } else {
                displayHtml = `<div style="font-size: 1.8rem;">${item.en}</div><div style="margin-top:10px;">{{gap}}</div>`;
                // AND UPDATE THIS LINE:
                gapData = [{ surface: targetVerb, lemma: targetVerb, synonym: item.synonym || "" }];
            }


            console.log(`Word Object [${index}]:`, item, "Answer:", gapData[0].surface);


            return { 
                ...item, 
                text: displayHtml, 
                gapDetails: gapData, 
                cs: targetVerb, 
                answers: [gapData[0].surface] 
            };
        });

        const state = {
            data: formattedQuestions,     // For the 'wrongOptions' pool
            questions: formattedQuestions, // For the main loop
            language: language
        };

        // 2. Clear the container and show loading
        if (!data || data.length === 0) {
            container.innerHTML = "<div>❌ No data found for this selection.</div>";
            return;
        }
        container.innerHTML = "⏳ Načítám hru...";

        try {
            // 3. Dynamic Hand-off (The "Switchboard")
            // This replaces your old loader's switch statement
            switch (gameType) {
                case "flashcards":
                    const fc = await import("../games/flashcards.js");
                    fc.startFlashcardsGame(state);
                    break;

                case "mcq":
                    const mcq = await import("../games/mcq.js");
                    mcq.startGame(state);
                    break;

                case "hangman":
                    const hg = await import("../games/hangman.js");
                    hg.startGame(state);
                    break;

                case "fillGap":
                    const fg = await import("../games/fillGap.js");
                    fg.startGame(state);
                    break;

                case "dragDrop":
                    const dd = await import("../games/dragDrop.js");
                    dd.startDragDropGame(state);
                    break;

                case "orderWords":
                    const ow = await import("../games/orderWords.js");
                    ow.startOrderWords(state);
                    break;

                case "sentenceBuilder":
                    const sb = await import("../games/sentenceBuilder.js");
                    sb.startSentenceBuilder(state);
                    break;

                case "memory":
                    const mem = await import("../games/memory.js");
                    mem.startMemoryGame(state);
                    break;

                case "pexeso":
                    const pex = await import("../games/pexeso.js");
                    pex.startPexesoGame(state);
                    break;

                case "match":
                    const mat = await import("../games/match.js");
                    mat.startMatchGame(state);
                    break;

                case "speedClick":
                    const sc = await import("../games/speedClick.js");
                    sc.startSpeedClick(state);
                    break;

                case "fallingWords":
                    const fw = await import("../games/fallingWords.js");
                    fw.startFallingWords(state);
                    break;

                case "writeAnswer":
    const wa = await import("../games/writeAnswer.js");
    wa.startWriteAnswerGame(state);
    break;
                    

                default:
                    container.innerHTML = `❌ Game "${gameType}" is not yet connected to the database engine.`;
                    console.warn(`No case for ${gameType} in loader.js`);
            }
        } catch (err) {
            console.error("Critical Game Load Error:", err);
            container.innerHTML = "❌ Error loading the game file. Check console for details.";
        }
    }
}