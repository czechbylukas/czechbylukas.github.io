// games/memory.js
export function startMemoryGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  // Join cs and synonym with a slash if synonym exists
  // 1. Create a Set to track unique meanings
  const uniqueList = [];
  const seen = new Set();

  state.data.forEach(w => {
    const main = w.cs.trim().toLowerCase();
    const syn = (w.synonym || "").trim().toLowerCase();

    // 2. Only add if we haven't seen this word OR its synonym yet
    if (!seen.has(main) && (!syn || !seen.has(syn))) {
      const combined = (syn && syn !== "") ? `${w.cs} / ${w.synonym}` : w.cs;
      uniqueList.push(combined);
      
      // 3. Mark both as seen so the "reverse" row is skipped
      seen.add(main);
      if (syn) seen.add(syn);
    }
  });

  // 4. Use our unique list for the pairs
  const pairs = [...uniqueList, ...uniqueList]; 
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
