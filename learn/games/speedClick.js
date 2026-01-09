// games/speedClick.js
import { normalize } from "../core/utils.js";

export function startSpeedClick(state) {
  const container = document.getElementById("game");

  container.innerHTML = `
    <h2>Speed Click</h2>
    <p>Click the correct word as fast as you can!</p>

    <p>
      ⏱ Time: <span id="timer"></span>s |
      ❤️ Lives: <span id="lives">3</span> |
      ⭐ Score: <span id="score">0</span>
    </p>

    <p>Prompt: <strong><span id="prompt"></span></strong></p>

    <div id="buttons-container"
      style="position:relative;width:400px;height:400px;
      border:1px solid #000;margin:auto;background:#f0f0f0;">
    </div>
  `;

  const btnContainer = container.querySelector("#buttons-container");
  const scoreEl = container.querySelector("#score");
  const timerEl = container.querySelector("#timer");
  const promptEl = container.querySelector("#prompt");
  const livesEl = container.querySelector("#lives");

  const words = [...state.data];
  const used = new Set();

  let score = 0;
  let lives = 3;
  let gameActive = true;

  const timeLimit = words.length * 4;
  let timeLeft = timeLimit;
  timerEl.textContent = timeLeft;

  /* ---------------- TIMER ---------------- */

  const timerId = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame("🎉 Congrats! You survived the timer!");
    }
  }, 1000);

  /* ---------------- BUTTONS ---------------- */

  const buttons = [];

  for (let i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.style.position = "absolute";
    btn.style.width = "100px";
    btn.style.height = "40px";
    btn.style.transition = "background 0.2s";
    btnContainer.appendChild(btn);
    buttons.push(btn);
  }

  function getNextWord() {
    const remaining = words.filter(w => !used.has(w.cs));
    if (!remaining.length) return null;
    return remaining[Math.floor(Math.random() * remaining.length)];
  }

  function assignButtons(wordObj) {
    const correct = wordObj.cs;
    const wrongs = [];

    while (wrongs.length < 2) {
      const rand = words[Math.floor(Math.random() * words.length)].cs;
      if (rand !== correct && !wrongs.includes(rand)) wrongs.push(rand);
    }

    const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);

    buttons.forEach((btn, i) => {
      btn.textContent = options[i];
      btn.dataset.word = options[i];
      btn.style.background = "";

      btn.onclick = () => handleClick(btn, correct);
    });
  }

  function handleClick(btn, correct) {
    if (!gameActive) return;

    buttons.forEach(b => (b.onclick = null));

    if (normalize(btn.dataset.word) === normalize(correct)) {
      btn.style.background = "#4CAF50";
      score++;
      scoreEl.textContent = score;
    } else {
      btn.style.background = "#f44336";
      lives--;
      livesEl.textContent = lives;

      if (lives <= 0) {
        endGame("❌ Game Over");
        return;
      }
    }

    used.add(correct);
    setTimeout(showNextWord, 400);
  }

  function moveButton(btn) {
    const w = btnContainer.clientWidth - 100;
    const h = btnContainer.clientHeight - 40;
    let x, y, overlap;

    do {
      overlap = false;
      x = Math.random() * w;
      y = Math.random() * h;

      for (let b of buttons) {
        if (b === btn) continue;
        const bx = parseFloat(b.style.left) || 0;
        const by = parseFloat(b.style.top) || 0;

        if (x < bx + 100 && x + 100 > bx && y < by + 40 && y + 40 > by) {
          overlap = true;
          break;
        }
      }
    } while (overlap);

    btn.style.left = x + "px";
    btn.style.top = y + "px";
  }

  function showNextWord() {
    if (!gameActive) return;

    const wordObj = getNextWord();
    if (!wordObj) {
      endGame("🎉 Finished!");
      return;
    }

    promptEl.textContent = wordObj[state.language] || wordObj.en;
    assignButtons(wordObj);
    buttons.forEach(moveButton);
  }

  function endGame(message) {
    if (!gameActive) return;
    gameActive = false;

    clearInterval(timerId);

    btnContainer.innerHTML = `
      <h3>${message}</h3>
      <p>Final score: ${score}</p>
      <button id="repeat">Repeat</button>
    `;

    document.getElementById("repeat").onclick = () => {
      startSpeedClick(state);
    };
  }

  showNextWord();
}
