export function startPexesoGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const lang = state.language || "en";
  const uniquePairs = [];
  const seen = new Set();

  // 1. Filter and Join logic
  state.data.forEach(w => {
    const main = w.cs.trim().toLowerCase();
    const syn = (w.synonym || "").trim().toLowerCase();

    // Only process if we haven't seen this meaning yet
    if (!seen.has(main) && (!syn || !seen.has(syn))) {
      // Create the joined Czech text
      const joinedCs = (syn && syn !== "") ? `${w.cs} / ${w.synonym}` : w.cs;
      const translation = w[lang] || w.en || w.cs;

      // Add two separate objects: one Czech, one English, both sharing the same pairId
      uniquePairs.push({ text: joinedCs, pairId: main });
      uniquePairs.push({ text: translation, pairId: main });

      // Mark both forms as seen
      seen.add(main);
      if (syn) seen.add(syn);
    }
  });

  // 2. Use our filtered pairs
  const shuffled = uniquePairs.sort(() => Math.random() - 0.5);

  container.innerHTML = `<h2>Pexeso (CS → ${lang.toUpperCase()})</h2><div id="pexeso-board" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(100px,1fr)); gap:10px; max-width:600px; margin:auto;"></div><p id="result"></p>`;

  const board = document.getElementById("pexeso-board");
  const result = document.getElementById("result");

  let firstCard = null;
  let lock = false;
  let matches = 0;

  shuffled.forEach((item, idx) => {
    const card = document.createElement("div");
    card.classList.add("pexeso-card");
    card.dataset.pair = item.pairId;
    card.style.padding = "15px";
    card.style.background = "#2196F3";
    card.style.color = "#fff";
    card.style.borderRadius = "8px";
    card.style.textAlign = "center";
    card.style.cursor = "pointer";
    card.textContent = "?";
    board.appendChild(card);

    card.addEventListener("click", () => {
      if (lock || card.textContent !== "?") return;
      card.textContent = item.text;

      if (!firstCard) {
        firstCard = card;
      } else {
        if (firstCard.dataset.pair === card.dataset.pair) {
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
