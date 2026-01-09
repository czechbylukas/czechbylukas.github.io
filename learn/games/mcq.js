import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");

  // Shuffle questions
  const questions = [...state.questions].sort(() => Math.random() - 0.5);

  let currentIndex = 0;
  let score = 0;

  function showQuestion() {
    if (currentIndex >= questions.length) {
      container.innerHTML = `<h2>🎉 Kvíz dokončen!</h2>
        <p>Skóre: ${score} / ${questions.length}</p>`;
      return;
    }

    const q = questions[currentIndex];
    const correct = q.answers[0];

    // Prepare wrong options
    let wrongOptions = [];
    if (state.data && state.data.length > 0) {
      wrongOptions = state.data
        .map(item => item.cs)
        .filter(word => word !== correct);
    }

    // Pick up to 3 random wrong options
    let randomWrong = [];
    while (randomWrong.length < 3 && wrongOptions.length > 0) {
      const idx = Math.floor(Math.random() * wrongOptions.length);
      randomWrong.push(wrongOptions[idx]);
      wrongOptions.splice(idx, 1); // remove to avoid duplicates
    }

    // Combine correct + wrong options
    let options = [correct, ...randomWrong];

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <p>${q.text.replace("{{gap}}", "___")}</p>
      <div id="options">
        ${options.map(opt => `<button class="opt">${opt}</button>`).join("")}
      </div>
      <p>Otázka ${currentIndex + 1} / ${questions.length}</p>
      <p id="feedback"></p>
    `;

    const feedback = document.getElementById("feedback");

    container.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        if (normalize(btn.textContent) === normalize(correct)) {
          feedback.textContent = "✅ Správně!";
          score++;
        } else {
          feedback.textContent = `❌ Špatně. Správná odpověď: ${correct}`;
        }
        currentIndex++;
        setTimeout(showQuestion, 1000);
      };
    });
  }

  showQuestion();
}
