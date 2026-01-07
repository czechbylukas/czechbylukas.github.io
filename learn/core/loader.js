import { state } from "./state.js";
import { numbersData } from "../data/numbers.js";

const topics = { numbers: numbersData };

state.data = topics[state.topic][state.level];

import("../games/fillGap.js").then(m => m.startGame(state));