import { normalize } from "../core/utils.js";

export function startFallingWords(state) {
  const container = document.getElementById("game");
  
  // 1. Setup Screen: Initial Fullscreen button
  container.innerHTML = `
    <div id="game-setup" style="text-align:center; padding: 20px; font-family: sans-serif; max-width: 450px; margin: auto;">
      <h2>Target Practice: Correct spelling</h2>
      <p style="background: #fff3cd; padding: 15px; border-radius: 8px;">
        <strong>HOW TO PLAY:</strong><br>
        Shoot (click) the ❌ <b>incorrect</b> words.<br>
        Let the ✅ <b>correct</b> words fall safely.
      </p>

      <button id="setup-fs-btn" style="margin-bottom: 25px; padding: 10px; cursor: pointer; background: #eee; border: 1px solid #ccc; width: 100%; border-radius: 5px;">Toggle Fullscreen</button>
      
      <p><b>Select Difficulty:</b></p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="lvl-btn" data-speed="1.4" data-spawn="3000" data-mult="2" style="background:#4CAF50; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">EASY</button>
        <button class="lvl-btn" data-speed="1.6" data-spawn="2200" data-mult="4" style="background:#FF9800; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">NORMAL</button>
        <button class="lvl-btn" data-speed="1.8" data-spawn="1500" data-mult="8" style="background:#f44336; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">DIFFICULT</button>
      </div>
    </div>
  `;

  const setupFs = document.getElementById("setup-fs-btn");
  const toggleFS = () => {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  };
  
  setupFs.onclick = toggleFS;

  container.querySelectorAll(".lvl-btn").forEach(btn => {
    btn.onclick = () => {
      const config = {
        speed: parseFloat(btn.dataset.speed),
        spawn: parseInt(btn.dataset.spawn),
        multiplier: parseInt(btn.dataset.mult),
        toggleFS // Pass the function to use it inside the game too
      };
      runGame(state, container, config);
    };
  });
}

