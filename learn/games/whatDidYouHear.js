import { normalize } from "../core/utils.js";

export function startWhatDidYouHear(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const items = [...state.questions].sort(() => Math.random() - 0.5);
  let index = 0;
  let score = 0;

  function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function show() {
    if (index >= items.length) {
      container.innerHTML = `<div style="text-align:center; padding: 40px;">
          <h2>🎉 Hotovo!</h2>
          <p style="font-size: 1.5rem;">Skóre: <strong>${score} / ${items.length}</strong></p>
          <button onclick="location.reload()" style="padding: 12px 25px; cursor:pointer; background:#2c3e50; color:white; border:none; border-radius:8px;">Hrát znovu</button>
        </div>`;
      return;
    }

    const item = items[index];
    // FIX: Remove the slash but keep context (e.g., rád/a -> ráda)
    const realSentence = item.cs.replace(/\//g, '').trim();

    container.innerHTML = `
      <div style="text-align:center;" class="game-expanded">
        <div style="margin-bottom: 20px; display: inline-block; background: #f8fafc; padding: 8px 15px; border-radius: 20px; border: 1px solid #edf2f7;">
          <label style="cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px; color: #2c3e50;">
            <input type="checkbox" id="strictMode"> 
            <span style="font-weight: bold;">Strict Mode (diakritika a velikost)</span>
          </label>
        </div>
        <h2>What Did You Hear?</h2>
        <div style="margin: 20px 0;">
          <button id="replay-btn" style="background:#2f52b5; color:white; border-radius:50%; width:70px; height:70px; font-size:28px; cursor:pointer; border:none; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">🔊</button>
        </div>
        <input id="ans" type="text" placeholder="Napiš, co slyšíš..." autocomplete="off" spellcheck="false"
               style="font-size: 1.5rem; padding: 12px; width: 85%; text-align: center; border: 2px solid #2f52b5; border-radius: 10px; outline: none;">
        <div id="char-picker" style="margin: 15px 0; display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;">
            ${['ž','š','č','ř','ď','ť','ň','ě','á','é','í','ý','ó','ú','ů'].map(char => `
                <span class="char-btn" data-char="${char}" style="cursor:pointer; padding: 6px 10px; background: #fff; border-radius: 6px; font-weight: bold; border: 1px solid #edf2f7; font-size: 16px;">${char}</span>
            `).join('')}
        </div>
        <div style="margin-top:20px;">
          <button id="check" style="padding: 14px 45px; font-size: 1.2rem; cursor:pointer; background:#2c3e50; color:white; border-radius:12px; border:none; font-weight:bold;">Kontrola</button>
        </div>
        <p id="feedback" style="font-weight:bold; min-height: 24px; margin-top:15px; font-size:1.1rem;"></p>
        <p style="color:#94a3b8; font-size: 13px;">Postup: ${index + 1} / ${items.length}</p>
      </div>`;

    const input = document.getElementById("ans");
    const feedback = document.getElementById("feedback");
    const strictToggle = document.getElementById("strictMode");

    strictToggle.checked = localStorage.getItem('strictMode') === 'true';
    strictToggle.onchange = (e) => localStorage.setItem('strictMode', e.target.checked);

    document.querySelectorAll('.char-btn').forEach(btn => {
        btn.onclick = () => {
            const start = input.selectionStart;
            input.setRangeText(btn.getAttribute('data-char'), start, input.selectionEnd, 'end');
            input.focus();
        };
    });

    input.focus();
    setTimeout(() => speak(realSentence), 400);

    document.getElementById("replay-btn").onclick = () => { speak(realSentence); input.focus(); };

    function checkAction() {
      const isStrict = strictToggle.checked;
      const userVal = input.value.trim();
      const targetVal = realSentence.trim();

      let isCorrect = isStrict ? (userVal === targetVal) : (normalize(userVal) === normalize(targetVal));

      if (isCorrect) {
        feedback.innerHTML = "<span style='color:#27ae60;'>✅ Výborně!</span>";
        input.style.borderColor = "#27ae60";
        score++; index++;
        setTimeout(show, 1000);
      } else {
        feedback.innerHTML = `<span style='color:#e74c3c;'>❌ ${isStrict ? 'Chyba v diakritice nebo velikosti!' : 'Zkus to znovu!'}</span>`;
        input.style.borderColor = "#e74c3c";
        input.focus();
      }
    }

    document.getElementById("check").onclick = checkAction;
    input.onkeydown = (e) => {
      if (e.key === "Enter") { e.preventDefault(); checkAction(); }
      if (e.key === " ") e.stopPropagation();
    };
  }
  show();
}