// games/dragDrop.js
export function startDragDropGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  // 1. Validate data from state
  if (!state.data || state.data.length === 0) {
    container.innerHTML = "❌ Žádná data pro tuto lekci.";
    return;
  }

  // 2. Define the "Winning Order" (Alphabetical by Czech word)
  // We use localeCompare to handle Czech special characters (č, š, ž, etc.) correctly
  const correctOrder = state.data
    .map(w => w.cs)
    .sort((a, b) => a.localeCompare('cs'));

  // 3. Create the Shuffled starting list
  const shuffledWords = [...correctOrder].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div style="text-align:center; max-width:500px; margin:auto;">
      <h2>Seřaďte slova abecedně</h2>
      <p style="color: #666;">Seřaďte slova od A do Z přetažením:</p>
      
      <div id="drag-container" style="display:flex; flex-direction:column; gap:8px; margin:20px 0;"></div>
      
      <button id="check-order" style="background: #2f52b5; color: white; padding: 12px 25px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1.1rem;">Zkontrolovat</button>
      <p id="result" style="margin-top:20px; font-weight: bold; font-size: 1.2rem; min-height: 30px;"></p>
    </div>
  `;

  const dragContainer = document.getElementById("drag-container");
  let dragSrcEl = null;

  // 4. Create Draggable Elements
  shuffledWords.forEach(word => {
    const item = document.createElement("div");
    item.classList.add("draggable-item");
    item.textContent = word;
    item.draggable = true;
    item.dataset.word = word;
    
    // Styling
    item.style.cssText = "padding: 12px; background: #fff; color: #2c3e50; border: 2px solid #2f52b5; border-radius: 8px; cursor: grab; text-align: center; font-weight: 600; transition: background 0.2s;";

    // Drag Events
    item.addEventListener("dragstart", function(e) {
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = "move";
      this.style.opacity = "0.4";
      this.style.background = "#eef2ff";
    });

    item.addEventListener("dragover", (e) => e.preventDefault());

    item.addEventListener("drop", function(e) {
      e.stopPropagation();
      if (dragSrcEl !== this) {
        // Swap the text and data-word
        const droppedWord = this.dataset.word;
        const droppedText = this.textContent;

        this.dataset.word = dragSrcEl.dataset.word;
        this.textContent = dragSrcEl.textContent;

        dragSrcEl.dataset.word = droppedWord;
        dragSrcEl.textContent = droppedText;
      }
    });

    item.addEventListener("dragend", function() {
      this.style.opacity = "1";
      this.style.background = "#fff";
      // Clear borders from any other items
      container.querySelectorAll(".draggable-item").forEach(i => i.style.border = "2px solid #2f52b5");
    });

    dragContainer.appendChild(item);
  });

  // 5. Check Logic
  document.getElementById("check-order").onclick = () => {
    const currentOrder = Array.from(dragContainer.children).map(c => c.dataset.word);
    const isCorrect = currentOrder.every((w, i) => w === correctOrder[i]);
    const resultEl = document.getElementById("result");

    if (isCorrect) {
      resultEl.textContent = "🎉 Výborně! Abeceda je správně.";
      resultEl.style.color = "#27ae60";
      // Optional: lock the game or move to next
    } else {
      resultEl.textContent = "❌ Ještě to není ono. Zkuste to znovu!";
      resultEl.style.color = "#e74c3c";
    }
  };
}