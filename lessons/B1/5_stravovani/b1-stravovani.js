(() => {
  const lessonNumber = window.B1_STRAVOVANI_LESSON;
  const allData = window.B1_STRAVOVANI_DATA;
  const data = allData && allData[lessonNumber];
  const app = document.getElementById("foodLessonApp");
  if (!data || !app) {
    console.error("Obsah lekce Stravování se nepodařilo načíst.");
    return;
  }

  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const norm = value => String(value).trim().toLocaleLowerCase("cs-CZ")
    .replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ");
  const shuffle = values => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const genderText = value => `<span data-gender-source="${esc(value)}">${esc(B1Gender.t(value))}</span>`;
  const cardList = sections => sections.map(section => `
    <section class="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <h3 class="font-bold text-sky-200">${genderText(section.title)}</h3>
      <ul class="mt-2 list-inside list-disc space-y-1 text-slate-300">${section.items.map(item => `<li>${genderText(item)}</li>`).join("")}</ul>
    </section>`).join("");

  function render() {
    app.innerHTML = `
      <section id="tab-vocab" class="tab-panel space-y-6">
        <article class="glass-card rounded-2xl p-5">
          <h2 class="text-xl font-bold text-sky-200">Stručně ke gramatice: 4. pád (akuzativ)</h2>
          <p class="mt-2 leading-7 text-slate-300">${esc(data.grammar)}</p>
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div class="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div><h2 class="text-xl font-bold"><i class="fa-solid fa-book-open mr-2 text-sky-400"></i>Slovní zásoba: 21 výrazů</h2><p class="mt-1 text-slate-400">Hledej výraz nebo si zobraz vybranou kategorii.</p></div>
            <div class="flex flex-col gap-2 sm:flex-row">
              <input id="foodSearch" type="search" placeholder="Hledat výraz…" aria-label="Hledat slovní zásobu" class="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
              <select id="foodCategory" aria-label="Filtrovat kategorii" class="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
                <option value="all">Všechny kategorie</option>
                ${data.categories.map(category => `<option value="${esc(category.id)}">${esc(category.label)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div id="foodVocabGrid" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"></div>
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div><h2 class="text-xl font-bold">${esc(data.modelTitle)}</h2><p class="mt-1 text-slate-300">Student čte nahlas. Přečti, označ 4. pád a odpověz na otázky.</p></div>
            <button type="button" id="speakModel" class="rounded-lg bg-slate-800 px-3 py-2 hover:bg-slate-700"><i class="fa-solid fa-volume-high mr-2"></i>Poslechnout</button>
          </div>
          <p id="foodModelText" class="rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-base leading-8 text-slate-100"></p>
          <div><span id="foodMarkCount"></span></div>
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div><h2 class="text-xl font-bold">Kvíz k porozumění</h2><p class="mt-1 text-slate-400">Odpověz na každou otázku. Možnosti A–D se při načtení stránky zamíchají.</p></div>
          <div id="foodQuiz" class="space-y-4"></div>
          <div class="flex flex-wrap items-center gap-2"><button type="button" id="checkFoodQuiz" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Zkontrolovat kvíz</button><button type="button" id="resetFoodQuiz" class="rounded-lg bg-slate-800 px-4 py-2">Vymazat odpovědi</button><span id="foodQuizFeedback" aria-live="polite"></span></div>
        </article>
      </section>
      <section id="tab-exA" class="tab-panel hidden space-y-5">
        <article class="glass-card rounded-2xl p-5"><h2 class="text-xl font-bold">Cvičení A: Doplň mezery (25 vět)</h2><p class="mt-1 text-slate-300">Doplň správný tvar ve 4. pádě. Základní tvar nebo infinitiv je uveden v závorce.</p><p id="foodExAProgress" class="mt-3 text-sky-300"></p></article>
        <div id="foodExAList" class="space-y-3"></div>
        <div class="exercise-actions sticky z-10 flex flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/95 p-3 backdrop-blur">
          <button type="button" id="checkFoodExA" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Zkontrolovat</button><button type="button" id="revealFoodExA" class="rounded-lg bg-amber-700 px-4 py-2 font-bold">Ukázat řešení</button><button type="button" id="resetFoodExA" class="rounded-lg bg-slate-700 px-4 py-2 font-bold">Začít znovu</button><span id="foodExAFeedback" aria-live="polite"></span>
        </div>
      </section>
      <section id="tab-exB" class="tab-panel hidden space-y-5">
        <article class="glass-card rounded-2xl p-5"><h2 class="text-xl font-bold">Cvičení B: Tvoř věty (10 úkolů)</h2><p class="mt-1 text-slate-300">U každého úkolu uprav výchozí větu podle zadání. Zkontroluj kritérium a modelovou odpověď odkryj až po vlastním pokusu.</p><p id="foodExBProgress" class="mt-3 text-sky-300"></p></article>
        <div id="foodExBList" class="space-y-3"></div>
      </section>
      <section id="tab-practice" class="tab-panel hidden space-y-5">
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <h2 class="text-xl font-bold"><i class="fa-solid fa-comments mr-2 text-sky-400"></i>${genderText(data.practice.title)}</h2>
          <p class="leading-7 text-slate-300">${genderText(data.practice.instructions)}</p>
          ${cardList(data.practice.sections)}
          ${data.practice.phrases ? `<div class="rounded-xl border border-sky-900/60 bg-sky-950/20 p-4"><h3 class="font-bold text-sky-200">Užitečné fráze</h3><ul class="mt-2 list-inside list-disc space-y-1 text-slate-300">${data.practice.phrases.map(item => `<li>${genderText(item)}</li>`).join("")}</ul></div>` : ""}
          <label for="foodPracticeText" class="block font-semibold text-slate-100">${esc(data.practice.editorLabel || "Poznámky k aktivitě")}</label>
          <textarea id="foodPracticeText" rows="8" class="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 leading-7" placeholder="Zapiš si nápady nebo svou přípravu…"></textarea>
          <div class="flex flex-wrap items-center gap-2"><button type="button" id="speakPractice" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Poslechnout text</button><button type="button" id="clearPractice" class="rounded-lg bg-slate-800 px-4 py-2">Vymazat</button><span id="practiceWords" class="text-slate-400" aria-live="polite">0 slov</span><span id="practiceStatus" class="text-slate-400" aria-live="polite"></span></div>
        </article>
      </section>
      <section id="tab-homework" class="tab-panel hidden space-y-5">
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <h2 class="text-xl font-bold"><i class="fa-solid fa-house-chimney-user mr-2 text-sky-400"></i>Domácí úkol: ${genderText(data.homework.title)}</h2>
          <p class="leading-7 text-slate-300">${genderText(data.homework.prompt)}</p>
          ${data.homework.outline.length ? `<div><h3 class="font-bold text-sky-200">Osnova</h3><ol class="mt-2 list-inside list-decimal space-y-1 text-slate-300">${data.homework.outline.map(item => `<li>${genderText(item)}</li>`).join("")}</ol></div>` : ""}
          ${data.homework.phrases.length ? `<div><h3 class="font-bold text-sky-200">Užitečné fráze</h3><ul class="mt-2 list-inside list-disc space-y-1 text-slate-300">${data.homework.phrases.map(item => `<li>${genderText(item)}</li>`).join("")}</ul></div>` : ""}
          ${data.homework.links ? `<div class="flex flex-col gap-2">${data.homework.links.map(link => `<a class="text-sky-300 underline" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join("")}</div>` : ""}
          ${data.homework.submission ? `<p class="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-amber-100">${genderText(data.homework.submission)}</p>` : ""}
          <div class="flex flex-wrap items-center justify-between gap-2"><label for="foodHomeworkText" class="font-semibold">${esc(data.homework.editorLabel || "Zde napiš svůj text")}</label><span id="homeworkWords" class="font-mono text-amber-300"></span></div>
          <textarea id="foodHomeworkText" rows="12" class="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 leading-7" placeholder="Napiš svůj text…"></textarea>
          <p id="homeworkStatus" class="text-sm text-slate-400" aria-live="polite">Text se ukládá v tomto prohlížeči.</p>
        </article>
      </section>`;
  }

  function renderVocabulary() {
    const query = document.getElementById("foodSearch").value.trim().toLocaleLowerCase("cs-CZ");
    const category = document.getElementById("foodCategory").value;
    const items = data.vocab.filter(item => (category === "all" || item[5] === category) &&
      item.slice(0, 5).some(value => value.toLocaleLowerCase("cs-CZ").includes(query)));
    document.getElementById("foodVocabGrid").innerHTML = items.length ? items.map(item => `
      <article class="glass-card rounded-xl p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-start gap-2"><button type="button" class="food-speak rounded-lg bg-sky-900/60 px-2.5 py-2 text-sky-300" data-word="${esc(item[0])}" aria-label="Přehrát ${esc(item[0])}"><i class="fa-solid fa-volume-high"></i></button><h3 class="text-lg font-bold text-sky-300">${esc(item[0])}</h3></div>
          <span class="rounded-full bg-slate-800 px-2 py-1 text-sm text-slate-300">${esc(item[1])}</span>
        </div>
        <p class="mt-2 text-sky-200">${esc(item[2])}</p>
        <p class="mt-2 rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-amber-100"><b>4. pád:</b> ${esc(item[3])}</p>
        <p class="mt-2 rounded-lg bg-slate-950 p-3 leading-6 text-slate-100"><b>Příklad:</b> ${genderText(item[4])}</p>
      </article>`).join("") : `<p class="col-span-full py-8 text-center text-slate-400">Žádná slovíčka neodpovídají hledání.</p>`;
  }

  function renderQuiz() {
    document.getElementById("foodQuiz").innerHTML = data.quiz.map((question, index) => {
      const options = shuffle(question.options.map((text, optionIndex) => ({ text, correct: optionIndex === question.answer })));
      return `<fieldset class="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><legend class="px-1 font-bold">${index + 1}. ${esc(B1Gender.t(question.question))}</legend><div class="mt-3 grid gap-2 sm:grid-cols-2">${options.map((option, i) => `<label class="flex cursor-pointer gap-2 rounded-lg border border-slate-700 p-3 hover:bg-slate-800"><input type="radio" name="foodQuiz-${index}" value="${option.correct}"><span><b>${String.fromCharCode(65 + i)}.</b> ${esc(B1Gender.t(option.text))}</span></label>`).join("")}</div></fieldset>`;
    }).join("");
  }

  function renderExercises(preserve = false) {
    const previousGapAnswers = preserve
      ? [...document.querySelectorAll(".food-exA-input")].map(input => input.value)
      : [];
    const previousAnswers = preserve
      ? [...document.querySelectorAll(".food-exB-input")].map(input => input.value)
      : [];
    document.getElementById("foodExAList").innerHTML = data.exA.map((exercise, index) => {
      const [before, after] = exercise[0].split("___");
      const answer = exercise[1];
      const width = Math.min(360, Math.max(100, [...answer].length * 11 + 24));
      return `<article class="glass-card rounded-xl p-4"><p class="text-base leading-9"><b class="mr-2 text-sky-300">${index + 1}.</b>${esc(before)}<input type="text" class="food-exA-input mx-1 inline-block max-w-full rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-center text-sky-100" style="width:${width}px" data-answer="${esc(answer)}" aria-label="Odpověď ${index + 1}">${esc(after)}</p><p class="food-exA-result mt-2 text-sm" aria-live="polite"></p></article>`;
    }).join("");
    if (preserve) {
      document.querySelectorAll(".food-exA-input").forEach((input, index) => { input.value = previousGapAnswers[index] || ""; });
    }
    document.getElementById("foodExBList").innerHTML = data.exB.map((task, index) => `
      <article class="glass-card space-y-3 rounded-xl p-4">
        <h3 class="font-bold text-sky-300">Úkol ${index + 1}</h3>
        <p class="rounded-lg bg-slate-950 p-3"><b>Začínáš:</b> ${esc(B1Gender.t(task.start))}</p>
        <p class="rounded-lg bg-slate-950 p-3"><b>Změň / doplň:</b> ${esc(task.change)}</p>
        <p class="text-slate-300"><b>Úspěšná odpověď:</b> ${esc(task.success)}</p>
        <p class="text-amber-200"><b>Nápověda:</b> ${esc(task.hint)}</p>
        <textarea class="food-exB-input w-full rounded-lg border border-slate-700 bg-slate-950 p-3 leading-6" rows="2" placeholder="Napiš svou větu…"></textarea>
        <div class="flex flex-wrap items-center gap-2"><button type="button" class="food-reveal-model rounded-lg bg-slate-800 px-3 py-2 font-bold">Ukázat model</button><span class="food-exB-feedback text-sm" aria-live="polite"></span></div>
        <p class="food-model-answer hidden rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 leading-6"><b>Modelová odpověď:</b> ${esc(B1Gender.t(task.model))}</p>
      </article>`).join("");
    if (preserve) {
      document.querySelectorAll(".food-exB-input").forEach((input, index) => { input.value = previousAnswers[index] || ""; });
    }
    updateProgress();
  }

  function updateProgress() {
    const inputsA = [...document.querySelectorAll(".food-exA-input")];
    const inputsB = [...document.querySelectorAll(".food-exB-input")];
    document.getElementById("foodExAProgress").textContent = `Vyplněno ${inputsA.filter(input => input.value.trim()).length} z ${inputsA.length}`;
    document.getElementById("foodExBProgress").textContent = `Zpracováno ${inputsB.filter(input => input.value.trim()).length} z ${inputsB.length}`;
  }

  function speak(text, status) {
    if (!("speechSynthesis" in window)) {
      if (status) status.textContent = "Přehrávání řeči není v tomto prohlížeči dostupné.";
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "cs-CZ";
    window.speechSynthesis.speak(utterance);
  }

  function initialize() {
    renderVocabulary();
    document.getElementById("foodSearch").addEventListener("input", renderVocabulary);
    document.getElementById("foodCategory").addEventListener("change", renderVocabulary);
    document.getElementById("foodVocabGrid").addEventListener("click", event => {
      const button = event.target.closest(".food-speak");
      if (button) speak(button.dataset.word, document.getElementById("practiceStatus"));
    });

    const model = document.getElementById("foodModelText");
    model.textContent = B1Gender.t(data.model).replace(/\*\*/g, "");
    B1Marking.setup("foodModelText", "foodMarkCount", data.marked, "slov ve 4. pádě");
    document.getElementById("speakModel").addEventListener("click", () => speak(B1Gender.t(data.model).replace(/\*\*/g, ""), document.getElementById("foodQuizFeedback")));

    renderQuiz();
    B1Gender.onChange(() => {
      app.querySelectorAll("[data-gender-source]").forEach(element => {
        element.textContent = B1Gender.t(element.dataset.genderSource);
      });
      renderVocabulary();
      renderQuiz();
      renderExercises(true);
    });
    document.getElementById("checkFoodQuiz").addEventListener("click", () => {
      let answered = 0, correct = 0;
      data.quiz.forEach((_, index) => {
        const selected = document.querySelector(`input[name="foodQuiz-${index}"]:checked`);
        if (selected) { answered++; if (selected.value === "true") correct++; }
      });
      document.getElementById("foodQuizFeedback").textContent = `Správně: ${correct} z ${data.quiz.length}. Zodpovězeno: ${answered} z ${data.quiz.length}.`;
      document.getElementById("foodQuizFeedback").className = correct === data.quiz.length ? "text-emerald-300" : "text-amber-300";
    });
    document.getElementById("resetFoodQuiz").addEventListener("click", () => {
      document.querySelectorAll('#foodQuiz input[type="radio"]').forEach(input => { input.checked = false; });
      document.getElementById("foodQuizFeedback").textContent = "";
    });

    renderExercises();
    document.getElementById("foodExAList").addEventListener("input", updateProgress);
    document.getElementById("checkFoodExA").addEventListener("click", () => {
      let correct = 0;
      document.querySelectorAll(".food-exA-input").forEach(input => {
        const ok = norm(input.value) === norm(input.dataset.answer);
        input.classList.toggle("answer-correct", ok);
        input.classList.toggle("answer-incorrect", !ok);
        const result = input.closest("article").querySelector(".food-exA-result");
        result.textContent = ok ? "Správně." : "Zkontroluj tvar a větu.";
        result.className = `food-exA-result mt-2 text-sm ${ok ? "text-emerald-300" : "text-rose-300"}`;
        if (ok) correct++;
      });
      document.getElementById("foodExAFeedback").textContent = `Správně: ${correct} z ${data.exA.length}.`;
    });
    document.getElementById("revealFoodExA").addEventListener("click", () => {
      document.querySelectorAll(".food-exA-input").forEach(input => { input.value = input.dataset.answer; input.classList.remove("answer-incorrect"); input.classList.add("answer-correct"); });
      document.querySelectorAll(".food-exA-result").forEach(result => { result.textContent = "Řešení."; result.className = "food-exA-result mt-2 text-sm text-sky-300"; });
      updateProgress();
      document.getElementById("foodExAFeedback").textContent = "Zobrazena všechna řešení.";
    });
    document.getElementById("resetFoodExA").addEventListener("click", () => {
      document.querySelectorAll(".food-exA-input").forEach(input => { input.value = ""; input.classList.remove("answer-correct", "answer-incorrect"); });
      document.querySelectorAll(".food-exA-result").forEach(result => { result.textContent = ""; });
      document.getElementById("foodExAFeedback").textContent = "";
      updateProgress();
    });

    const exBList = document.getElementById("foodExBList");
    exBList.addEventListener("input", event => {
      if (event.target.matches(".food-exB-input")) updateProgress();
    });
    exBList.addEventListener("click", event => {
      const reveal = event.target.closest(".food-reveal-model");
      if (reveal) {
        const modelAnswer = reveal.closest("article").querySelector(".food-model-answer");
        modelAnswer.classList.toggle("hidden");
        reveal.textContent = modelAnswer.classList.contains("hidden") ? "Ukázat model" : "Skrýt model";
        return;
      }
      if (event.target.matches(".food-exB-input")) return;
    });
    exBList.addEventListener("focusout", event => {
      if (!event.target.matches(".food-exB-input")) return;
      const feedback = event.target.closest("article").querySelector(".food-exB-feedback");
      feedback.textContent = event.target.value.trim() ? "Odpověď je připravená. Porovnej ji s kritériem; model zobraz až po vlastním pokusu." : "";
    });

    const practice = document.getElementById("foodPracticeText");
    const updateWordCount = () => {
      const count = practice.value.trim() ? practice.value.trim().split(/\s+/).length : 0;
      document.getElementById("practiceWords").textContent = `${count} slov`;
    };
    practice.addEventListener("input", updateWordCount);
    document.getElementById("speakPractice").addEventListener("click", () => speak(practice.value, document.getElementById("practiceStatus")));
    document.getElementById("clearPractice").addEventListener("click", () => { practice.value = ""; updateWordCount(); });

    const homework = document.getElementById("foodHomeworkText");
    const homeworkKey = `b1:food:${lessonNumber}:homework`;
    const homeworkStatus = document.getElementById("homeworkStatus");
    try { homework.value = localStorage.getItem(homeworkKey) || ""; } catch (error) {
      homeworkStatus.textContent = "Ukládání není dostupné v tomto prohlížeči.";
    }
    const updateHomeworkCount = () => {
      const count = homework.value.trim() ? homework.value.trim().split(/\s+/).length : 0;
      const target = data.homework.wordCount;
      const countLabel = target && /^\d+(?:[–-]\d+)?$/.test(target)
        ? `${count} / ${target} slov`
        : target ? `${count} slov · cíl: ${target}` : `${count} slov`;
      document.getElementById("homeworkWords").textContent = countLabel;
    };
    homework.addEventListener("input", () => {
      updateHomeworkCount();
      try {
        localStorage.setItem(homeworkKey, homework.value);
        homeworkStatus.textContent = "Text se automaticky ukládá v tomto prohlížeči.";
      } catch (error) {
        homeworkStatus.textContent = "Text se nepodařilo uložit. Zkopíruj si ho před zavřením stránky.";
      }
    });
    updateHomeworkCount();
  }

  render();
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
})();
