export function startFlashcardsGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  if (!state.data || state.data.length === 0) {
    container.innerHTML = "❌ No words for this topic/level.";
    return;
  }

  const words = [...state.data].sort(() => Math.random() - 0.5); // Shuffle
  let index = 0;
  let showFront = true; // true = foreign language, false = Czech
  const lang = state.language || "en";

  container.innerHTML = `
    <h2>Flashcards</h2>

    <div id="progress-text" style="text-align:center;font-weight:bold;margin-top:10px;">
      1 / ${words.length}
    </div>

    <div id="flashcard" style="
      width: 250px;
      height: 150px;
      margin: 20px auto;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:1.5rem;
      background:#4CAF50;
      color:#fff;
      border-radius:12px;
      cursor:pointer;
      user-select:none;
      transition: transform 0.3s;
      text-align:center;
      padding:10px;
    ">Click to flip</div>

    <div style="text-align:center;margin-top:20px;">
      <button id="prev">Previous</button>
      <button id="next">Next</button>
    </div>

    <div id="progress-container" style="
      width: 80%;
      height: 10px;
      background: #ddd;
      margin: 20px auto;
      border-radius: 5px;
    ">
      <div id="progress-bar" style="
        height: 100%;
        width: 0%;
        background: #4CAF50;
        border-radius: 5px;
        transition: width 0.3s;
      "></div>
    </div>
  `;

  const flashcard = document.getElementById("flashcard");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  function showCard() {
    const word = words[index];
    flashcard.textContent = showFront ? (word[lang] || word.en) : word.cs;

    // Update progress
    progressBar.style.width = `${((index + 1) / words.length) * 100}%`;
    progressText.textContent = `${index + 1} / ${words.length}`;
  }

  function nextCard() {
    index = (index + 1) % words.length;
    showFront = true;
    showCard();
  }

  function prevCard() {
    index = (index - 1 + words.length) % words.length;
    showFront = true;
    showCard();
  }

  function flipCard() {
    showFront = !showFront;
    flashcard.style.transform = "rotateY(180deg)";
    setTimeout(() => {
      showCard();
      flashcard.style.transform = "rotateY(0deg)";
    }, 150);
  }

  // Button clicks
  flashcard.addEventListener("click", flipCard);
  prevBtn.addEventListener("click", prevCard);
  nextBtn.addEventListener("click", nextCard);

  // Keyboard controls
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === "ArrowRight") nextCard();
    if (e.code === "Space") {
      e.preventDefault();
      flipCard();
    }
  });

  showCard();
}
