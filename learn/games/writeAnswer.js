// games/writeAnswer.js
import { normalize } from "../core/utils.js";

export function startWriteAnswerGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const items = [...state.data].sort(() => Math.random() - 0.5);
  let index = 0;
  let score = 0;

  function show() {
    if (index >= items.length) {
      container.innerHTML = `<h2>🎉 Finished!</h2><p>Score: ${score} / ${items.length}</p>`;
      return;
    }

    const item = items[index];
    container.innerHTML = `
      <p>Translate: <strong>${item[state.language] || item.en}</strong></p>
      <input id="ans">
      <button id="check">Kontrola</button>
      <p id="feedback"></p>
      <p>${index + 1} / ${items.length}</p>
    `;

    const input = document.getElementById("ans");
    const feedback = document.getElementById("feedback");
    const checkBtn = document.getElementById("check");

    // Focus input after rendering
    setTimeout(() => input.focus(), 50);

    function check() {
      const answer = normalize(input.value);
      const correct = normalize(item.cs);

      if (answer === correct) {
        feedback.textContent = "✅ Correct!";
        score++;
        index++;
        setTimeout(show, 500);
      } else {
        feedback.textContent = "❌ Wrong. Try again.";
        input.value = "";
        // Keep cursor in input
        setTimeout(() => input.focus(), 50);
      }
    }

    checkBtn.onclick = check;

// Press Enter to check
    input.addEventListener("keydown", e => {
      // ADD THIS: Stops the spacebar from triggering other site functions
      if (e.key === " " || e.code === "Space") {
        e.stopPropagation();
      }

      if (e.key === "Enter") {
        e.preventDefault();
        check();
      }
    });
