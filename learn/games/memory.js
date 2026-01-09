// games/memory.js
export function startMemoryGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const words = state.data.map(w => w.cs);
  const pairs = [...words, ...words]; // duplicate for pairs
  const shuffled = pairs.sort(() => Math.random() - 0.5);

  container.innerHTML = `<h2>Memory Game</h2><div id="memory-board" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(80px,1fr)); gap:10px; max-width:500px; margin:auto;"></div><p id="result"></p>`;

  const board = document.getElementById("memory-board");
  const result = document.getElementById("result");

  let firstCard = null;
  let lock = false;
  let matches = 0;

  shuffled.forEach((word, idx) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.word = word;
    card.style.padding = "15px";
    card.style.background = "#4CAF50";
    card.style.color = "#fff";
    card.style.borderRadius = "8px";
    card.style.textAlign = "center";
    card.style.cursor = "pointer";
    card.textContent = "?";
    board.appendChild(card);

    card.addEventListener("click", () => {
      if (lock || card.textContent !== "?") return;
      card.textContent = word;

      if (!firstCard) {
        firstCard = card;
      } else {
        if (firstCard.dataset.word === card.dataset.word) {
          matches += 2;
          firstCard = null;
          if (matches === shuffled.length) {
            result.textContent = "🎉 You matched all!";
          }
        } else {
          lock = true;
          setTimeout(() => {
            firstCard.textContent = "?";
            card.textContent = "?";
            firstCard = null;
            lock = false;
          }, 1000);
        }
      }
    });
  });
}
