import { normalize } from "../core/utils.js";

export function startFallingWords(state) {
  const container = document.getElementById("game");
  
  container.innerHTML = `
    <div id="game-setup" style="text-align:center; padding: 20px; font-family: sans-serif; max-width: 450px; margin: auto;">
      <h2>Target Practice: Correct spelling</h2>
      <p style="background: #fff3cd; padding: 15px; border-radius: 8px; line-height: 1.5;">
        <strong>HOW TO PLAY:</strong><br>
        Shoot (click) the ❌ <b>incorrectly spelled</b> words.<br>
        Let the ✅ <b>correct</b> words fall safely to the bottom.
      </p>

      <button id="setup-fs-btn" style="margin-bottom: 25px; padding: 10px; cursor: pointer; background: #eee; border: 1px solid #ccc; width: 100%; border-radius: 5px;">Toggle Fullscreen</button>
      
      <p><b>Select Difficulty:</b></p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="lvl-btn" data-speed="1.2" data-spawn="2500" data-mult="2" style="background:#4CAF50; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">EASY</button>
        <button class="lvl-btn" data-speed="1.5" data-spawn="1800" data-mult="4" style="background:#FF9800; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">NORMAL</button>
        <button class="lvl-btn" data-speed="2.0" data-spawn="1200" data-mult="6" style="background:#f44336; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer;">DIFFICULT</button>
      </div>
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

  container.querySelectorAll(".lvl-btn").forEach(btn => {
    btn.onclick = () => {
      const config = {
        speed: parseFloat(btn.dataset.speed),
        spawn: parseInt(btn.dataset.spawn),
        multiplier: parseInt(btn.dataset.mult),
        toggleFS
      };
      runGame(state, container, config);
    };
  });
}

function runGame(state, container, config) {
  container.innerHTML = `
    <div id="game-wrapper" style="display: flex; flex-direction: column; height: 100vh; max-width: 500px; margin: auto; background: #f0f0f0; position: relative; overflow: hidden; font-family: sans-serif;">
      <div id="feedback-box" style="height: 60px; overflow-y: auto; background: #eee; border-bottom: 2px solid #ccc; font-size: 0.8rem; padding: 5px;">
        <small style="color: #666;">Mistakes will appear here...</small>
      </div>
      <div style="display: flex; flex-direction: column; background: #fff; border-bottom: 1px solid #ddd; padding: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem;">
          <span>⏱ <span id="timer">0</span>s</span>
          <span>⭐ <span id="score">0</span></span>
          <span>❤️ <span id="lives">3</span></span>
        </div>
        <button id="game-fs-btn" style="margin-top:5px; padding: 4px; font-size: 0.7rem; cursor: pointer; background: #f9f9f9; border: 1px solid #ddd;">Toggle Fullscreen</button>
      </div>
      <div id="fall-area" style="flex-grow: 1; position: relative; background: #fff; overflow: hidden;"></div>
    </div>
  `;

  const area = container.querySelector("#fall-area");
  const scoreEl = container.querySelector("#score");
  const livesEl = container.querySelector("#lives");
  const feedbackBox = container.querySelector("#feedback-box");
  const timerEl = container.querySelector("#timer");
  container.querySelector("#game-fs-btn").onclick = config.toggleFS;

  const words = [...state.data];
  // SYNONYM SUPPORT: Build a list of all valid spellings
  const allValidSpellings = [];
  words.forEach(w => {
    if (w.cs) allValidSpellings.push(normalize(w.cs));
    if (w.synonym) allValidSpellings.push(normalize(w.synonym));
  });

  const totalWords = words.length * config.multiplier;
  const mistakeLog = []; 
  let droppedCount = 0;
  let score = 0;
  let lives = 3;
  let gameRunning = true;
  let timeLeft = Math.floor((totalWords * config.spawn) / 1000) + 15;

  function addFeedback(text, isError) {
    const div = document.createElement("div");
    div.style.color = isError ? "#d32f2f" : "#388e3c";
    div.style.marginBottom = "2px";
    div.innerHTML = text;
    feedbackBox.prepend(div);
    if (isError) mistakeLog.push(text); 
  }

  // Improved mutation: Swaps two letters or changes one to better suit Czech characters
  function makeMisspelled(word) {
    if (word.length < 2) return word + "x";
    let letters = word.split("");
    const rand = Math.random();
    
    if (rand < 0.5) {
      // Swap two adjacent letters
      const i = Math.floor(Math.random() * (letters.length - 1));
      [letters[i], letters[i+1]] = [letters[i+1], letters[i]];
    } else {
      // Remove a letter
      const i = Math.floor(Math.random() * letters.length);
      letters.splice(i, 1);
    }
    
    const result = letters.join("");
    return allValidSpellings.includes(normalize(result)) ? makeMisspelled(word) : result;
  }

  function endGame(message) {
    gameRunning = false;
    clearInterval(dropInterval);
    clearInterval(timerId);
    
    const report = mistakeLog.length > 0 
        ? `<div style="text-align:left; background:#fff; padding:10px; border-radius:5px; max-height:200px; overflow-y:auto; margin:15px 0; font-size:0.85rem; border:1px solid #ddd;">
            ${mistakeLog.map(m => `<div style="margin-bottom:4px; border-bottom:1px solid #eee;">${m}</div>`).join("")}
           </div>`
        : "<p>Perfect run! No mistakes.</p>";

    container.innerHTML = `
        <div style="text-align:center; padding: 20px; font-family: sans-serif; max-width: 500px; margin: auto;">
            <h3>${message}</h3>
            <p style="font-size: 1.2rem;">Final Score: <b>${score}</b></p>
            <hr>
            <h4>Mistake Summary:</h4>
            ${report}
            <button id="repeat" style="padding: 15px 30px; width: 100%; background:#2196F3; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">Play Again</button>
        </div>`;
    document.getElementById("repeat").onclick = () => startFallingWords(state);
  }

  const timerId = setInterval(() => {
    if (!gameRunning) return;
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame("🎉 Level Clear!");
  }, 1000);

  function dropWord() {
    if (!gameRunning || droppedCount >= totalWords) return;
    droppedCount++;

    const item = words[Math.floor(Math.random() * words.length)];
    const isError = Math.random() < 0.4;
    
    // Pick either the main word or synonym to show
    const sourceWord = (item.synonym && Math.random() > 0.5) ? item.synonym : item.cs;
    const displayWord = isError ? makeMisspelled(sourceWord) : sourceWord;
    const isValid = allValidSpellings.includes(normalize(displayWord));

    const div = document.createElement("div");
    div.textContent = displayWord;
    div.style.cssText = `position:absolute; left:${Math.random() * 75}%; top:-50px; background:#4CAF50; color:#fff; padding:10px 15px; border-radius:20px; cursor:crosshair; font-weight:bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); user-select:none; white-space:nowrap;`;
    area.appendChild(div);

    let topPos = -50;
    const fallSpeed = config.speed;

    const fallInterval = setInterval(() => {
      if (!gameRunning) {
        clearInterval(fallInterval);
        return;
      }

      topPos += fallSpeed;
      div.style.top = topPos + "px";

      if (topPos > area.offsetHeight) {
        clearInterval(fallInterval);
        if (div.parentNode) area.removeChild(div);
        
        // If an ERROR reached the bottom, user lose a life
        if (!isValid) {
          lives--;
          livesEl.textContent = lives;
          addFeedback(`❌ Missed error: <b>${displayWord}</b>`, true);
          if (lives <= 0) endGame("❌ Too many mistakes!");
        }
      }
    }, 20);

    div.onclick = (e) => {
      e.stopPropagation();
      clearInterval(fallInterval);
      if (div.parentNode) area.removeChild(div);

      if (!isValid) {
        // Correctly shot an error
        score++;
        scoreEl.textContent = score;
      } else {
        // Friendly fire! Shot a correct word
        lives--;
        livesEl.textContent = lives;
        addFeedback(`🚫 Friendly fire! <b>${displayWord}</b> was correct.`, true);
        if (lives <= 0) endGame("❌ Game Over");
      }
    };
  }

  const dropInterval = setInterval(() => {
    if (gameRunning && droppedCount < totalWords) dropWord();
    else clearInterval(dropInterval);
  }, config.spawn);
}