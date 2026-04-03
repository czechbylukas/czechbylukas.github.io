import { normalize } from "../core/utils.js";

export function startGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const questions = Array.isArray(state) ? [...state] : [...(state.questions || [])];
  if (questions.length === 0) return;
  questions.sort(() => Math.random() - 0.5);

  let currentIndex = 0;
  let score = 0;
  const total = questions.length;

  // --- THE LOGIC ENGINE ---
  function handleCheck() {
    const input = container.querySelector(".gap");
    const feedback = document.getElementById("feedback");
    const strictToggle = document.getElementById("strictMode");
    const isStrict = strictToggle.checked;

    if (!input) return;

    const userVal = input.value.trim().toLowerCase();
    const correctVal = input.dataset.surface.trim().toLowerCase();
    
    // Normalization for relaxed mode
    const userStripped = normalize(input.value);
    const correctStripped = normalize(input.dataset.surface);
    const synonymStripped = normalize(input.dataset.synonym || "");

    let isCorrect = false;

    if (isStrict) {
      // Must match exactly (úhoř !== uhor)
      isCorrect = (userVal === correctVal);
    } else {
      // Matches even without accents (uhor === úhoř)
      isCorrect = (userStripped === correctStripped || (synonymStripped && userStripped === synonymStripped));
    }

    if (isCorrect) {
      input.style.borderColor = "green";
      input.style.backgroundColor = "#eaffea";
      feedback.textContent = "✅ Výborně!";
      score++;
      currentIndex++;
      // Wait 1 second then show next
      setTimeout(showQuestion, 1000);
    } else {
      input.style.borderColor = "red";
      input.style.backgroundColor = "#ffeaea";
      feedback.textContent = isStrict ? "❌ Špatně. Zkontrolujte háčky a čárky." : "❌ Zkuste to znovu.";
      input.focus();
    }
  }

  // --- THE VISUAL RENDERER ---
  function showQuestion() {
    if (currentIndex >= total) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px;">
          <h2>🎉 Konec kvízu!</h2>
          <p style="font-size: 1.5rem;">Vaše skóre: <strong>${score} / ${total}</strong></p>
          <button onclick="location.reload()" style="padding: 10px 20px; cursor:pointer;">Hrát znovu</button>
        </div>`;
      return;
    }

    const q = questions[currentIndex];
    
    const finalHtml = `<input class="gap" 
                        data-surface="${q.cs}" 
                        data-lemma="${q.cs}" 
                        data-synonym="${q.synonym || ''}" 
                        autocomplete="off"
                        style="border: 2px solid #2f52b5; border-radius: 8px; padding: 5px 15px; text-align: center;">`;

    container.innerHTML = `
      <div style="margin-bottom: 15px; background: #f4f4f4; padding: 10px; border-radius: 8px;">
        <label style="cursor: pointer; display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" id="strictMode"> 
          <span> Strict Mode (Vyžadovat diakritiku)</span>
        </label>
      </div>
      <div style="text-align: center; padding: 20px;">
        <p style="font-size: 1.2rem; color: #666; margin-bottom: 5px;">Přeložte slovo:</p>
        <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #2c3e50;">${q.en}</h2>
        <div style="font-size: 2rem;">${finalHtml}</div>
        <div style="margin-top: 30px;">
           <button id="check" style="padding: 12px 30px; font-size: 1.2rem; background: #2f52b5; color: white; border: none; border-radius: 8px; cursor: pointer;">Kontrola</button>
        </div>
        <p id="feedback" style="margin-top: 20px; font-weight: bold; font-size: 1.2rem; min-height: 1.5em;"></p>
        <p style="color: #95a5a6;">Otázka ${currentIndex + 1} z ${total}</p>
      </div>
    `;

    // Re-attach listeners
    const checkBtn = document.getElementById("check");
    const strictToggle = document.getElementById("strictMode");
    const input = container.querySelector(".gap");

    // Load strict mode preference
    strictToggle.checked = localStorage.getItem('strictMode') === 'true';
    strictToggle.onchange = (e) => localStorage.setItem('strictMode', e.target.checked);

    checkBtn.onclick = handleCheck;
    
    input.focus();

    // --- UPDATED KEYDOWN LOGIC ---
    input.onkeydown = (e) => { 
      // 1. Explicitly allow spaces and stop other scripts from blocking it
      if (e.key === " " || e.code === "Space") {
        e.stopPropagation(); 
        return; // Let the character be typed
      }

      // 2. Handle Enter key
      if (e.key === "Enter") {
        e.preventDefault();
        handleCheck(); 
      }
    };
  }

  // Start the first question
  showQuestion();
}