import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  const questions = state.questions; // already set in loader.js
  let currentIndex = 0;
  let score = 0;

  function showQuestion() {
    if (currentIndex >= questions.length) {
      container.innerHTML = `<h2>🎉 Kvíz dokončen!</h2>
        <p>Skóre: ${score} / ${questions.length}</p>`;
      return;
    }

    const q = questions[currentIndex];

    // Correct answer
    const correct = q.answers[0];

    // Create wrong options from state.data
    let options = [correct];
    while (options.length < 4 && state.data) {
      const rand = state.data[Math.floor(Math.random() * state.data.length)].cs;
      if (!options.includes(rand)) options.push(rand);
    }

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

    // Add click listeners
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
