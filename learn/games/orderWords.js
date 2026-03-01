// games/orderWords.js
export function startOrderWords(state) {
  const container = document.getElementById("game");
  let currentIndex = 0;
  let score = 0;
  const questions = state.questions;

  function showQuestion() {
    // Check if we finished all words from the DB
    if (currentIndex >= questions.length) {
      container.innerHTML = `
        <div style="text-align:center;">
          <h2>🎉 Konec hry!</h2>
          <p>Vaše skóre: ${score} / ${questions.length}</p>
          <button onclick="location.reload()" style="padding:10px 20px; cursor:pointer;">Hrát znovu</button>
        </div>`;
      return;
    }

    const currentData = questions[currentIndex];
    const word = currentData.cs; // The Czech word/lemma
    
    // Create a shuffled array of characters
    let shuffled = word.split("").sort(() => Math.random() - 0.5);
    
    // Ensure shuffle actually changed something (optional but better for UX)
    if (shuffled.join("") === word && word.length > 1) {
        shuffled = word.split("").reverse();
    }

    container.innerHTML = `
      <div style="text-align:center;">
        <h2>Seřaďte písmena</h2>
        <p style="color: #666; font-style: italic;">${currentData.translation || ''}</p>
        
        <div id="answer-zone" style="min-height: 60px; margin: 20px auto; padding: 10px; border: 2px dashed #2f52b5; border-radius: 8px; display: flex; justify-content: center; align-items: center; gap: 5px; flex-wrap: wrap; background: #f9f9f9;"></div>
        
        <div id="letters-pool" style="margin-bottom: 20px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;"></div>
        
        <div style="margin-top: 20px;">
            <button id="check" style="background: #27ae60; color: white; padding: 10px 25px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Zkontrolovat</button>
            <button id="reset-word" style="background: #95a5a6; color: white; padding: 10px 25px; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Reset</button>
        </div>
        
        <p id="msg" style="font-weight: bold; margin-top: 15px; min-height: 24px;"></p>
        <p>Slovo ${currentIndex + 1} z ${questions.length}</p>
      </div>
    `;

    const answerZone = document.getElementById("answer-zone");
    const lettersPool = document.getElementById("letters-pool");
    const msg = document.getElementById("msg");

    // Function to create letter spans
    function renderLetters() {
      lettersPool.innerHTML = "";
      answerZone.innerHTML = "";
      shuffled.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "letter-box";
        span.style.cssText = "display: inline-block; padding: 10px 15px; background: white; border: 2px solid #2f52b5; border-radius: 5px; cursor: pointer; font-size: 1.5rem; font-weight: bold; user-select: none;";
        
        span.onclick = () => {
          if (span.parentElement === lettersPool) {
            answerZone.appendChild(span);
          } else {
            lettersPool.appendChild(span);
          }
        };
        lettersPool.appendChild(span);
      });
    }

    renderLetters();

    // Reset button logic
    document.getElementById("reset-word").onclick = renderLetters;

    // Check logic
    document.getElementById("check").onclick = () => {
      const userAttempt = Array.from(answerZone.children).map(c => c.textContent).join("");
      
      if (userAttempt === word) {
        msg.textContent = "✅ Výborně!";
        msg.style.color = "green";
        score++;
        currentIndex++;
        setTimeout(showQuestion, 1200);
      } else {
        msg.textContent = "❌ Zkuste to znovu";
        msg.style.color = "red";
        // Visual shake or brief highlight could go here
      }
    };
  }

  showQuestion();
}