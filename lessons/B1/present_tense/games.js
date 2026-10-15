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
    const rawCorrect = q.answers[0].trim();
    const sentenceHasReflexive = /\b(se|si)\b/i.test(q.text);

    // Clean reflexive particle from target answer if sentence already contains 'se'/'si'
    const cleanCorrect = sentenceHasReflexive 
      ? rawCorrect.replace(/\s+(se|si)$/i, "").trim() 
      : rawCorrect;

    let options = [];

    // 1. Always prioritize q.forms when available
    if (q.forms && q.forms.length >= 4) {
      options = [...q.forms];
    } else {
      // 2. Fallback: filter matching forms strictly from state.data
      const targetInf = (q.infinitiv || "").trim();
      const baseWord = targetInf.replace(/^ne/i, "").split(" ")[0];

      let sameVerbForms = state.data
        .filter(item => {
          if (item.person === "infinitive") return false;
          const itemRoot = item.cs.replace(/^ne/i, "").split(" ")[0];
          return itemRoot.startsWith(baseWord.substring(0, 3)) || baseWord.startsWith(itemRoot.substring(0, 3));
        })
        .map(item => item.cs);

      if (!sameVerbForms.includes(rawCorrect)) {
        sameVerbForms.unshift(rawCorrect);
      }

      options = Array.from(new Set(sameVerbForms)).slice(0, 4);
    }

    // Strip reflexive 'se'/'si' from options if already present in prompt sentence
    if (sentenceHasReflexive) {
      options = options.map(opt => opt.replace(/\s+(se|si)$/i, "").trim());
    }

    // Ensure correct choice is present
    if (!options.includes(cleanCorrect)) {
      options[0] = cleanCorrect;
    }

    // Deduplicate and shuffle choices
    options = Array.from(new Set(options)).sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <h3>Multiple Choice Quiz</h3>
      <p style="font-size: 1.5rem;">
        ${q.text.replace("{{gap}}", "___")} 
        <span style="font-size: 0.85em; color: #64748b;">(${q.infinitiv})</span>
      </p>
      <div id="options" style="display:flex; flex-direction:column; gap:10px; max-width: 320px; margin: 20px auto;">
        ${options.map(opt => `<button class="game-btn opt" style="padding:12px; font-size:1.1rem; cursor:pointer;">${opt}</button>`).join("")}
      </div>
      <p>Otázka ${currentIndex + 1} / ${questions.length}</p>
      <p id="feedback" style="font-weight:bold; height:20px;"></p>
    `;

    const feedback = document.getElementById("feedback");
    container.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll(".opt").forEach(b => b.disabled = true);
        if (btn.textContent.trim() === cleanCorrect) {
          feedback.textContent = "✅ Správně!";
          feedback.style.color = "green";
          score++;
        } else {
          feedback.textContent = `❌ Špatně. Správná odpověď: ${cleanCorrect}`;
          feedback.style.color = "red";
        }
        currentIndex++;
        setTimeout(showQuestion, 1800);
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

        if (!input) return;

        const userRaw = input.value.trim();
        const allowedAnswers = JSON.parse(input.dataset.answers || "[]");

        const isCorrect = allowedAnswers.some(ans => ans.trim() === userRaw);

        if (isCorrect) {
            input.style.borderColor = "green";
            input.style.backgroundColor = "#eaffea";
            feedback.textContent = "✅ Výborně!";
            feedback.style.color = "green";
            score++;
            currentIndex++;
            setTimeout(showQuestion, 1200);
        } else {
            input.style.borderColor = "red";
            input.style.backgroundColor = "#ffeaea";
            feedback.textContent = `❌ Špatně. Správná odpověď: ${allowedAnswers.join(" / ")}`;
            feedback.style.color = "red";
            currentIndex++;
            setTimeout(showQuestion, 2200);
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
        const sentence = q.text.replace("{{gap}}", "_____");
        const infinitive = Array.isArray(q.infinitiv) ? q.infinitiv[0] : q.infinitiv;
        const answersJson = JSON.stringify(q.answers || [q.cs]);

        container.innerHTML = `
            <h2>
                ${sentence}
                <span style="font-size: 0.8em; color: #64748b;">
                    (${infinitive})
                </span>
            </h2>

            <div style="margin: 20px 0;">
                <input
                    class="gap"
                    data-answers='${answersJson}'
                    autocomplete="off"
                    style="
                        font-size: 1.5rem;
                        padding: 10px;
                        text-align: center;
                        border: 2px solid #ccc;
                        border-radius: 6px;
                    "
                >
            </div>

            <button id="check" class="game-btn" style="padding: 10px 25px; font-size: 1.1rem; cursor: pointer;">
                Kontrola
            </button>

            <p id="feedback" style="margin-top:20px; font-weight:bold; height:20px;"></p>
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

// --- MATCH GAME (3 Random Verbs - All Forms) ---
export function startMatchGame(state) {
  const container = document.getElementById("game");
  const lang = state.language || "en";

  const infinitives = Array.from(new Set(
    state.data
      .filter(w => w.person === "infinitive")
      .map(w => w.cs)
  )).sort(() => Math.random() - 0.5);

  const selectedInfinitives = infinitives.slice(0, 3);

  const filteredData = state.data.filter(w => {
    return selectedInfinitives.some(inf => {
      const root = inf.split(" ")[0].substring(0, 3);
      return w.cs.startsWith(root);
    });
  });

  const leftItems = filteredData.map((d, index) => ({
    id: `${d.cs}-${index}`,
    matchId: d.cs,
    text: d[lang] || d.en
  })).sort(() => Math.random() - 0.5);

  const rightItems = filteredData.map((d, index) => ({
    id: `${d.cs}-${index}`,
    matchId: d.cs,
    text: d.synonym ? `${d.cs} / ${d.synonym}` : d.cs
  })).sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <h2>Match Cards (3 slovesa - komplet tvary)</h2>
    <div style="display: flex; gap: 20px; justify-content: center; margin-top:20px; flex-wrap: wrap;">
      <div id="left-grid" style="display:flex; flex-direction:column; gap:10px;"></div>
      <div id="right-grid" style="display:flex; flex-direction:column; gap:10px;"></div>
    </div>
    <p id="result" style="margin-top:20px; font-weight:bold;"></p>
  `;

  const leftCol = document.getElementById("left-grid");
  const rightCol = document.getElementById("right-grid");
  const result = document.getElementById("result");
  let selected = null;

  function createWordDiv(item, side) {
    const div = document.createElement("div");
    div.textContent = item.text;
    div.dataset.id = item.matchId;
    div.className = "match-box";
    div.style.cssText = "padding:10px 20px; background:#f1c40f; border-radius:6px; cursor:pointer; min-width:180px; text-align:center;";
    div.dataset.matched = "false";
    div.onclick = () => handleBoxClick(div, side);
    return div;
  }

  leftItems.forEach(item => leftCol.appendChild(createWordDiv(item, "left")));
  rightItems.forEach(item => rightCol.appendChild(createWordDiv(item, "right")));

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
    selected = { element: div, id: div.dataset.id, side: side };
    div.style.outline = "3px solid #2c3e50";
  }

  function deselectBox() {
    if (selected) selected.element.style.outline = "";
    selected = null;
  }

  function checkMatch(secondBox) {
    const isCorrect = (selected.id === secondBox.dataset.id);
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
        result.textContent = "🎉 Vše správně spojeno!";
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