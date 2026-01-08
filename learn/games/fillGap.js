import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const questions = state.questions;
  let currentIndex = 0;
  let score = 0;
  const total = questions.length;

  function showQuestion() {
    if (currentIndex >= total) {
      container.innerHTML = `<h2>🎉 Quiz finished!</h2>
        <p>Your score: ${score} / ${total}</p>`;
      return;
    }

    const q = questions[currentIndex];
    let html = q.text;

    // Replace {{gap}} placeholders with inputs
    let gapIndex = 0;
    html = html.replace(/{{gap}}/g, () => 
      `<input class="gap" data-answer="${q.answers[gapIndex++]}">`
    );

    container.innerHTML = `
      <p>${html}</p>
      <button id="check">Check</button>
      <p id="feedback"></p>
      <p>Question ${currentIndex + 1} / ${total}</p>
    `;

    const checkBtn = document.getElementById("check");
    const inputs = Array.from(container.querySelectorAll(".gap"));
    const feedback = document.getElementById("feedback");

    checkBtn.addEventListener("click", () => {
      let allCorrect = true;
      inputs.forEach(input => {
        const user = normalize(input.value);
        const correct = normalize(input.dataset.answer);
        if (user === correct) {
          input.style.borderColor = "green";
        } else {
          input.style.borderColor = "red";
          allCorrect = false;
        }
      });

      if (allCorrect) {
        feedback.textContent = "✅ Correct!";
        score++;
        currentIndex++;
        setTimeout(showQuestion, 1000);
      } else {
        feedback.textContent = "❌ Some answers are wrong, try again.";
      }
    });
  }

  showQuestion();
}
