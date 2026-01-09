import { normalize } from "../core/utils.js";

export function startFallingWords(state) {
  const container = document.getElementById("game");
  container.innerHTML = `<h2>Falling Words</h2>
    <p>Time left: <span id="timer">0</span> sec</p>
    <div id="fall-area" style="position:relative;width:300px;height:400px;border:1px solid #000;margin:auto;background:#f0f0f0;"></div>
    <p>Score: <span id="score">0</span> | Lives: <span id="lives">3</span></p>
    <div id="bottom-box" style="margin-top:10px;"></div>
  `;

  const area = container.querySelector("#fall-area");
  const scoreEl = container.querySelector("#score");
  const livesEl = container.querySelector("#lives");
  const bottomBox = container.querySelector("#bottom-box");
  const timerEl = container.querySelector("#timer");

  const words = [...state.data];
  const totalWords = words.length * 2;
  let droppedCount = 0;
  let score = 0;
  let lives = 3;
  const gameDuration = words.length * 4; // 4 sec per word
  let timeLeft = gameDuration;
  timerEl.textContent = timeLeft;

  function endGame(message) {
    clearInterval(dropInterval);
    clearInterval(timerId);
    container.innerHTML += `<h3>${message}</h3><button id="repeat">Repeat</button>`;
    document.getElementById("repeat").onclick = () => startFallingWords(state);
  }

  // Countdown timer
  const timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      if (lives > 0) {
        endGame("🎉 Congrats! Time's up and you survived!");
      } else {
        endGame("❌ Game Over");
      }
    }
  }, 1000);

  function makeMisspelled(word) {
    const letters = word.split("");
    if (letters.length > 1) {
      const i = Math.floor(Math.random() * letters.length);
      letters[i] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return letters.join("");
  }

  function dropWord() {
    if (lives <= 0 || droppedCount >= totalWords) return;
    droppedCount++;

    const item = words[Math.floor(Math.random() * words.length)];
    const isMisspelled = Math.random() < 0.2; // 20% chance

    const div = document.createElement("div");
    div.textContent = isMisspelled ? makeMisspelled(item.cs) : item.cs;
    div.dataset.correct = item.cs;
    div.dataset.isMisspelled = isMisspelled;
    div.style.position = "absolute";
    div.style.left = Math.random() * 260 + "px";
    div.style.top = "0px";
    div.style.background = "#4CAF50"; // always green initially
    div.style.color = "#fff";
    div.style.padding = "5px";
    div.style.borderRadius = "6px";
    div.style.cursor = "pointer";
    div.style.transition = "all 0.2s";

    area.appendChild(div);

    let top = 0;
    const interval = setInterval(() => {
      top += 2;
      div.style.top = top + "px";

      if (top > 360) {
        clearInterval(interval);
        if (div.parentNode) area.removeChild(div);

        if (!isMisspelled) {
          lives--;
          livesEl.textContent = lives;

          const fallen = document.createElement("div");
          fallen.innerHTML = `<span style="color:green">${div.dataset.correct}</span> → <span style="color:green">${item[state.language] || item.en}</span>`;
          bottomBox.appendChild(fallen);

          if (lives <= 0) endGame("❌ Game Over");
        }
      }
    }, 20);

    div.onclick = () => {
      clearInterval(interval);
      if (div.dataset.isMisspelled === "true") {
        // clicked wrong → red + bottom box
        div.style.background = "#f44336";
        const fallen = document.createElement("div");
        fallen.innerHTML = `<span style="color:red">${div.textContent}</span> → <span style="color:green">${item[state.language] || item.en}</span>`;
        bottomBox.appendChild(fallen);

        lives--;
        livesEl.textContent = lives;

        if (lives <= 0) endGame("❌ Game Over");
      } else {
        // correct click → 👍 briefly, score++
        score++;
        scoreEl.textContent = score;
        div.style.background = "#2196F3";
        setTimeout(() => {
          if (div.parentNode) area.removeChild(div);
        }, 200);
      }
    };
  }

  const dropInterval = setInterval(() => {
    if (lives > 0 && droppedCount < totalWords) dropWord();
    if (lives <= 0 || droppedCount >= totalWords) clearInterval(dropInterval);
  }, 1500);
}
