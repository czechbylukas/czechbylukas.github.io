// games/match.js
export function startMatchGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const lang = state.language || "en";

  // Data preparation
  const leftItems = state.data.map(w => w[lang] || w.en);
  const rightItems = state.data.map(w => w.cs).sort(() => Math.random() - 0.5);

  // 1. Layout with Grid Containers
  container.innerHTML = `
    <h2 style="text-align:center; margin-bottom: 20px;">Match Game</h2>
    
    <div style="max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h3 style="font-size: 1rem; color: #666;">${lang.toUpperCase()} Words</h3>
        <div id="left-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;"></div>
      </div>

      <hr style="border: 0; border-top: 1px solid #ddd; margin: 10px 0;">

      <div>
        <h3 style="font-size: 1rem; color: #666;">Czech Translations</h3>
        <div id="right-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;"></div>
      </div>
    </div>

    <p id="result" style="text-align:center; font-weight:bold; margin-top: 20px; min-height: 1.5em;"></p>
  `;

  const leftCol = document.getElementById("left-grid");
  const rightCol = document.getElementById("right-grid");
  const result = document.getElementById("result");

  // Helper to create word boxes
  function createWordDiv(word) {
    const div = document.createElement("div");
    div.textContent = word;
    div.style.padding = "12px 8px";
    div.style.background = "#FF9800"; // Orange
    div.style.borderRadius = "8px";
    div.style.cursor = "pointer";
    div.style.textAlign = "center";
    div.style.transition = "all 0.2s";
    div.style.userSelect = "none";
    return div;
  }

  // 2. Render Words
  leftItems.forEach(word => {
    const div = createWordDiv(word);
    div.dataset.word = word;
    leftCol.appendChild(div);
  });

  rightItems.forEach(word => {
    const div = createWordDiv(word);
    div.dataset.matched = "false";
    rightCol.appendChild(div);
  });

  let selectedLeft = null;

  // 3. Logic for selecting Left Column
  leftCol.querySelectorAll("div").forEach(div => {
    div.addEventListener("click", () => {
      // Clear previous selection
      if (selectedLeft) {
        selectedLeft.style.outline = "";
        selectedLeft.style.transform = "scale(1)";
      }
      // Set new selection
      selectedLeft = div;
      div.style.outline = "3px solid #333";
      div.style.transform = "scale(1.05)";
    });
  });

  // 4. Logic for selecting Right Column
  rightCol.querySelectorAll("div").forEach(div => {
    div.addEventListener("click", () => {
      if (!selectedLeft || div.dataset.matched === "true") return;

      const leftWord = selectedLeft.dataset.word;
      const match = state.data.find(w => (w[lang] || w.en) === leftWord);

      if (div.textContent === match.cs) {
        // SUCCESS
        div.style.background = "#00C853"; // Green
        div.style.color = "white";
        div.dataset.matched = "true";
        
        selectedLeft.style.background = "#00C853";
        selectedLeft.style.color = "white";
        selectedLeft.style.outline = "";
        selectedLeft.style.transform = "scale(1)";
        selectedLeft = null;

        // Check Win Condition
        const remaining = Array.from(rightCol.children).filter(c => c.dataset.matched === "false");
        if (remaining.length === 0) {
          result.textContent = "🎉 Excellent! All words matched!";
        }
      } else {
        // ERROR
        const originalLeft = selectedLeft;
        div.style.background = "#F44336"; // Red
        originalLeft.style.background = "#F44336";

        setTimeout(() => {
          div.style.background = "#FF9800";
          originalLeft.style.background = "#FF9800";
          originalLeft.style.outline = "";
          originalLeft.style.transform = "scale(1)";
        }, 500);
        
        selectedLeft = null;
      }
    });
  });
}