function runGame(state, container, config) {
  // 2. Game Layout: Fullscreen button added to the live UI
  container.innerHTML = `
    <div id="game-wrapper" style="display: flex; flex-direction: column; height: 100vh; max-width: 500px; margin: auto; background: #f0f0f0; position: relative; overflow: hidden;">
      
      <div id="feedback-box" style="height: 50px; overflow-y: auto; background: #eee; border-bottom: 2px solid #ccc; font-size: 0.8rem; padding: 5px;">
        <small style="color: #666;">Mistakes will appear here...</small>
      </div>

      <div style="display: flex; flex-direction: column; background: #fff; border-bottom: 1px solid #ddd; padding: 5px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">
          <span>Time: <span id="timer">0</span>s</span>
          <span>Score: <span id="score">0</span></span>
          <span>Lives: <span id="lives">3</span></span>
        </div>
        <button id="game-fs-btn" style="padding: 4px; font-size: 0.7rem; cursor: pointer; background: #f9f9f9; border: 1px solid #ddd;">Toggle Fullscreen</button>
      </div>

      <div id="fall-area" style="flex-grow: 1; position: relative; border: 1px solid #000; background: #fff;"></div>
    </div>
  `;

  const area = container.querySelector("#fall-area");
  const scoreEl = container.querySelector("#score");
  const livesEl = container.querySelector("#lives");
  const feedbackBox = container.querySelector("#feedback-box");
  const timerEl = container.querySelector("#timer");
  const gameFsBtn = container.querySelector("#game-fs-btn");

  gameFsBtn.onclick = config.toggleFS;

  const words = [...state.data];
  const allValidWords = words.map(w => w.cs);
  const totalWords = words.length * config.multiplier;
  const mistakeLog = []; 
  
  let droppedCount = 0;
  let score = 0;
  let lives = 3;
  let timeLeft = Math.floor((totalWords * config.spawn) / 1000) + 10;
  timerEl.textContent = timeLeft;

  function endGame(message) {
    clearInterval(dropInterval);
    clearInterval(timerId);
    
    const report = mistakeLog.length > 0 
        ? `<div style="text-align:left; background:#fff; padding:10px; border-radius:5px; max-height:200px; overflow-y:auto; margin:15px 0; font-size:0.85rem; border:1px solid #ddd;">
            ${mistakeLog.map(m => `<div style="margin-bottom:4px; border-bottom:1px solid #eee;">${m}</div>`).join("")}
           </div>`
        : "<p>Perfect run! No mistakes.</p>";

    container.innerHTML = `
        <div style="text-align:center; padding: 20px; font-family: sans-serif;">
            <h3>${message}</h3>
            <p style="font-size: 1.2rem;">Final Score: <b>${score}</b></p>
            <hr>
            <h4>Mistake Summary:</h4>
            ${report}
            <button id="repeat" style="padding: 15px 30px; background:#2196F3; color:white; border:none; border-radius:5px; cursor:pointer;">Play Again</button>
        </div>`;
    document.getElementById("repeat").onclick = () => startFallingWords(state);
  }

  const timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame(lives > 0 ? "🎉 Level Clear!" : "❌ Time Ran Out");
  }, 1000);

  function makeMisspelled(word, validList) {
    let mutatedWord;
    let attempts = 0;
    do {
      const letters = word.split("");
      const i = Math.floor(Math.random() * letters.length);
      let newChar;
      do {
          newChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      } while (newChar === letters[i]);
      letters[i] = newChar;
      mutatedWord = letters.join("");
      attempts++;
    } while (validList.includes(mutatedWord) && attempts < 10);
    return mutatedWord;
  }

  function addFeedback(text, isError) {
    const div = document.createElement("div");
    div.style.color = isError ? "red" : "green";
    div.innerHTML = text;
    feedbackBox.prepend(div);
    if (isError) mistakeLog.push(text); 
  }

  function dropWord() {
    if (lives <= 0 || droppedCount >= totalWords) return;
    droppedCount++;

    const item = words[Math.floor(Math.random() * words.length)];
    const isActuallyMisspelled = Math.random() < 0.4;
    let displayWord = isActuallyMisspelled ? makeMisspelled(item.cs, allValidWords) : item.cs;
    const isWordValid = allValidWords.includes(displayWord);

    const div = document.createElement("div");
    div.textContent = displayWord;
    div.style.cssText = `position:absolute; left:${Math.random() * 70}%; top:0px; background:#4CAF50; color:#fff; padding:8px; border-radius:6px; cursor:crosshair; transition: transform 0.1s; white-space: nowrap; font-weight:bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); z-index: 10;`;

    area.appendChild(div);

    let top = 0;
    const currentSpeed = config.speed + (score * 0.005); 
    
    const interval = setInterval(() => {
      top += currentSpeed;
      div.style.top = top + "px";

      if (top > area.offsetHeight - 45) {
        clearInterval(interval);
        if (div.parentNode) area.removeChild(div);
        if (!isWordValid) {
          lives--;
          livesEl.textContent = lives;
          addFeedback(`❌ Missed error: <b>${displayWord}</b>`, true);
          if (lives <= 0) endGame("❌ Too many mistakes!");
        }
      }
    }, 20);

    div.onclick = () => {
      clearInterval(interval);
      if (div.parentNode) area.removeChild(div);

      if (!isWordValid) {
        score++;
        scoreEl.textContent = score;
      } else {
        lives--;
        livesEl.textContent = lives;
        addFeedback(`🚫 Friendly fire! <b>${displayWord}</b> was correct.`, true);
        if (lives <= 0) endGame("❌ Game Over");
      }

      if (droppedCount >= totalWords && area.querySelectorAll('div').length === 0) {
          setTimeout(() => endGame("🎉 Level Clear!"), 800);
      }
    };
  }

  const dropInterval = setInterval(() => {
    if (lives > 0 && droppedCount < totalWords) dropWord();
    else clearInterval(dropInterval);
  }, config.spawn);
}