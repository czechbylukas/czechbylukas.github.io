export function startMatchGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const lang = state.language || "en";
  const seen = new Set();
  const filteredData = [];

  // 1. Filter out duplicate meanings (synonyms)
  state.data.forEach(w => {
    const main = w.cs.trim().toLowerCase();
    const syn = (w.synonym || "").trim().toLowerCase();

    if (!seen.has(main) && (!syn || !seen.has(syn))) {
      // Create a display string for the Czech side
      const joinedCs = (syn && syn !== "") ? `${w.cs} / ${w.synonym}` : w.cs;
      
      filteredData.push({
        en: w[lang] || w.en,
        csDisplay: joinedCs, // What they see
        csMatch1: w.cs,      // Primary match
        csMatch2: w.synonym  // Synonym match
      });

      seen.add(main);
      if (syn) seen.add(syn);
    }
  });

  const leftItems = filteredData.map(d => d.en);
  const rightItems = filteredData.map(d => d.csDisplay).sort(() => Math.random() - 0.5);


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

  let selected = null; // This will store { element, word, side }

  function handleBoxClick(clickedBox, side) {
    if (clickedBox.dataset.matched === "true") return;

    // 1. If nothing is selected yet, just select this box
    if (!selected) {
      selectBox(clickedBox, side);
      return;
    }

    // 2. If clicking the same box again, deselect it
    if (selected.element === clickedBox) {
      deselectBox();
      return;
    }

    // 3. If clicking another box on the SAME side, switch the selection
    if (selected.side === side) {
      deselectBox();
      selectBox(clickedBox, side);
      return;
    }

    // 4. If clicking a box on the OPPOSITE side, check for a match
    checkMatch(clickedBox);
  }

  function selectBox(div, side) {
    selected = { element: div, word: div.textContent, side: side };
    div.style.outline = "3px solid #333";
    div.style.transform = "scale(1.05)";
  }

  function deselectBox() {
    if (selected) {
      selected.element.style.outline = "";
      selected.element.style.transform = "scale(1)";
    }
    selected = null;
  }

  function checkMatch(secondBox) {
    const word1 = selected.word;
    const word2 = secondBox.textContent;

    // Check filteredData to see if word1 and word2 belong to the same entry
    const isCorrect = filteredData.some(d => 
      (d.en === word1 && d.csDisplay === word2) || 
      (d.en === word2 && d.csDisplay === word1)
    );

    if (isCorrect) {
      // SUCCESS
      const firstBox = selected.element;
      [firstBox, secondBox].forEach(el => {
        el.style.background = "#00C853";
        el.style.color = "white";
        el.dataset.matched = "true";
        el.style.outline = "";
        el.style.transform = "scale(1)";
      });
      selected = null;

      // Win Condition
      const remaining = Array.from(document.querySelectorAll('[data-matched="false"]'));
      if (remaining.length === 0) {
        result.textContent = "🎉 Excellent! All words matched!";
      }
    } else {
      // ERROR
      const firstBox = selected.element;
      [firstBox, secondBox].forEach(el => el.style.background = "#F44336");

      const tempFirst = firstBox;
      selected = null; // Clear selection immediately to prevent bugs

      setTimeout(() => {
        [tempFirst, secondBox].forEach(el => {
          if (el.dataset.matched !== "true") {
            el.style.background = "#FF9800";
            el.style.outline = "";
            el.style.transform = "scale(1)";
          }
        });
      }, 500);
    }
  }

  // 5. Attach the new handler to both grids
  leftCol.querySelectorAll("div").forEach(div => {
    div.onclick = () => handleBoxClick(div, "left");
  });

  rightCol.querySelectorAll("div").forEach(div => {
    div.onclick = () => handleBoxClick(div, "right");
  });
}