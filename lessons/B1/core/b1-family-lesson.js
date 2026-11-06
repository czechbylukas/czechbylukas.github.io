// Shared logic for the Family lesson template: renders vocabulary, quiz and exercises from the page's DATA object.
(() => {
    const NOTES_KEY = B1Lesson.notesKey;
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
    const shuffle = values => {
      const result = [...values];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };
    const normalize = value => value.trim().toLocaleLowerCase("cs-CZ").replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ");
    const wordCount = value => value.trim() ? value.trim().split(/\s+/).length : 0;
    let activeFilter = "all";

    function speakText(text, statusId) {
      if (!("speechSynthesis" in window)) {
        if (statusId) $("#" + statusId).textContent = "Přehrávání řeči není v tomto prohlížeči dostupné.";
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "cs-CZ";
      window.speechSynthesis.speak(utterance);
    }

    function renderVocab() {
      const query = $("#vocabSearch").value.trim().toLocaleLowerCase("cs-CZ");
      const items = DATA.vocab.filter(item => (activeFilter === "all" || item.category === activeFilter) &&
        (query === "" || item.cz.toLocaleLowerCase("cs-CZ").includes(query) ||
          item.en.toLocaleLowerCase("cs-CZ").includes(query) || item.example.toLocaleLowerCase("cs-CZ").includes(query) ||
          (item.note || "").toLocaleLowerCase("cs-CZ").includes(query)));
      $("#vocabGrid").innerHTML = items.length ? items.map(item => `
        <article class="glass-card rounded-xl p-4">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2"><button class="speak-word rounded-lg bg-sky-900/60 px-2.5 py-2 text-sky-300" data-speak="${escapeHtml(item.cz)}" aria-label="Přehrát ${escapeHtml(item.cz)}"><i class="fa-solid fa-volume-high"></i></button><h3 class="font-bold">${escapeHtml(item.cz)}</h3></div>
            <span class="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">${escapeHtml(item.pos)}</span>
          </div>
          <p class="mt-2 text-sm text-sky-300">${escapeHtml(item.en)}</p>
          <p class="mt-3 rounded-lg bg-slate-900 p-3 text-sm italic leading-6 text-slate-300">${escapeHtml(item.example)}</p>
          ${item.note ? `<p class="mt-2 text-xs leading-5 text-amber-200">${escapeHtml(item.note)}</p>` : ""}
        </article>`).join("") : `<p class="col-span-full py-8 text-center text-slate-400">Žádná slovíčka neodpovídají hledání.</p>`;
    }

    function renderModel() {
      $("#modelText").classList.add("whitespace-pre-line");
      const model = B1Gender.t(DATA.model);
      $("#modelText").textContent = model.replace(/\*\*/g, "");
      // "se" and "si" are never marked; they stay as context words
      const phrases = (model.match(/\*\*(.*?)\*\*/g) || []).map(piece => piece.slice(2, -2).split(/\s+/).map(w => /^(se|si)$/i.test(w) ? "~" + w : w).join(" "));
      B1Marking.setup("modelText", "markCount", phrases, "slov v minulém čase");
    }

    function renderQuiz() {
      $("#quizList").innerHTML = DATA.quiz.map((item, index) => `
        <fieldset class="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <legend class="px-1 font-bold">${index + 1}. ${escapeHtml(B1Gender.t(item.question))}</legend>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">${shuffle(item.options).map((option, optionIndex) => `
            <label class="flex cursor-pointer gap-2 rounded-lg border border-slate-800 p-3 text-sm hover:bg-slate-800">
              <input type="radio" name="quiz-${index}" value="${escapeHtml(option)}"><span><b>${String.fromCharCode(65 + optionIndex)}.</b> ${escapeHtml(option)}</span>
            </label>`).join("")}</div>
        </fieldset>`).join("");
    }

    function renderExercises() {
      const exercises = DATA.exercises;
      $("#exAList").innerHTML = exercises.map((item, index) => {
        const parts = item.sentence.split("___");
        const width = Math.min(280, Math.max(100, item.answer.length * 11 + 20));
        return `<article class="glass-card rounded-xl p-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-center">
            <p class="flex-1 text-sm leading-8 sm:text-base"><b class="mr-2 text-sky-300">${index + 1}.</b>${escapeHtml(parts[0])}<input class="exA-input mx-1 inline-block rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-center text-sky-200" style="width:${width}px" data-answer="${escapeHtml(item.answer)}"             aria-label="Odpověď ${index + 1}"><span class="mr-1 text-slate-300">(${escapeHtml(item.hint)})</span>${escapeHtml(parts.slice(1).join("___"))}</p>
                      </div><p class="exA-result mt-2 text-xs" aria-live="polite"></p></article>`;
      }).join("");
      $("#exBList").innerHTML = DATA.upgrades.map((item, index) => `
        <article class="glass-card space-y-3 rounded-xl p-4" data-upgrade="${index}">
          <div class="grid gap-2 text-sm sm:grid-cols-2">
            <p class="rounded-lg bg-slate-900 p-3"><b class="text-sky-300">Začínáš:</b> ${escapeHtml(item.start)}</p>
            <p class="rounded-lg bg-slate-900 p-3"><b class="text-sky-300">Změň / doplň:</b> ${escapeHtml(item.change)}</p>
          </div>
          <p class="text-sm text-slate-300"><b>Úspěšná odpověď:</b> ${escapeHtml(item.success)}</p>
          <p class="text-xs text-amber-200"><b>Nápověda:</b> ${escapeHtml(item.hint)}</p>
          <textarea class="upgrade-input w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm leading-6" rows="2" placeholder="Napiš svou rozšířenou větu…"></textarea>
          <div class="flex flex-wrap items-center gap-2"><button class="reveal-model rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold">Ukázat model</button><span class="upgrade-result text-xs" aria-live="polite"></span></div>
          <p class="upgrade-model hidden rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 text-sm leading-6"><b>Modelová odpověď:</b> ${escapeHtml(item.model)}</p>
        </article>`).join("");
      updateExAProgress();
      updateExBProgress();
    }

    function updateExAProgress() {
      const inputs = $$(".exA-input");
      const filled = inputs.filter(input => input.value.trim()).length;
      $("#exAProgress").textContent = `Vyplněno ${filled} z ${inputs.length}`;
    }
    function checkExA() {
      let correct = 0;
      $$(".exA-input").forEach(input => {
        const ok = normalize(input.value) === normalize(input.dataset.answer);
        input.classList.toggle("answer-correct", ok);
        input.classList.toggle("answer-incorrect", !ok);
        input.closest("article").querySelector(".exA-result").textContent = ok ? "Správně." : "Zkontroluj tvar a nápovědu.";
        input.closest("article").querySelector(".exA-result").className = "exA-result mt-2 text-xs " + (ok ? "text-emerald-300" : "text-rose-300");
        if (ok) correct++;
      });
      $("#exAFeedback").textContent = `Správně: ${correct} z ${$$(".exA-input").length}.`;
    }
    function revealExA() {
      $$(".exA-input").forEach(input => { input.value = input.dataset.answer; input.classList.remove("answer-incorrect"); input.classList.add("answer-correct"); });
      $$(".exA-result").forEach(result => { result.textContent = "Řešení."; result.className = "exA-result mt-2 text-xs text-sky-300"; });
      updateExAProgress();
      $("#exAFeedback").textContent = "Zobrazena všechna řešení.";
    }
    function resetExA() {
      $$(".exA-input").forEach(input => { input.value = ""; input.classList.remove("answer-correct", "answer-incorrect"); });
      $$(".exA-result").forEach(result => { result.textContent = ""; });
      updateExAProgress();
      $("#exAFeedback").textContent = "";
    }
    function updateExBProgress() {
      const fields = $$(".upgrade-input");
      const complete = fields.filter(field => field.value.trim()).length;
      $("#exBProgress").textContent = `Hotovo ${complete} z ${fields.length}`;
    }
    function checkExB() {
      const fields = $$(".upgrade-input");
      const complete = fields.filter(field => field.value.trim()).length;
      fields.forEach(field => { field.closest("article").querySelector(".upgrade-result").textContent = field.value.trim() ? "Návrh zapsán — porovnej ho s kritériem a modelovou odpovědí." : "Nejdřív napiš svou odpověď."; });
      $("#exBFeedback").textContent = `Vyplněno ${complete} z ${fields.length}. Jde o vlastní tvorbu, ne automatické známkování.`;
    }
    function resetExB() {
      $$(".upgrade-input").forEach(field => { field.value = ""; });
      $$(".upgrade-result").forEach(result => { result.textContent = ""; });
      $$(".upgrade-model").forEach(model => model.classList.add("hidden"));
      updateExBProgress();
      $("#exBFeedback").textContent = "";
    }
    function checkQuiz() {
      let correct = 0;
      let answered = 0;
      DATA.quiz.forEach((question, index) => {
        const selected = $(`input[name="quiz-${index}"]:checked`);
        if (selected) { answered++; if (selected.value === question.correct) correct++; }
      });
      $("#quizFeedback").textContent = answered < DATA.quiz.length ? `Odpověděl/a jsi na ${answered} ze 3 otázek. Správně zatím ${correct}.` : `Výsledek: ${correct} ze 3 správně.`;
      $("#quizFeedback").className = "text-sm " + (correct === 3 && answered === 3 ? "text-emerald-300" : "text-amber-200");
    }
    function saveLocal(key, value, status) {
      try {
        localStorage.setItem(key, value);
        if (status) status.textContent = "Uloženo v tomto prohlížeči.";
      } catch (error) {
        if (status) status.textContent = "Uložení se nezdařilo; zkontroluj nastavení úložiště prohlížeče.";
      }
    }
    function loadLocal(key, status) {
      try { return localStorage.getItem(key) || ""; }
      catch (error) {
        if (status) status.textContent = "Uložené údaje nejsou dostupné.";
        return "";
      }
    }
    function init() {
      renderVocab();
      renderModel();
      renderQuiz();
      renderExercises();
      $("#vocabSearch").addEventListener("input", renderVocab);
      $$(".filter-btn").forEach(button => button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        $$(".filter-btn").forEach(item => item.className = "filter-btn rounded-lg px-2 py-2 text-xs " + (item === button ? "bg-sky-700" : "bg-slate-800"));
        renderVocab();
      }));
      document.addEventListener("click", event => {
        const speak = event.target.closest("[data-speak]");
        if (speak) speakText(speak.dataset.speak);
      });
      $("#speakModel").addEventListener("click", () => speakText(B1Gender.t(DATA.model).replace(/\*\*/g, "")));
      B1Gender.onChange(() => { renderModel(); renderQuiz(); });
      $("#checkQuiz").addEventListener("click", checkQuiz);
      $("#resetQuiz").addEventListener("click", () => { $$('input[type="radio"]').forEach(input => input.checked = false); $("#quizFeedback").textContent = ""; });
      $("#checkExA").addEventListener("click", checkExA);
      $("#revealExA").addEventListener("click", revealExA);
      $("#resetExA").addEventListener("click", resetExA);
      $("#exAList").addEventListener("input", updateExAProgress);
      $("#checkExB").addEventListener("click", checkExB);
      $("#resetExB").addEventListener("click", resetExB);
      $("#exBList").addEventListener("input", updateExBProgress);
      $("#exBList").addEventListener("click", event => {
        const button = event.target.closest(".reveal-model");
        if (button) button.closest("article").querySelector(".upgrade-model").classList.toggle("hidden");
      });
      $("#speakPractice").addEventListener("click", () => speakText($("#practiceText").value, "practiceStatus"));
      $("#clearPractice").addEventListener("click", () => { $("#practiceText").value = ""; $("#practiceCount").textContent = "0 slov"; $("#practiceStatus").textContent = ""; });
      $("#practiceText").addEventListener("input", () => $("#practiceCount").textContent = `${wordCount($("#practiceText").value)} slov`);
      const homework = $("#homeworkDraft");
      const homeworkKey = NOTES_KEY + "_homework";
      homework.value = loadLocal(homeworkKey, $("#homeworkStatus"));
      const updateHomeworkCount = () => $("#homeworkCount").textContent = `${wordCount(homework.value)} slov`;
      updateHomeworkCount();
      homework.addEventListener("input", () => { updateHomeworkCount(); saveLocal(homeworkKey, homework.value, $("#homeworkStatus")); });
      $("#clearHomework").addEventListener("click", () => { homework.value = ""; updateHomeworkCount(); saveLocal(homeworkKey, "", $("#homeworkStatus")); });
    }
    init();
})();
