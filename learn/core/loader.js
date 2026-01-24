// core/loader.js
import { state } from "./state.js";
import { getQuestions } from "../data/index.js";
import { gameMapping } from "./gameMapping.js";

// Import topic datasets
import { numbersData } from "../data/numbers.js";
import { verbConjugationData } from "../data/verbConjugationData.js";
import { pastTenseData, pastTenseQuestions } from "../../data/2_pasttense.js"; // New Data Source

// DOM elements
const topicSelect = document.getElementById("topic");
const levelSelect = document.getElementById("level");
const languageSelect = document.getElementById("language");
const gameSelector = document.getElementById("game-selector");
const gameDiv = document.getElementById("game");

// Mapping of topic names to data objects
const topicDataMap = {
  numbers: numbersData,
  verbs: verbConjugationData,
  past_tense: pastTenseData, // Key matches <option value="past_tense">
};

// ---------------------------
// Helpers
// ---------------------------
function updateStateFromSelectors() {
  state.topic = topicSelect.value;
  state.level = levelSelect.value;
  state.language = languageSelect.value || "en";

  // 1. Set the Vocabulary Data
  if (topicDataMap[state.topic] && topicDataMap[state.topic][state.level]) {
    state.data = topicDataMap[state.topic][state.level];
  } else {
    state.data = [];
  }

  // 2. Set the Questions 
  // Custom logic for Past Tense which exports questions directly
  if (state.topic === "past_tense") {
    state.questions = pastTenseQuestions[state.level] || [];
  } else {
    state.questions = getQuestions(state.topic, state.level) || [];
  }
}

function readyToPlay() {
  return state.topic && state.level;
}

// ---------------------------
// Show/hide game buttons based on selection
// ---------------------------
[topicSelect, levelSelect, languageSelect].forEach(select => {
  select.addEventListener("change", () => {
    updateStateFromSelectors();

    if (readyToPlay()) {
      // Check if gameMapping exists for this topic/level
      const availableGames = (gameMapping[state.topic] && gameMapping[state.topic][state.level]) 
                            ? gameMapping[state.topic][state.level] 
                            : [];
      
      gameSelector.style.display = "block";

      // Show only buttons defined in gameMapping.js
      gameSelector.querySelectorAll("button").forEach(btn => {
        if (availableGames.includes(btn.dataset.game)) {
          btn.style.display = "inline-block";
        } else {
          btn.style.display = "none";
        }
      });

      gameDiv.innerHTML = "⬆️ Vyber hru";
    } else {
      gameSelector.style.display = "none";
      gameDiv.innerHTML = "⬆️ Vyber téma a úroveň";
    }
  });
});

// ---------------------------
// Load games when button clicked
// ---------------------------
gameSelector.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", async () => {
    const game = button.dataset.game;
    gameDiv.innerHTML = "⏳ Načítám hru...";

    // Refresh state before starting
    updateStateFromSelectors();

    if (!state.questions.length) {
      gameDiv.innerHTML = "❌ Pro tuto kombinaci nejsou otázky";
      return;
    }

    if (!state.data.length) {
      gameDiv.innerHTML = "❌ Pro tuto kombinaci nejsou slova";
      return;
    }

    try {
      // Dynamic imports for game logic
      switch (game) {
        case "mcq":
          (await import("../games/mcq.js")).startGame(state);
          break;
        case "fillGap":
          (await import("../games/fillGap.js")).startGame(state);
          break;
        case "hangman":
          (await import("../games/hangman.js")).startGame(state);
          break;
        case "dragDrop":
          (await import("../games/dragDrop.js")).startDragDropGame(state);
          break;
        case "flashcards":
          (await import("../games/flashcards.js")).startFlashcardsGame(state);
          break;
        case "memory":
          (await import("../games/memory.js")).startMemoryGame(state);
          break;
        case "pexeso":
          (await import("../games/pexeso.js")).startPexesoGame(state);
          break;
        case "match":
          (await import("../games/match.js")).startMatchGame(state);
          break;
        case "writeAnswer":
          (await import("../games/writeAnswer.js")).startWriteAnswerGame(state);
          break;
        case "speedClick":
          (await import("../games/speedClick.js")).startSpeedClick(state);
          break;
        case "fallingWords":
          (await import("../games/fallingWords.js")).startFallingWords(state);
          break;
        case "orderWords":
          (await import("../games/orderWords.js")).startOrderWords(state);
          break;
        case "sentenceBuilder":
          (await import("../games/sentenceBuilder.js")).startSentenceBuilder(state);
          break;
        case "guessNumber":
          (await import("../games/guessNumber.js")).startGuessNumber(state);
          break;
        case "whatDidYouHear":
          (await import("../games/whatDidYouHear.js")).startWhatDidYouHear(state);
          break;
        default:
          gameDiv.innerHTML = "❌ Neznámá hra";
      }
    } catch (err) {
      console.error("Game load error:", err);
      gameDiv.innerHTML = "❌ Chyba při načítání hry";
    }
  });
});