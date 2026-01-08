import { state } from "./state.js";
import { numbersData, numbersQuestions } from "../data/numbers.js";

const gameContainer = document.getElementById("game");
const gameSelector = document.getElementById("game-selector");
const gameButtons = document.querySelectorAll("[data-game]");

// Selector events
document.getElementById("topic").onchange = e => {
  state.topic = e.target.value;
  checkReady();
};

document.getElementById("level").onchange = e => {
  state.level = e.target.value;
  checkReady();
};

document.getElementById("language").onchange = e => {
  state.language = e.target.value;
  checkReady();
};

// Check if all selections are made
function checkReady() {
  const ready = state.topic && state.level && state.language;

  if (ready) {
    gameSelector.style.display = "block";
    gameContainer.innerHTML = "Vyber hru";
  } else {
    gameSelector.style.display = "none";
    gameContainer.innerHTML = "⬆️ Vyber téma, úroveň a jazyk";
  }
}

// Game button clicks
gameButtons.forEach(btn => {
  btn.onclick = () => {
    state.game = btn.dataset.game;
    loadData();
    loadGame();
  };
});

// Load topic data/questions
function loadData() {
  if (state.topic === "numbers") {
    state.data = numbersData[state.level];
    state.questions = numbersQuestions[state.level];
  }
}

// Load selected game dynamically
function loadGame() {
  if (!state.game) return;

  gameContainer.innerHTML = "Načítám hru…";

  import(`../games/${state.game}.js`)
    .then(m => m.startGame(state))
    .catch(err => {
      console.error(err);
      gameContainer.innerHTML = "❌ Nepodařilo se načíst hru";
    });
}
