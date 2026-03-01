// games/speedClick.js
import { normalize } from "../core/utils.js";

export function startSpeedClick(state) {
  const container = document.getElementById("game");

  // 1. Initial Screen: Instructions & Fullscreen
  container.innerHTML = `
    <div id="game-setup" style="text-align:center; padding: 20px; font-family: sans-serif; max-width: 450px; margin: auto;">
      <h2>Speed Click: Translation</h2>
      <p style="background: #fff3cd; padding: 15px; border-radius: 8px; line-height: 1.5;">
        <strong>HOW TO PLAY:</strong><br>
        Look at the <b>WORD</b> at the top.<br>
        Click the button with the <b>correct translation</b>.<br>
        The faster you click, the more time you'll have left!
      </p>

      <button id="setup-fs-btn" style="margin-bottom: 25px; padding: 10px; cursor: pointer; background: #eee; border: 1px solid #ccc; width: 100%; border-radius: 5px;">Toggle Fullscreen</button>
      
      <button id="start-btn" style="padding: 15px 30px; font-size: 1.2rem; cursor: pointer; background: #2196F3; color: white; border: none; border-radius: 5px; width: 100%;">START GAME</button>
    </div>
  `;

  const toggleFS = () => {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  };

  document.getElementById("setup-fs-btn").onclick = toggleFS;
  document.getElementById("start-btn").onclick = () => runGame(state, container, toggleFS);
}

