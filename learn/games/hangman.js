// games/hangman.js

export function startGame(state) {
  try {
    const container = document.getElementById("game");

    // 1. REPAIR: Use state.data which is already set by the loader 
    // based on the selected topic and level.
    const levelWords = state.data;

    if (!levelWords || levelWords.length === 0) {
      throw new Error("Žádná data pro vybranou úroveň");
    }

    // 2. Pick a random word object from the dynamic list
    const wordObj = levelWords[Math.floor(Math.random() * levelWords.length)];
    
    // Use the Czech word (cs) and clean it up (lowercase)
    const word = wordObj.cs.toLowerCase().trim();

    let guessed = [];
    let attempts = 6;

    function render() {
      // Create the hidden word display (e.g., "p _ s _")
      const display = word
        .split("")
        .map(l => {
          // Keep spaces visible if the word has multiple words
          if (l === " ") return "&nbsp;";
          return guessed.includes(l) ? l : "_";
        })
        .join(" ");

      container.innerHTML = `
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 2rem; letter-spacing: 0.5rem; font-family: monospace;">${display}</p>
          <p>Pokusy: <strong>${attempts}</strong></p>
          <input id="letter" maxlength="1" style="width: 40px; text-align: center; font-size: 1.5rem;">
          <button id="guess">Hádám</button>
          <p id="msg" style="color: red;"></p>
        </div>
      `;

      const input = document.getElementById("letter");
      const button = document.getElementById("guess");
      const msg = document.getElementById("msg");

      input.focus();

      function checkGuess() {
        const letter = input.value.toLowerCase().trim();
        
        // Reset message
        msg.textContent = "";

        if (!letter) return;
        
        // Check if already guessed
        if (guessed.includes(letter)) {
          msg.textContent = "Toto písmeno jsi už hádal(a).";
          input.value = "";
          return;
        }

        guessed.push(letter);

        // Logic for incorrect guess
        if (!word.includes(letter)) {
          attempts--;
        }

        // Check Win/Loss conditions
        const isWon = word.split("").every(l => l === " " || guessed.includes(l));
        
        if (isWon) {
          container.innerHTML = `
            <div style="text-align: center;">
              <h2>🎉 Vyhráli jste!</h2>
              <p>Slovo: <strong>${word}</strong></p>
              <button onclick="location.reload()">Hrát znovu</button>
            </div>`;
          return;
        } 
        
        if (attempts <= 0) {
          container.innerHTML = `
            <div style="text-align: center;">
              <h2>❌ Prohráli jste</h2>
              <p>Slovo bylo: <strong>${word}</strong></p>
              <button onclick="location.reload()">Zkusit znovu</button>
            </div>`;
          return;
        }

        // Re-render state
        render();
      }

      // Event Listeners
      button.onclick = () => checkGuess();
      
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          checkGuess();
        }
      });
    }

    render();
    console.log("Hangman topic:", state.topic, "| Word:", word);

  } catch (err) {
    console.error("Game load error:", err);
    document.getElementById("game").textContent = "Error: " + err.message;
  }
}