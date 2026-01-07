import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  const item = state.data[0];

  container.innerHTML = `
    <p>Mám <input id="gap"> jablka (${item.value}).</p>
    <button id="check">Check</button>
  `;

  document.getElementById("check").onclick = () => {
    const input = document.getElementById("gap");
    input.style.borderColor =
      normalize(input.value) === normalize(item.cs) ? "green" : "red";
  };
}