function runGame(state, container, toggleFS) {
  container.innerHTML = `
    <div id="game-wrapper" style="display: flex; flex-direction: column; height: 100vh; max-width: 600px; margin: auto; font-family: sans-serif; background: #f9f9f9; position: relative; overflow: hidden;">
      
      <div id="feedback-box" style="height: 60px; overflow-y: auto; background: #eee; border-bottom: 2px solid #ccc; font-size: 0.85rem; padding: 8px;">
        <small style="color: #666;">Mistakes will appear here...</small>
      </div>

      <div style="padding: 10px; background: #fff; border-bottom: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
          <span>⏱ <span id="timer"></span>s</span>
          <span>❤️ <span id="lives">3</span></span>
          <span>⭐ <span id="score">0</span></span>
        </div>
        <button id="game-fs-btn" style="width: 100%; padding: 5px; cursor: pointer; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px; font-size: 0.75rem;">Toggle Fullscreen</button>
      </div>

      <div style="text-align: center; padding: 15px; background: #fff;">
        <div style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Translate:</div>
        <div id="prompt" style="font-size: 2.5rem; font-weight: 900; color: #2196F3; margin-top: 5px;"></div>
      </div>

      <div id="buttons-container" 
           style="flex-grow: 1; position: relative; margin: 10px; border: 2px dashed #ccc; border-radius: 8px; background: #fff;">
      </div>
    </div>
  `;

  const btnContainer = container.querySelector("#buttons-container");
  const scoreEl = container.querySelector("#score");
  const timerEl = container.querySelector("#timer");
  const promptEl = container.querySelector("#prompt");
  const livesEl = container.querySelector("#lives");
  const feedbackBox = container.querySelector("#feedback-box");
  container.querySelector("#game-fs-btn").onclick = toggleFS;

  const words = [...state.data];
  const used = new Set();
  const mistakeLog = [];

  let score = 0;
  let lives = 3;
  let gameActive = true;
  let timeLeft = words.length * 4;
  timerEl.textContent = timeLeft;

  const timerId = setInterval(() => {
    if (!gameActive) return;
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame("⌛ Time Ran Out!");
  }, 1000);

  const buttons = [];
  for (let i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.style.cssText = `position: absolute; width: 120px; height: 50px; cursor: pointer; border: 2px solid #2196F3; border-radius: 10px; font-weight: bold; background: white; font-size: 1rem; box-shadow: 0 4px 0px #2196F3; transition: all 0.1s; z-index: 10;`;
    btnContainer.appendChild(btn);
    buttons.push(btn);
  }

  function addFeedback(text, isError) {
    const div = document.createElement("div");
    div.style.color = isError ? "#d32f2f" : "#388e3c";
    div.innerHTML = text;
    feedbackBox.prepend(div);
    if (isError) mistakeLog.push(text);
  }

  function getNextWord() {
    // Check against cs lemma to determine if used
    const remaining = words.filter(w => !used.has(w.cs));
    return remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : null;
  }

  function assignButtons(wordObj) {
    const correctLemma = wordObj.cs;
    const correctSynonym = wordObj.synonym || null;

    // Pick one correct version to display on a button
    const correctToDisplay = (correctSynonym && Math.random() > 0.5) ? correctSynonym : correctLemma;

    const wrongs = [];
    while (wrongs.length < 2) {
      const randItem = words[Math.floor(Math.random() * words.length)];
      const candCs = randItem.cs;
      const candSyn = randItem.synonym || null;

      // 1. Candidate must not be the correct lemma
      // 2. Candidate must not be the correct synonym
      const isCorrectLemma = normalize(candCs) === normalize(correctLemma);
      const isCorrectSynonym = correctSynonym && normalize(candCs) === normalize(correctSynonym);
      const isSynonymOfCorrect = candSyn && (normalize(candSyn) === normalize(correctLemma) || (correctSynonym && normalize(candSyn) === normalize(correctSynonym)));

      if (!isCorrectLemma && !isCorrectSynonym && !isSynonymOfCorrect && !wrongs.includes(candCs)) {
        wrongs.push(candCs);
      }
    }

    const options = [correctToDisplay, ...wrongs].sort(() => Math.random() - 0.5);

    buttons.forEach((btn, i) => {
      btn.textContent = options[i];
      btn.dataset.word = options[i];
      btn.style.background = "white";
      btn.style.color = "black";
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "0 4px 0px #2196F3";
      btn.onclick = () => handleClick(btn, wordObj);
    });
  }

  function handleClick(btn, wordObj) {
    if (!gameActive) return;
    buttons.forEach(b => (b.onclick = null));
    btn.style.transform = "translateY(4px)";
    btn.style.boxShadow = "none";

    const selected = normalize(btn.dataset.word);
    const correctLemma = normalize(wordObj.cs);
    const correctSynonym = wordObj.synonym ? normalize(wordObj.synonym) : null;
    const promptText = wordObj[state.language] || wordObj.en;

    if (selected === correctLemma || (correctSynonym && selected === correctSynonym)) {
      btn.style.background = "#4CAF50";
      btn.style.color = "white";
      score++;
      scoreEl.textContent = score;
    } else {
      btn.style.background = "#f44336";
      btn.style.color = "white";
      lives--;
      livesEl.textContent = lives;
      
      const correction = correctSynonym ? `${wordObj.cs} / ${wordObj.synonym}` : wordObj.cs;
      addFeedback(`❌ <b>${promptText}</b> → <b>${correction}</b>`, true);

      if (lives <= 0) {
        endGame("❌ Game Over");
        return;
      }
    }

    used.add(wordObj.cs);
    setTimeout(showNextWord, 500);
  }

  function moveButtons() {
    const containerW = btnContainer.clientWidth;
    const containerH = btnContainer.clientHeight;
    const btnW = 120;
    const btnH = 50;

    buttons.forEach((btn, idx) => {
      let x, y, overlap;
      let attempts = 0;
      do {
        overlap = false;
        x = Math.random() * (containerW - btnW - 20) + 10;
        y = Math.random() * (containerH - btnH - 20) + 10;

        for (let j = 0; j < idx; j++) {
          const other = buttons[j];
          const ox = parseFloat(other.style.left);
          const oy = parseFloat(other.style.top);
          if (x < ox + btnW + 15 && x + btnW + 15 > ox && y < oy + btnH + 15 && y + btnH + 15 > oy) {
            overlap = true; break;
          }
        }
        attempts++;
      } while (overlap && attempts < 50);

      btn.style.left = x + "px";
      btn.style.top = y + "px";
    });
  }

  function showNextWord() {
    if (!gameActive) return;
    const wordObj = getNextWord();
    if (!wordObj) {
      endGame("🎉 Level Complete!");
      return;
    }
    promptEl.textContent = wordObj[state.language] || wordObj.en;
    assignButtons(wordObj);
    moveButtons();
  }

  function endGame(message) {
    if (!gameActive) return;
    gameActive = false;
    clearInterval(timerId);

    const report = mistakeLog.length > 0 
      ? `<div style="text-align:left; background:#fff; padding:10px; border-radius:8px; max-height:200px; overflow-y:auto; font-size:0.85rem; border:1px solid #ddd; margin: 10px 0;">
          ${mistakeLog.map(m => `<div style="border-bottom: 1px solid #eee; padding: 2px 0;">${m}</div>`).join("")}
         </div>`
      : "<p>Perfect Accuracy!</p>";

    container.innerHTML = `
      <div style="text-align:center; padding: 30px 20px; font-family: sans-serif;">
        <h2>${message}</h2>
        <p style="font-size: 1.2rem;">Score: <b>${score}</b></p>
        <hr>
        <h4 style="margin-bottom: 5px;">Mistake Report:</h4>
        ${report}
        <button id="repeat" style="padding: 15px 30px; font-size: 1.1rem; cursor: pointer; background: #2196F3; color: white; border: none; border-radius: 8px; width: 100%;">Play Again</button>
      </div>
    `;
    document.getElementById("repeat").onclick = () => startSpeedClick(state);
  }

  showNextWord();
}