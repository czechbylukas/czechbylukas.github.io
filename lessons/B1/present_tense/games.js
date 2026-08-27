// games.js
import { normalize } from "./core/utils.js";

// --- MULTIPLE CHOICE GAME ---
export function startMultipleChoice(state) {
  const container = document.getElementById("game");
  const questions = [...state.questions].sort(() => Math.random() - 0.5);
  let currentIndex = 0;
  let score = 0;

  function showQuestion() {
    if (currentIndex >= questions.length) {
      container.innerHTML = `<h2>🎉 Kvíz dokončen!</h2><p>Skóre: ${score} / ${questions.length}</p>`;
      return;
    }

    const q = questions[currentIndex];
    const correct = q.answers[0];
    const currentSynonym = q.synonym ? q.synonym : "";

    let wrongOptions = [];
    if (state.data && state.data.length > 0) {
      const normalizedCorrect = normalize(correct);
      const normalizedSynonym = normalize(currentSynonym);
      const correctWordCount = correct.split(" ").length;

      const pool = state.data.map(item => item.cs).filter(word => {
          const n = normalize(word);
          return n !== normalizedCorrect && (normalizedSynonym === "" || n !== normalizedSynonym);
      });

      wrongOptions = pool.filter(word => Math.abs(word.split(" ").length - correctWordCount) <= 2);
      if (wrongOptions.length < 3) {
        const remaining = pool.filter(word => !wrongOptions.includes(word));
        wrongOptions = [...wrongOptions, ...remaining];
      }
    }

    let randomWrong = [];
    while (randomWrong.length < 3 && wrongOptions.length > 0) {
      const idx = Math.floor(Math.random() * wrongOptions.length);
      randomWrong.push(wrongOptions[idx]);
      wrongOptions.splice(idx, 1);
    }

    let options = [correct, ...randomWrong].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <h3>Multiple Choice</h3>
      <p style="font-size: 1.5rem;">${q.text.replace("{{gap}}", "___")}</p>
      <div id="options" style="display:flex; flex-direction:column; gap:10px; max-width: 300px; margin: 20px auto;">
        ${options.map(opt => `<button class="game-btn opt">${opt}</button>`).join("")}
      </div>
      <p>Otázka ${currentIndex + 1} / ${questions.length}</p>
      <p id="feedback" style="font-weight:bold; height:20px;"></p>
    `;

    const feedback = document.getElementById("feedback");
    container.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".opt").forEach(b => b.disabled = true);
        if (normalize(btn.textContent) === normalize(correct)) {
          feedback.textContent = "✅ Správně!";
          feedback.style.color = "green";
          score++;
        } else {
          feedback.textContent = `❌ Špatně. Správná odpověď: ${correct}`;
          feedback.style.color = "red";
        }
        currentIndex++;
        setTimeout(showQuestion, 2000);
      };
    });
  }
  showQuestion();
}

// --- FILL GAP GAME ---
export function startFillGap(state) {
    const container = document.getElementById("game");
    const questions = Array.isArray(state)
        ? [...state]
        : [...(state.questions || [])];

    if (questions.length === 0) return;

    questions.sort(() => Math.random() - 0.5);

    let currentIndex = 0;
    let score = 0;
    const total = questions.length;

    function handleCheck() {
        const input = container.querySelector(".gap");
        const feedback = document.getElementById("feedback");
        const strictToggle = document.getElementById("strictMode");
        const isStrict = strictToggle.checked;

        if (!input) return;

        const userRaw = input.value.trim();
        const correctRaw = input.dataset.surface.trim();

        const userNormalized = normalize(userRaw);
        const correctNormalized = normalize(correctRaw);

        const isCorrect = isStrict
            ? userRaw === correctRaw
            : userNormalized === correctNormalized;

        if (isCorrect) {
            input.style.borderColor = "green";
            input.style.backgroundColor = "#eaffea";

            feedback.textContent = "✅ Výborně!";

            score++;
            currentIndex++;

            setTimeout(showQuestion, 1000);

        } else {
            input.style.borderColor = "red";
            input.style.backgroundColor = "#ffeaea";

            if (
                isStrict &&
                userRaw.toLowerCase() === correctRaw.toLowerCase()
            ) {
                feedback.textContent =
                    "❌ Téměř! Pozor na velká písmena nebo diakritiku.";
            } else {
                feedback.textContent = isStrict
                    ? "❌ Špatně. Zkontrolujte detaily."
                    : "❌ Zkuste to znovu.";
            }

            input.focus();
        }
    }

    function showQuestion() {
        if (currentIndex >= total) {
            container.innerHTML = `
                <h2>🎉 Konec kvízu!</h2>
                <p>Skóre: ${score} / ${total}</p>
            `;
            return;
        }

        const q = questions[currentIndex];

        // Replace {{gap}} with a visible blank
        const sentence = q.text.replace("{{gap}}", "_____");

        // Get infinitive
        const infinitive = Array.isArray(q.infinitiv)
            ? q.infinitiv[0]
            : q.infinitiv;

        container.innerHTML = `
            <div style="margin-bottom: 15px;">
                <label>
                    <input type="checkbox" id="strictMode">
                    Strict Mode
                </label>
            </div>

            <h2>
                ${sentence}
                <span style="font-size: 0.8em; color: #64748b;">
                    (${infinitive})
                </span>
            </h2>

            <div>
                <input
                    class="gap"
                    data-surface="${q.cs}"
                    autocomplete="off"
                    style="
                        font-size: 1.5rem;
                        padding: 10px;
                        text-align: center;
                    "
                >
            </div>

            <button
                id="check"
                class="game-btn"
                style="margin-top:20px;"
            >
                Kontrola
            </button>

            <p
                id="feedback"
                style="margin-top:20px; font-weight:bold; height:20px;"
            ></p>
        `;

        document.getElementById("check").onclick = handleCheck;

        const input = container.querySelector(".gap");

        input.focus();

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleCheck();
            }
        };
    }

    showQuestion();
}

// --- MATCH GAME ---
export function startMatchGame(state) {
  const container = document.getElementById("game");
  const lang = state.language || "en";
  const seen = new Set();
  const filteredData = [];

  state.data.forEach(w => {
    const main = w.cs.trim().toLowerCase();
    const syn = (w.synonym || "").trim().toLowerCase();
    if (!seen.has(main) && (!syn || !seen.has(syn))) {
      filteredData.push({
        en: w[lang] || w.en,
        csDisplay: (syn && syn !== "") ? `${w.cs} / ${w.synonym}` : w.cs
      });
      seen.add(main);
      if (syn) seen.add(syn);
    }
  });

  const leftItems = filteredData.map(d => d.en);
  const rightItems = filteredData.map(d => d.csDisplay).sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <h2>Match Game</h2>
    <div style="display: flex; gap: 20px; justify-content: center; margin-top:20px;">
      <div id="left-grid" style="display:flex; flex-direction:column; gap:10px;"></div>
      <div id="right-grid" style="display:flex; flex-direction:column; gap:10px;"></div>
    </div>
    <p id="result" style="margin-top:20px; font-weight:bold;"></p>
  `;

  const leftCol = document.getElementById("left-grid");
  const rightCol = document.getElementById("right-grid");
  const result = document.getElementById("result");
  let selected = null;

  function createWordDiv(word, side) {
    const div = document.createElement("div");
    div.textContent = word;
    div.className = "match-box";
    div.dataset.matched = "false";
    div.onclick = () => handleBoxClick(div, side);
    return div;
  }

  leftItems.forEach(word => leftCol.appendChild(createWordDiv(word, "left")));
  rightItems.forEach(word => rightCol.appendChild(createWordDiv(word, "right")));

  function handleBoxClick(div, side) {
    if (div.dataset.matched === "true") return;
    if (!selected) {
      selectBox(div, side);
      return;
    }
    if (selected.element === div) {
      deselectBox();
      return;
    }
    if (selected.side === side) {
      deselectBox();
      selectBox(div, side);
      return;
    }
    checkMatch(div);
  }

  function selectBox(div, side) {
    selected = { element: div, word: div.textContent, side: side };
    div.style.outline = "3px solid #2c3e50";
  }

  function deselectBox() {
    if (selected) selected.element.style.outline = "";
    selected = null;
  }

  function checkMatch(secondBox) {
    const word1 = selected.word;
    const word2 = secondBox.textContent;
    const isCorrect = filteredData.some(d => (d.en === word1 && d.csDisplay === word2) || (d.en === word2 && d.csDisplay === word1));

    const firstBox = selected.element;
    if (isCorrect) {
      [firstBox, secondBox].forEach(el => {
        el.style.background = "#27ae60";
        el.style.color = "white";
        el.dataset.matched = "true";
        el.style.outline = "";
      });
      selected = null;
      if (document.querySelectorAll('.match-box[data-matched="false"]').length === 0) {
        result.textContent = "🎉 Vše správně!";
      }
    } else {
      [firstBox, secondBox].forEach(el => el.style.background = "#e74c3c");
      selected = null;
      setTimeout(() => {
        [firstBox, secondBox].forEach(el => {
          if (el.dataset.matched !== "true") {
            el.style.background = "#f1c40f";
            el.style.outline = "";
          }
        });
      }, 800);
    }
  }
}