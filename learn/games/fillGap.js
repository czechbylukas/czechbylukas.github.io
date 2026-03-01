import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

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
    
    // 1. Create the inputs using gapDetails (stores surface + lemma)
    let gIndex = 0;
    html = html.replace(/{{gap}}/g, () => {
      const detail = q.gapDetails[gIndex] || { surface: "", lemma: "", synonym: "" };
      const input = `<input class="gap" 
                            data-surface="${detail.surface}" 
                            data-lemma="${detail.lemma}" 
                            data-synonym="${detail.synonym}" 
                            data-index="${gIndex}" 
                            autocomplete="off">`;
      gIndex++;
      return input;
    });

    // 2. Add a UI toggle for Strict Mode
    container.innerHTML = `
      <div style="margin-bottom: 15px; background: #f4f4f4; padding: 10px; border-radius: 8px;">
        <label style="cursor: pointer; display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" id="strictMode"> 
          <span> Strict Mode <strong>I know how to decline and conjugate</strong></span>
        </label>
      </div>
      <p>${html}</p>
      <button id="check">Kontrola</button>
      <p id="feedback"></p>
      <p>Question ${currentIndex + 1} / ${total}</p>
    `;

    const checkBtn = document.getElementById("check");
    const feedback = document.getElementById("feedback");
    const strictToggle = document.getElementById("strictMode");

      const savedStrict = localStorage.getItem('strictMode') === 'true';
      strictToggle.checked = savedStrict;

      strictToggle.addEventListener('change', (e) => {
    localStorage.setItem('strictMode', e.target.checked);
});


    function handleCheck() {
      const inputs = Array.from(container.querySelectorAll(".gap"));
      const isStrict = strictToggle.checked;
      let allCorrect = true;

      inputs.forEach(input => {
        const user = normalize(input.value);
        const surface = normalize(input.dataset.surface);
        const lemma = normalize(input.dataset.lemma);
        const synonym = normalize(input.dataset.synonym || ""); // Now we have it!

        let isCorrect = false;

        if (isStrict) {
          isCorrect = (user === surface);
        } else {
          // Relaxed mode checks everything
          isCorrect = (user === surface || user === lemma || (synonym && user === synonym));
        }
          
        if (isCorrect) {
          input.style.borderColor = "green";
          input.style.backgroundColor = "#eaffea";
        } else {
          input.style.borderColor = "red";
          input.style.backgroundColor = "#ffeaea";
          allCorrect = false;
        }
      });
      // ... rest of your existing logic (feedback, next question)

      if (allCorrect) {
        feedback.textContent = "✅ Výborně!";
        score++;
        currentIndex++;
        setTimeout(showQuestion, 1000);
      } else {
        feedback.textContent = isStrict ? "❌ Nesprávně. Zkuste to znovu (pozor na pády)." : "❌ Zkuste to znovu.";
        const firstWrong = inputs.find(i => i.style.borderColor === "red");
        if (firstWrong) firstWrong.focus();
      }
    }

    checkBtn.onclick = handleCheck;

    // Handle keydown events
    container.querySelectorAll(".gap").forEach(input => {
      input.addEventListener("keydown", e => {
        if (e.key === " ") e.stopPropagation(); 
        if (e.key === "Enter") {
          e.preventDefault();
          handleCheck();
        }
      });
    });

    const firstInput = container.querySelector(".gap");
    if (firstInput) firstInput.focus();
  }

  showQuestion();
}