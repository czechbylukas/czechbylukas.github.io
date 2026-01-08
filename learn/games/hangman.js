export function startGame(state) {
  const container = document.getElementById("game");

  // Always use Czech words
  const words = state.data.map(x => x.cs);
  const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  let guessed = [];
  let attempts = 6;

  function render() {
    const display = word
      .split("")
      .map(l => (guessed.includes(l) ? l : "_"))
      .join(" ");

    container.innerHTML = `
      <p>${display}</p>
      <p>Pokusy: ${attempts}</p>
      <input id="letter" maxlength="1">
      <button id="guess">Hádám</button>
      <p id="msg"></p>
    `;

    const input = document.getElementById("letter");

    document.getElementById("guess").onclick = () => {
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
    };
  }

  render();
}
