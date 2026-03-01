import { normalize } from "../core/utils.js";

export function startWriteAnswerGame(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  // 1. Shuffle and ensure we are using the full data set
  const items = [...state.data].sort(() => Math.random() - 0.5);
  let index = 0;
  let score = 0;

  function show() {
    if (index >= items.length) {
      container.innerHTML = `<h2>🎉 Hotovo!</h2><p>Skóre: ${score} / ${items.length}</p>`;
      return;
    }

    const item = items[index];
    
    // 2. Decide what to show (English Phrase > English Word)
    const questionText = item.phraseEn || item.en;

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Přeložte:</p>
        <h3 style="font-size: 1.4rem;">${questionText}</h3>
      </div>
      
      <div style="margin-bottom: 15px;">
        <input id="ans" autocomplete="off" style="padding: 10px; font-size: 1.1rem; width: 80%; max-width: 300px; border-radius: 5px; border: 1px solid #ccc;">
        <button id="check" style="padding: 10px 20px; font-size: 1.1rem; cursor: pointer; background: #2196F3; color: white; border: none; border-radius: 5px;">Kontrola</button>
      </div>

      <p id="feedback" style="min-height: 1.5em; font-weight: bold;"></p>
      <p style="color: #999; font-size: 0.8rem;">Otázka ${index + 1} / ${items.length}</p>
    `;

    const input = document.getElementById("ans");
    const feedback = document.getElementById("feedback");
    const checkBtn = document.getElementById("check");

    setTimeout(() => input.focus(), 50);

    function check() {
      const userValue = normalize(input.value);
      
      // 3. Validation Logic: Check against Primary and Synonym
      const correctPrimary = normalize(item.cs);
      const correctSynonym = item.synonym ? normalize(item.synonym) : null;
      
      // Also check against 'phrase' if it's different from 'cs'
      const correctPhrase = item.phrase ? normalize(item.phrase) : null;

      const isCorrect = (userValue === correctPrimary) || 
                        (correctSynonym && userValue === correctSynonym) ||
                        (correctPhrase && userValue === correctPhrase);

      if (isCorrect) {
        feedback.style.color = "green";
        feedback.textContent = "✅ Výborně!";
        score++;
        index++;
        setTimeout(show, 800);
      } else {
        feedback.style.color = "red";
        feedback.textContent = "❌ Zkuste to znovu.";
        input.value = "";
        input.classList.add("shake"); // Optional: add a shake class in CSS
        setTimeout(() => input.focus(), 50);
      }
    }

    checkBtn.onclick = check;

    input.addEventListener("keydown", e => {
      if (e.key === " " || e.code === "Space") {
        e.stopPropagation(); 
      }
      if (e.key === "Enter") {
        e.preventDefault();
        check();
      }
    });
  }

  show();
}