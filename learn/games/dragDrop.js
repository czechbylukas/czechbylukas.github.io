export function startDragDropGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  // Use state.data (words for the selected topic/level)
  if (!state.data || state.data.length === 0) {
    container.innerHTML = "❌ No data for this topic/level.";
    return;
  }

  const words = state.data.map(w => w.cs); // use Czech words
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <h2>Drag & Drop / Sorting</h2>
    <p>Drag the words into the correct order:</p>
    <div id="drag-container" style="display:flex;flex-direction:column;gap:10px;max-width:400px;margin:auto;"></div>
    <button id="check-order" style="margin-top:20px;">Check Order</button>
    <p id="result"></p>
  `;

  const dragContainer = document.getElementById("drag-container");
  let dragSrcEl = null;

  shuffledWords.forEach(word => {
    const item = document.createElement("div");
    item.classList.add("draggable-item");
    item.textContent = word;
    item.draggable = true;
    item.style.padding = "10px 15px";
    item.style.background = "#4CAF50";
    item.style.color = "#fff";
    item.style.borderRadius = "8px";
    item.style.cursor = "grab";
    item.style.textAlign = "center";
    item.dataset.word = word;

    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dropItem);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("dragend", dragEnd);

    dragContainer.appendChild(item);
  });

  function dragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.dataset.word);
    this.style.opacity = "0.5";
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function dragEnter() {
    this.style.border = "2px dashed #000";
  }

  function dragLeave() {
    this.style.border = "none";
  }

  function dropItem(e) {
    e.stopPropagation();
    if (dragSrcEl === this) return;

    const tmpWord = this.dataset.word;
    this.dataset.word = dragSrcEl.dataset.word;
    dragSrcEl.dataset.word = tmpWord;

    const tmpText = this.textContent;
    this.textContent = dragSrcEl.textContent;
    dragSrcEl.textContent = tmpText;

    this.style.border = "none";
  }

  function dragEnd() {
    this.style.opacity = "1";
    dragContainer.querySelectorAll(".draggable-item").forEach(item => item.style.border = "none");
  }

  document.getElementById("check-order").addEventListener("click", () => {
    const currentOrder = Array.from(dragContainer.children).map(c => c.dataset.word);
    const correct = currentOrder.every((w, i) => w === words[i]);
    document.getElementById("result").textContent = correct
      ? "🎉 Perfect! The order is correct."
      : "❌ Not correct yet. Try again!";
  });
}
