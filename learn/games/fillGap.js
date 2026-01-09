import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  // Shuffle questions
  const questions = [...state.questions].sort(() => Math.random() - 0.5);

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
      <button id="check">Kontrola</button>
      <p id="feedback"></p>
      <p>Question ${currentIndex + 1} / ${total}</p>
    `;

    const checkBtn = document.getElementById("check");
    const feedback = document.getElementById("feedback");

    function handleCheck() {
      const inputs = Array.from(container.querySelectorAll(".gap"));
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
        const firstWrong = inputs.find(i => i.style.borderColor === "red");
        if (firstWrong) firstWrong.focus();
      }
    }

    // Click listener
    checkBtn.onclick = handleCheck;

    // Enter key listener
    container.querySelectorAll(".gap").forEach(input => {
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleCheck();
          // Ensure cursor stays in first empty/wrong input
          setTimeout(() => {
            const firstEmpty = Array.from(container.querySelectorAll(".gap"))
              .find(i => i.value.trim() === "" || i.style.borderColor === "red");
            if (firstEmpty) firstEmpty.focus();
          }, 50);
        }
      });
    });

    // Focus first input
    const firstInput = container.querySelector(".gap");
    if (firstInput) firstInput.focus();
  }

  showQuestion();
}
