import { state } from "./state.js";
import { numbersData, numbersQuestions } from "../data/numbers.js";

// Load data based on topic & level
state.data = numbersData[state.level];          // optional if needed for other purposes
state.questions = numbersQuestions[state.level]; // <-- THIS sets the text-based questions

// Start the game (Fill in the Gap)
import("../games/fillGap.js").then(m => m.startGame(state));
