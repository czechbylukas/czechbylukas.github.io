import { numbersData } from "../data/numbers.js";

export function startGame(state) {
  try {
    const container = document.getElementById("game");

    // Get words for selected level
    const levelWords = numbersData[state.level];
    if (!levelWords || levelWords.length === 0) {
      throw new Error("No data for selected level");
    }

    // Pick a random word
    const wordObj = levelWords[Math.floor(Math.random() * levelWords.length)];
    const word = wordObj.cs.toLowerCase();

    let guessed = [];
    let attempts = 6;

    function render() {
      const display = word
        .split("")
        .map(l => (guessed.includes(l) ? l : "_"))
        .join(" ");

      container.innerHTML = `
        <p style="font-size:2rem; letter-spacing:0.5rem;">${display}</p>
        <p>Pokusy: ${attempts}</p>
        <input id="letter" maxlength="1">
        <button id="guess">Hádám</button>
        <p id="msg"></p>
      `;

      const input = document.getElementById("letter");
      const button = document.getElementById("guess");

      // Always focus the input after rendering
      input.focus();

      function checkGuess() {
        const letter = input.value.toLowerCase();
        if (!letter || guessed.includes(letter)) return;

        guessed.push(letter);

        if (word.split("").every(l => guessed.includes(l))) {
          container.innerHTML = "<h2>🎉 Vyhráli jste!</h2>";
          return;
        } else if (attempts <= 0) {
          container.innerHTML = `<h2>❌ Prohráli jste</h2><p>Slovo bylo: ${word}</p>`;
          return;
        } else {
          if (!word.includes(letter)) attempts--;
          render();
        }
      }

      // Click handler
      button.onclick = () => {
        checkGuess();
        input.value = "";
        input.focus();
      };

      // Enter key handler
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          checkGuess();
          input.value = "";
          input.focus();
        }
      });
    }

    render();
    console.log("Hangman word:", word);

  } catch (err) {
    console.error("Game load error:", err);
    container.textContent = "Error loading Hangman: " + err.message;
  }
}
