// games/match.js
export function startMatchGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const lang = state.language || "en";

  // Left column: foreign language, in original order
  const leftItems = state.data.map(w => w[lang] || w.cs);

  // Right column: Czech words, shuffled randomly
  const rightItems = state.data.map(w => w.cs).sort(() => Math.random() - 0.5);

  container.innerHTML = `<h2>Match Game (${lang.toUpperCase()} → CS)</h2>
    <div style="display:flex;justify-content:center;gap:50px;max-width:700px;margin:auto;">
      <div id="left-column"></div>
      <div id="right-column"></div>
    </div>
    <p id="result"></p>
  `;

  const leftCol = document.getElementById("left-column");
  const rightCol = document.getElementById("right-column");
  const result = document.getElementById("result");

  // Render left column
  leftItems.forEach(word => {
    const div = document.createElement("div");
    div.textContent = word;
    div.dataset.word = word;
    div.style.padding = "10px 15px";
    div.style.background = "#FF9800"; // orange
    div.style.marginBottom = "10px";
    div.style.borderRadius = "8px";
    div.style.cursor = "pointer";
    leftCol.appendChild(div);
  });

  // Render right column
  rightItems.forEach(word => {
    const div = document.createElement("div");
    div.textContent = word;
    div.dataset.matched = "false";
    div.style.padding = "10px 15px";
    div.style.background = "#FF9800"; // orange
    div.style.marginBottom = "10px";
    div.style.borderRadius = "8px";
    div.style.cursor = "pointer";
    rightCol.appendChild(div);
  });

  let selectedLeft = null;

  // Left column click
  leftCol.querySelectorAll("div").forEach(div => {
    div.addEventListener("click", () => {
      if (selectedLeft) selectedLeft.style.outline = "";
      selectedLeft = div;
      div.style.outline = "3px solid #000";
    });
  });

  // Right column click
  rightCol.querySelectorAll("div").forEach(div => {
    div.addEventListener("click", () => {
      if (!selectedLeft) return;

      const leftWord = selectedLeft.dataset.word;
      const match = state.data.find(w => (w[lang] || w.cs) === leftWord);

      if (div.textContent === match.cs) {
        // Correct
        div.style.background = "#00C853"; // green
        selectedLeft.style.background = "#00C853";
        div.dataset.matched = "true";
        selectedLeft = null;

        // Check if all matched
        const allMatched = Array.from(rightCol.children).every(c => c.dataset.matched === "true");
        if (allMatched) result.textContent = "🎉 All matched!";
      } else {
        // Wrong
        div.style.background = "#F44336"; // red briefly
        setTimeout(() => {
          div.style.background = "#FF9800"; 
          selectedLeft.style.background = "#FF9800"; 
        }, 500);
        selectedLeft.style.outline = "";
        selectedLeft = null;
      }
    });
  });
}
