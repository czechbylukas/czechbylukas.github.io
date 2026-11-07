/*
 * Shared logic for every B1 lesson page. Edit here to change all lessons at once.
 *
 * A lesson page only provides its own content plus a config block, e.g.
 *   <script>window.B1_LESSON = { topic: "Cestování", number: 3, title: "Cesta do zahraničí",
 *            icon: "fa-plane-departure", notesKey: "cz_b1_l3_notes", tabs: { exC: "Role play" } };</script>
 *   <script src="../core/b1-core.js"></script>
 * and calls B1Lesson.mount() directly after <body>. Data-driven lesson pages may also
 * call mountStructured(data, rootId), while the existing Family template uses mountFamily(data).
 */
// Speaker gender (muž / žena): one switch in the header drives every gendered text and question.
// In content write {{masculine|feminine}}, e.g. "Včera jsem {{byl|byla}} doma."
window.B1Gender = (() => {
  const KEY = "b1:gender";
  const listeners = [];
  let current = "M";
  try { if (localStorage.getItem(KEY) === "F") current = "F"; } catch (e) { /* storage unavailable */ }
  const slashForms = (text, g) => text.replace(/(\p{L}+)\/(ka|a)(?!\p{L})/gu, (_, stem, end) => (g === "F" ? stem + end : stem))
    .replace(/\bsám\/sama\b/gi, (m) => (g === "F" ? "sama" : "sám"));
  const resolve = (text, g = current) => slashForms(String(text).replace(/\{\{([^|{}]*)\|([^|{}]*)\}\}/g, (_, m, f) => (g === "F" ? f : m)), g);
  const paint = () => document.querySelectorAll("#b1Gender [data-gender]").forEach(button => {
    const active = button.dataset.gender === current;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
  });
  const set = g => {
    if (g !== "M" && g !== "F") return;
    const changed = g !== current;
    current = g;
    try { localStorage.setItem(KEY, g); } catch (e) { /* storage unavailable */ }
    paint();
    if (changed) listeners.slice().forEach(fn => { try { fn(g); } catch (e) { console.error(e); } });
  };
  return { get: () => current, isMale: () => current === "M", set, t: resolve, paint, onChange: fn => listeners.push(fn) };
})();

(() => {
  const cfg = window.B1_LESSON || {};
  const scriptUrl = document.currentScript.src;
  const coreBase = scriptUrl.replace(/[^/]*$/, "");
  const indexUrl = new URL("../B1_List_of_lessons.html", coreBase).href;
  const loginRequired = cfg.login !== false;

  // ---- Head resources: added dynamically so a slow CDN never blocks parsing ----
  if (loginRequired) {
    window.isLoginOnlyPage = true; // read by scripts-header.js, which each page loads right after this file
    window.canShowAds = false;
  }
  const addLink = (rel, href) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  };
  addLink("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
  addLink("stylesheet", "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
  addLink("stylesheet", `${coreBase}b1-core.css`);
  // Hide the page until Tailwind has styled it (with a fallback so a failed CDN never leaves it blank)
  const reveal = () => document.documentElement.style.removeProperty("visibility");
  document.documentElement.style.visibility = "hidden";
  const tailwind = document.createElement("script");
  tailwind.src = "https://cdn.tailwindcss.com";
  tailwind.onload = () => {
    window.tailwind.config = {
      theme: { extend: {
        fontFamily: { sans: ["Inter", "sans-serif"] },
        colors: { brand: { 50: "#f0f9ff", 100: "#e0f2fe", 500: "#0284c7", 600: "#0284c7", 700: "#0369a1" } }
      } }
    };
    setTimeout(reveal, 60);
  };
  tailwind.onerror = reveal;
  document.head.appendChild(tailwind);
  setTimeout(reveal, 3000);

  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const NOTES_KEY = cfg.notesKey || `cz_b1_l${cfg.number}_notes`;
  const isNotesField = el => el.tagName === "TEXTAREA" && /teacherNotes/i.test(`${el.id} ${el.className}`);
  const store = {
    get() { try { return localStorage.getItem(NOTES_KEY) || ""; } catch (e) { return ""; } },
    set(value) { try { localStorage.setItem(NOTES_KEY, value); return true; } catch (e) { return false; } }
  };

  // ---- Tab registry: fixed order and names keep every lesson consistent ----
  const TABS = {
    vocab: { label: "Slovní zásoba", icon: "fa-book-open", order: 0 },
    exA: { label: "Cvičení A: Doplň mezery", icon: "fa-pen-to-square", order: 1 },
    exB: { label: "Cvičení B: Tvoř věty", icon: "fa-wand-magic-sparkles", order: 2 },
    homework: { label: "Domácí úkol", icon: "fa-house-chimney-user", order: 99 }
  };

  const mount = () => {
    document.body.classList.add("b1-lesson");
    if (loginRequired) document.body.classList.add("b1-login-only");
    const lessonTitle = cfg.number ? `Lekce ${cfg.number}: ${esc(cfg.title || "")}` : esc(cfg.title || "");
    document.body.insertAdjacentHTML("afterbegin", `
<div id="b1Header" role="banner">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="b1-top">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-xl text-white"><i class="fa-solid ${esc(cfg.icon || "fa-users")}"></i></div>
        <div>
          <p class="text-lg font-bold leading-tight text-white">Czech B1 Mastery${cfg.topic ? ` · ${esc(cfg.topic)}` : ""}</p>
          <p class="text-sm font-medium text-sky-400">${lessonTitle}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div id="b1Gender" role="group" aria-label="Mluvčí">
          <span>Mluvčí:</span>
          <button type="button" data-gender="M" aria-pressed="true">Muž</button>
          <button type="button" data-gender="F" aria-pressed="false">Žena</button>
        </div>
        <a href="${indexUrl}" class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">← Přehled lekcí</a>
        <div id="auth-status-container" class="flex items-center"></div>
      </div>
    </div>
    <nav id="b1Tabs" aria-label="Navigace lekce"></nav>
  </div>
</div>
<aside class="teacher-live-notes-dock" aria-label="Teacher Live Notes">
  <label for="teacherNotes"><span><i class="fa-solid fa-pen-to-square mr-1 text-sky-400"></i>Teacher Live Notes</span><span id="notesStatus" class="text-xs font-normal text-emerald-300" aria-live="polite">Automaticky uloženo</span></label>
  <textarea id="teacherNotes" placeholder="Poznámky učitele..."></textarea>
</aside>`);
    document.getElementById("teacherNotes").value = store.get();
    document.getElementById("b1Gender").addEventListener("click", event => {
      const button = event.target.closest("[data-gender]");
      if (button) window.B1Gender.set(button.dataset.gender);
    });
    window.B1Gender.paint();
  };

  // ---- Teacher Live Notes: one visible field, mirrored into any legacy fields on the page ----
  const setupNotes = () => {
    const dock = document.querySelector(".teacher-live-notes-dock");
    const main = document.getElementById("teacherNotes");
    const status = document.getElementById("notesStatus");
    const legacy = [...document.querySelectorAll("textarea")].filter(el => isNotesField(el) && el !== main);
    const panelOf = field => {
      for (let node = field; node && node !== document.body; node = node.parentElement) {
        if (node.matches(".teacher-notes-widget, .teacher-notes-panel, aside[aria-label*='Teacher Live Notes']")) return node;
        if (node.classList.contains("glass-card") && /Teacher Live Notes|Poznámky učitele/i.test(node.textContent)) return node;
      }
      return null;
    };
    legacy.forEach(field => (panelOf(field) || field).classList.add("teacher-live-notes-secondary"));
    document.querySelectorAll(".teacher-notes-widget").forEach(el => { if (el !== dock) el.classList.add("teacher-live-notes-secondary"); });
    const mirror = () => legacy.forEach(field => { if (field.value !== main.value) field.value = main.value; });
    main.value = main.value || store.get();
    mirror();
    document.addEventListener("input", event => {
      if (!isNotesField(event.target)) return;
      if (event.target !== main) main.value = event.target.value;
      mirror();
      status.textContent = store.set(main.value) ? "Automaticky uloženo" : "Uložení se nezdařilo";
    }, true);
  };

  // ---- Tabs: built from the page's own tab-* sections ----
  const setupTabs = () => {
    const nav = document.getElementById("b1Tabs");
    const found = [...document.querySelectorAll("main > [id^='tab-']")];
    const sections = found.length ? found : [...document.querySelectorAll("[id^='tab-']")];
    const items = sections.map((section, index) => {
      const key = section.id.replace(/^tab-/, "");
      const meta = TABS[key] || { label: (cfg.tabs && cfg.tabs[key]) || "Procvičování", icon: (cfg.toolIcons && cfg.toolIcons[key]) || "fa-comments", order: 50 };
      return { section, key, meta, index };
    }).sort((a, b) => a.meta.order - b.meta.order || a.index - b.index);

    const legacySwitch = typeof window.switchTab === "function" ? window.switchTab : null;
    const show = id => {
      const target = id.startsWith("tab-") ? id : `tab-${id}`;
      // Some pages hook extra work (e.g. refreshing a map) into their own switchTab
      if (legacySwitch) {
        try { legacySwitch(target); } catch (e) { /* optional page hook */ }
      }
      items.forEach(({ section }) => {
        const active = section.id === target;
        section.hidden = !active;
        section.classList.toggle("hidden", !active);
        section.classList.toggle("active", active);
        section.style.display = active ? "block" : "none";
      });
      nav.querySelectorAll(".tab-btn").forEach(button => button.setAttribute("aria-selected", String(button.dataset.tab === target)));
      window.scrollTo({ top: 0 });
    };
    nav.innerHTML = items.map(({ section, meta }, i) =>
      `<button type="button" class="tab-btn" data-tab="${section.id}" aria-selected="false"><i class="fa-solid ${meta.icon} mr-2"></i>${i + 1}. ${esc(meta.label)}</button>`).join("");
    nav.addEventListener("click", event => {
      const button = event.target.closest(".tab-btn");
      if (button) show(button.dataset.tab);
    });
    window.switchTab = show;
    if (items.length) show(items[0].section.id);
  };

  const setupFooter = () => {
    document.body.insertAdjacentHTML("beforeend", `
<div id="b1Footer"><div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 pb-28 text-sm sm:px-6 lg:px-8 lg:pb-8">
  <span>Czech B1 Mastery${cfg.topic ? ` · ${esc(cfg.topic)}` : ""}</span>
  <a class="text-sky-400 hover:text-sky-300" href="${indexUrl}">← Přehled lekcí</a>
</div></div>`);
  };

  const speakText = (text, statusId) => {
    if (!("speechSynthesis" in window)) {
      const status = statusId && document.getElementById(statusId);
      if (status) status.textContent = "Přehrávání řeči není v tomto prohlížeči dostupné.";
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "cs-CZ";
    window.speechSynthesis.speak(utterance);
  };
  if (typeof window.speakText !== "function") window.speakText = speakText;

  const mountStructured = (data, rootId = "lessonContent") => {
    const app = document.getElementById(rootId);
    if (!data || !app) {
      console.error("Obsah strukturované lekce se nepodařilo načíst.");
      return;
    }

    const normalize = value => String(value).trim().toLocaleLowerCase("cs-CZ")
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

    app.innerHTML = `
      <section id="tab-vocab" class="tab-panel space-y-6">
        <article class="glass-card rounded-2xl p-5">
          <h2 class="text-xl font-bold text-sky-200">${esc(data.grammarTitle || "Gramatika")}</h2>
          <p class="mt-2 leading-7 text-slate-300">${esc(data.grammar)}</p>
          ${data.grammarOverviewPending ? `<button type="button" disabled aria-disabled="true" class="mt-3 cursor-not-allowed rounded-lg border border-red-500/60 bg-red-950/50 px-3 py-2 text-sm font-semibold text-red-200"><i class="fa-solid fa-book-open mr-2" aria-hidden="true"></i>Přehled gramatiky – work in progress</button>` : ""}
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div class="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div><h2 class="text-xl font-bold"><i class="fa-solid fa-book-open mr-2 text-sky-400"></i>Slovní zásoba: ${data.vocab.length} výrazů</h2><p class="mt-1 text-slate-400">Hledej výraz nebo si zobraz vybranou kategorii.</p></div>
            <div class="flex flex-col gap-2 sm:flex-row">
              <input id="structuredSearch" type="search" placeholder="Hledat výraz…" aria-label="Hledat slovní zásobu" class="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
              <select id="structuredCategory" aria-label="Filtrovat kategorii" class="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
                <option value="all">Všechny kategorie</option>
                ${data.categories.map(category => `<option value="${esc(category.id)}">${esc(category.label)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div id="structuredVocabGrid" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"></div>
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div><h2 class="text-xl font-bold">${esc(data.modelTitle)}</h2><p class="mt-1 text-slate-300">${esc(data.modelInstructions || "Student čte nahlas. Přečti, označ cílové tvary a odpověz na otázky.")}</p></div>
            <button type="button" id="structuredSpeakModel" class="rounded-lg bg-slate-800 px-3 py-2 hover:bg-slate-700"><i class="fa-solid fa-volume-high mr-2"></i>Poslechnout</button>
          </div>
          <p id="structuredModelText" class="rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-base leading-8 text-slate-100"></p>
          <div><span id="structuredMarkCount"></span></div>
        </article>
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <div><h2 class="text-xl font-bold">Kvíz k porozumění</h2><p class="mt-1 text-slate-400">Odpověz na každou otázku. Možnosti A–D se při načtení stránky zamíchají.</p></div>
          <div id="structuredQuiz" class="space-y-4"></div>
          <div class="flex flex-wrap items-center gap-2"><button type="button" id="checkStructuredQuiz" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Zkontrolovat kvíz</button><button type="button" id="resetStructuredQuiz" class="rounded-lg bg-slate-800 px-4 py-2">Vymazat odpovědi</button><span id="structuredQuizFeedback" aria-live="polite"></span></div>
        </article>
      </section>
      <section id="tab-exA" class="tab-panel hidden space-y-5">
        <article class="glass-card rounded-2xl p-5"><h2 class="text-xl font-bold">Cvičení A: Doplň mezery (${data.exA.length} vět)</h2><p class="mt-1 text-slate-300">Doplň správný tvar podle věty. Základní tvar nebo požadované množství je uvedeno v závorce.</p><p id="structuredExAProgress" class="mt-3 text-sky-300"></p></article>
        <div id="structuredExAList" class="space-y-3"></div>
        <div class="exercise-actions sticky z-10 flex flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/95 p-3 backdrop-blur">
          <button type="button" id="checkStructuredExA" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Zkontrolovat</button><button type="button" id="revealStructuredExA" class="rounded-lg bg-amber-700 px-4 py-2 font-bold">Ukázat řešení</button><button type="button" id="resetStructuredExA" class="rounded-lg bg-slate-700 px-4 py-2 font-bold">Začít znovu</button><span id="structuredExAFeedback" aria-live="polite"></span>
        </div>
      </section>
      <section id="tab-exB" class="tab-panel hidden space-y-5">
        <article class="glass-card rounded-2xl p-5"><h2 class="text-xl font-bold">Cvičení B: Tvoř věty (${data.exB.length} úkolů)</h2><p class="mt-1 text-slate-300">U každého úkolu uprav výchozí větu podle zadání. Zkontroluj kritérium a modelovou odpověď odkryj až po vlastním pokusu.</p><p id="structuredExBProgress" class="mt-3 text-sky-300"></p></article>
        <div id="structuredExBList" class="space-y-3"></div>
      </section>
      <section id="tab-practice" class="tab-panel hidden space-y-5">
        <article class="glass-card space-y-4 rounded-2xl p-5">
          <h2 class="text-xl font-bold"><i class="fa-solid fa-comments mr-2 text-sky-400"></i>${genderText(data.practice.title)}</h2>
          <p class="leading-7 text-slate-300">${genderText(data.practice.instructions)}</p>
          ${cardList(data.practice.sections)}
          ${data.practice.phrases ? `<div class="rounded-xl border border-sky-900/60 bg-sky-950/20 p-4"><h3 class="font-bold text-sky-200">Užitečné fráze</h3><ul class="mt-2 list-inside list-disc space-y-1 text-slate-300">${data.practice.phrases.map(item => `<li>${genderText(item)}</li>`).join("")}</ul></div>` : ""}
          <label for="structuredPracticeText" class="block font-semibold text-slate-100">${esc(data.practice.editorLabel || "Poznámky k aktivitě")}</label>
          <textarea id="structuredPracticeText" rows="8" class="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 leading-7" placeholder="Zapiš si nápady nebo svou přípravu…"></textarea>
          <div class="flex flex-wrap items-center gap-2"><button type="button" id="speakStructuredPractice" class="rounded-lg bg-sky-700 px-4 py-2 font-bold">Poslechnout text</button><button type="button" id="clearStructuredPractice" class="rounded-lg bg-slate-800 px-4 py-2">Vymazat</button><span id="structuredPracticeWords" class="text-slate-400" aria-live="polite">0 slov</span><span id="structuredPracticeStatus" class="text-slate-400" aria-live="polite"></span></div>
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
          <div class="flex flex-wrap items-center justify-between gap-2"><label for="structuredHomeworkText" class="font-semibold">${esc(data.homework.editorLabel || "Zde napiš svůj text")}</label><span id="structuredHomeworkWords" class="font-mono text-amber-300"></span></div>
          <textarea id="structuredHomeworkText" rows="12" class="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 leading-7" placeholder="Napiš svůj text…"></textarea>
          <p id="structuredHomeworkStatus" class="text-sm text-slate-400" aria-live="polite">Text se ukládá v tomto prohlížeči.</p>
        </article>
      </section>`;

    const get = id => document.getElementById(id);
    const renderVocabulary = () => {
      const query = get("structuredSearch").value.trim().toLocaleLowerCase("cs-CZ");
      const category = get("structuredCategory").value;
      const items = data.vocab.filter(item => (category === "all" || item[5] === category) &&
        item.slice(0, 5).some(value => value.toLocaleLowerCase("cs-CZ").includes(query)));
      get("structuredVocabGrid").innerHTML = items.length ? items.map(item => `
        <article class="glass-card rounded-xl p-4">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2"><button type="button" class="structured-speak rounded-lg bg-sky-900/60 px-2.5 py-2 text-sky-300" data-word="${esc(item[0])}" aria-label="Přehrát ${esc(item[0])}"><i class="fa-solid fa-volume-high"></i></button><h3 class="text-lg font-bold text-sky-300">${esc(item[0])}</h3></div>
            <span class="rounded-full bg-slate-800 px-2 py-1 text-sm text-slate-300">${esc(item[1])}</span>
          </div>
          <p class="mt-2 text-sky-200">${esc(item[2])}</p>
          <p class="mt-2 rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-amber-100"><b>${/^(podstatné jméno|přídavné jméno)/.test(item[1]) ? "4. pád" : "Slovníkový tvar"}:</b> ${esc(item[3])}</p>
          <p class="mt-2 rounded-lg bg-slate-950 p-3 leading-6 text-slate-100"><b>Příklad:</b> ${genderText(item[4])}</p>
        </article>`).join("") : `<p class="col-span-full py-8 text-center text-slate-400">Žádná slovíčka neodpovídají hledání.</p>`;
    };
    const renderQuiz = () => {
      get("structuredQuiz").innerHTML = data.quiz.map((question, index) => {
        const options = shuffle(question.options.map((text, optionIndex) => ({ text, correct: optionIndex === question.answer })));
        return `<fieldset class="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><legend class="px-1 font-bold">${index + 1}. ${esc(B1Gender.t(question.question))}</legend><div class="mt-3 grid gap-2 sm:grid-cols-2">${options.map((option, i) => `<label class="flex cursor-pointer gap-2 rounded-lg border border-slate-700 p-3 hover:bg-slate-800"><input type="radio" name="structuredQuiz-${index}" value="${option.correct}"><span><b>${String.fromCharCode(65 + i)}.</b> ${esc(B1Gender.t(option.text))}</span></label>`).join("")}</div></fieldset>`;
      }).join("");
    };
    const updateProgress = () => {
      const inputsA = [...app.querySelectorAll(".structured-exA-input")];
      const inputsB = [...app.querySelectorAll(".structured-exB-input")];
      get("structuredExAProgress").textContent = `Vyplněno ${inputsA.filter(input => input.value.trim()).length} z ${inputsA.length}`;
      get("structuredExBProgress").textContent = `Zpracováno ${inputsB.filter(input => input.value.trim()).length} z ${inputsB.length}`;
    };
    const renderExercises = (preserve = false) => {
      const previousGapAnswers = preserve ? [...app.querySelectorAll(".structured-exA-input")].map(input => input.value) : [];
      const previousAnswers = preserve ? [...app.querySelectorAll(".structured-exB-input")].map(input => input.value) : [];
      get("structuredExAList").innerHTML = data.exA.map((exercise, index) => {
        const [before, after] = exercise[0].split("___");
        const answer = exercise[1];
        const width = Math.min(360, Math.max(100, [...answer].length * 11 + 24));
        return `<article class="glass-card rounded-xl p-4"><p class="text-base leading-9"><b class="mr-2 text-sky-300">${index + 1}.</b>${esc(before)}<input type="text" class="structured-exA-input mx-1 inline-block max-w-full rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-center text-sky-100" style="width:${width}px" data-answer="${esc(answer)}" aria-label="Odpověď ${index + 1}">${esc(after)}</p><p class="structured-exA-result mt-2 text-sm" aria-live="polite"></p></article>`;
      }).join("");
      get("structuredExBList").innerHTML = data.exB.map((task, index) => `
        <article class="glass-card space-y-3 rounded-xl p-4">
          <h3 class="font-bold text-sky-300">Úkol ${index + 1}</h3>
          <p class="rounded-lg bg-slate-950 p-3"><b>Začínáš:</b> ${esc(B1Gender.t(task.start))}</p>
          <p class="rounded-lg bg-slate-950 p-3"><b>Změň / doplň:</b> ${esc(task.change)}</p>
          <p class="text-slate-300"><b>Úspěšná odpověď:</b> ${esc(task.success)}</p>
          <p class="text-amber-200"><b>Nápověda:</b> ${esc(task.hint)}</p>
          <textarea class="structured-exB-input w-full rounded-lg border border-slate-700 bg-slate-950 p-3 leading-6" rows="2" placeholder="Napiš svou větu…"></textarea>
          <div class="flex flex-wrap items-center gap-2"><button type="button" class="structured-reveal-model rounded-lg bg-slate-800 px-3 py-2 font-bold">Ukázat model</button><span class="structured-exB-feedback text-sm" aria-live="polite"></span></div>
          <p class="structured-model-answer hidden rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 leading-6"><b>Modelová odpověď:</b> ${esc(B1Gender.t(task.model))}</p>
        </article>`).join("");
      if (preserve) {
        app.querySelectorAll(".structured-exA-input").forEach((input, index) => { input.value = previousGapAnswers[index] || ""; });
        app.querySelectorAll(".structured-exB-input").forEach((input, index) => { input.value = previousAnswers[index] || ""; });
      }
      updateProgress();
    };

    const model = get("structuredModelText");
    model.textContent = data.model.replace(/\*\*/g, "");
    B1Marking.setup("structuredModelText", "structuredMarkCount", data.marked, data.markLabel || "slov ve 4. pádě");
    renderVocabulary();
    renderQuiz();
    renderExercises();
    get("structuredSearch").addEventListener("input", renderVocabulary);
    get("structuredCategory").addEventListener("change", renderVocabulary);
    get("structuredVocabGrid").addEventListener("click", event => {
      const button = event.target.closest(".structured-speak");
      if (button) speakText(button.dataset.word, "structuredPracticeStatus");
    });
    get("structuredSpeakModel").addEventListener("click", () => speakText(B1Gender.t(data.model).replace(/\*\*/g, ""), "structuredQuizFeedback"));
    B1Gender.onChange(() => {
      app.querySelectorAll("[data-gender-source]").forEach(element => { element.textContent = B1Gender.t(element.dataset.genderSource); });
      renderVocabulary();
      renderQuiz();
      renderExercises(true);
    });
    get("checkStructuredQuiz").addEventListener("click", () => {
      let answered = 0, correct = 0;
      data.quiz.forEach((_, index) => {
        const selected = app.querySelector(`input[name="structuredQuiz-${index}"]:checked`);
        if (selected) { answered++; if (selected.value === "true") correct++; }
      });
      get("structuredQuizFeedback").textContent = `Správně: ${correct} z ${data.quiz.length}. Zodpovězeno: ${answered} z ${data.quiz.length}.`;
      get("structuredQuizFeedback").className = correct === data.quiz.length ? "text-emerald-300" : "text-amber-300";
    });
    get("resetStructuredQuiz").addEventListener("click", () => {
      app.querySelectorAll('#structuredQuiz input[type="radio"]').forEach(input => { input.checked = false; });
      get("structuredQuizFeedback").textContent = "";
    });
    get("structuredExAList").addEventListener("input", updateProgress);
    get("checkStructuredExA").addEventListener("click", () => {
      let correct = 0;
      app.querySelectorAll(".structured-exA-input").forEach(input => {
        const ok = normalize(input.value) === normalize(input.dataset.answer);
        input.classList.toggle("answer-correct", ok);
        input.classList.toggle("answer-incorrect", !ok);
        const result = input.closest("article").querySelector(".structured-exA-result");
        result.textContent = ok ? "Správně." : "Zkontroluj tvar a větu.";
        result.className = `structured-exA-result mt-2 text-sm ${ok ? "text-emerald-300" : "text-rose-300"}`;
        if (ok) correct++;
      });
      get("structuredExAFeedback").textContent = `Správně: ${correct} z ${data.exA.length}.`;
    });
    get("revealStructuredExA").addEventListener("click", () => {
      app.querySelectorAll(".structured-exA-input").forEach(input => { input.value = input.dataset.answer; input.classList.remove("answer-incorrect"); input.classList.add("answer-correct"); });
      app.querySelectorAll(".structured-exA-result").forEach(result => { result.textContent = "Řešení."; result.className = "structured-exA-result mt-2 text-sm text-sky-300"; });
      updateProgress();
      get("structuredExAFeedback").textContent = "Zobrazena všechna řešení.";
    });
    get("resetStructuredExA").addEventListener("click", () => {
      app.querySelectorAll(".structured-exA-input").forEach(input => { input.value = ""; input.classList.remove("answer-correct", "answer-incorrect"); });
      app.querySelectorAll(".structured-exA-result").forEach(result => { result.textContent = ""; });
      get("structuredExAFeedback").textContent = "";
      updateProgress();
    });
    const exBList = get("structuredExBList");
    exBList.addEventListener("input", updateProgress);
    exBList.addEventListener("click", event => {
      const reveal = event.target.closest(".structured-reveal-model");
      if (!reveal) return;
      const modelAnswer = reveal.closest("article").querySelector(".structured-model-answer");
      modelAnswer.classList.toggle("hidden");
      reveal.textContent = modelAnswer.classList.contains("hidden") ? "Ukázat model" : "Skrýt model";
    });
    exBList.addEventListener("focusout", event => {
      if (!event.target.matches(".structured-exB-input")) return;
      event.target.closest("article").querySelector(".structured-exB-feedback").textContent =
        event.target.value.trim() ? "Odpověď je připravená. Porovnej ji s kritériem; model zobraz až po vlastním pokusu." : "";
    });
    const practice = get("structuredPracticeText");
    const updatePracticeCount = () => {
      const count = practice.value.trim() ? practice.value.trim().split(/\s+/).length : 0;
      get("structuredPracticeWords").textContent = `${count} slov`;
    };
    practice.addEventListener("input", updatePracticeCount);
    get("speakStructuredPractice").addEventListener("click", () => speakText(practice.value, "structuredPracticeStatus"));
    get("clearStructuredPractice").addEventListener("click", () => { practice.value = ""; updatePracticeCount(); });
    const homework = get("structuredHomeworkText");
    const homeworkKey = cfg.homeworkKey || `${NOTES_KEY}_homework`;
    const homeworkStatus = get("structuredHomeworkStatus");
    try { homework.value = localStorage.getItem(homeworkKey) || ""; } catch (error) {
      homeworkStatus.textContent = "Ukládání není dostupné v tomto prohlížeči.";
    }
    const updateHomeworkCount = () => {
      const count = homework.value.trim() ? homework.value.trim().split(/\s+/).length : 0;
      const target = data.homework.wordCount;
      const countLabel = target && /^\d+(?:[–-]\d+)?$/.test(target)
        ? `${count} / ${target} slov`
        : target ? `${count} slov · cíl: ${target}` : `${count} slov`;
      get("structuredHomeworkWords").textContent = countLabel;
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
  };

  const mountFamily = DATA => {
    if (!DATA) {
      console.error("Obsah lekce se nepodařilo načíst.");
      return;
    }

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const normalize = value => String(value).trim().toLocaleLowerCase("cs-CZ")
      .replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ");
    const wordCount = value => value.trim() ? value.trim().split(/\s+/).length : 0;
    const shuffle = values => {
      const result = [...values];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };
    let activeFilter = "all";

    const renderVocab = () => {
      const query = $("#vocabSearch").value.trim().toLocaleLowerCase("cs-CZ");
      const items = DATA.vocab.filter(item => (activeFilter === "all" || item.category === activeFilter) &&
        (query === "" || [item.cz, item.en, item.example, item.note || ""].some(value =>
          value.toLocaleLowerCase("cs-CZ").includes(query))));
      $("#vocabGrid").innerHTML = items.length ? items.map(item => `
        <article class="glass-card rounded-xl p-4">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2"><button class="speak-word rounded-lg bg-sky-900/60 px-2.5 py-2 text-sky-300" data-speak="${esc(item.cz)}" aria-label="Přehrát ${esc(item.cz)}"><i class="fa-solid fa-volume-high"></i></button><h3 class="font-bold">${esc(item.cz)}</h3></div>
            <span class="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">${esc(item.pos)}</span>
          </div>
          <p class="mt-2 text-sm text-sky-300">${esc(item.en)}</p>
          <p class="mt-3 rounded-lg bg-slate-900 p-3 text-sm italic leading-6 text-slate-300">${esc(item.example)}</p>
          ${item.note ? `<p class="mt-2 text-xs leading-5 text-amber-200">${esc(item.note)}</p>` : ""}
        </article>`).join("") : `<p class="col-span-full py-8 text-center text-slate-400">Žádná slovíčka neodpovídají hledání.</p>`;
    };
    const renderModel = () => {
      const model = B1Gender.t(DATA.model);
      $("#modelText").classList.add("whitespace-pre-line");
      $("#modelText").textContent = model.replace(/\*\*/g, "");
      const phrases = (model.match(/\*\*(.*?)\*\*/g) || []).map(piece =>
        piece.slice(2, -2).split(/\s+/).map(word => /^(se|si)$/i.test(word) ? `~${word}` : word).join(" "));
      B1Marking.setup("modelText", "markCount", phrases, "slov v minulém čase");
    };
    const renderQuiz = () => {
      $("#quizList").innerHTML = DATA.quiz.map((item, index) => `
        <fieldset class="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <legend class="px-1 font-bold">${index + 1}. ${esc(B1Gender.t(item.question))}</legend>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">${shuffle(item.options).map((option, optionIndex) => `
            <label class="flex cursor-pointer gap-2 rounded-lg border border-slate-800 p-3 text-sm hover:bg-slate-800">
              <input type="radio" name="quiz-${index}" value="${esc(option)}"><span><b>${String.fromCharCode(65 + optionIndex)}.</b> ${esc(option)}</span>
            </label>`).join("")}</div>
        </fieldset>`).join("");
    };
    const renderExercises = () => {
      $("#exAList").innerHTML = DATA.exercises.map((item, index) => {
        const parts = item.sentence.split("___");
        const width = Math.min(280, Math.max(100, [...item.answer].length * 11 + 20));
        return `<article class="glass-card rounded-xl p-4">
          <p class="text-sm leading-8 sm:text-base"><b class="mr-2 text-sky-300">${index + 1}.</b>${esc(parts[0])}<input class="exA-input mx-1 inline-block max-w-full rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-center text-sky-200" style="width:${width}px" data-answer="${esc(item.answer)}" aria-label="Odpověď ${index + 1}"><span class="mr-1 text-slate-300">(${esc(item.hint)})</span>${esc(parts.slice(1).join("___"))}</p>
          <p class="exA-result mt-2 text-xs" aria-live="polite"></p></article>`;
      }).join("");
      $("#exBList").innerHTML = DATA.upgrades.map((item, index) => `
        <article class="glass-card space-y-3 rounded-xl p-4" data-upgrade="${index}">
          <div class="grid gap-2 text-sm sm:grid-cols-2">
            <p class="rounded-lg bg-slate-900 p-3"><b class="text-sky-300">Začínáš:</b> ${esc(B1Gender.t(item.start))}</p>
            <p class="rounded-lg bg-slate-900 p-3"><b class="text-sky-300">Změň / doplň:</b> ${esc(item.change)}</p>
          </div>
          <p class="text-sm text-slate-300"><b>Úspěšná odpověď:</b> ${esc(item.success)}</p>
          <p class="text-xs text-amber-200"><b>Nápověda:</b> ${esc(item.hint)}</p>
          <textarea class="upgrade-input w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm leading-6" rows="2" placeholder="Napiš svou rozšířenou větu…"></textarea>
          <div class="flex flex-wrap items-center gap-2"><button type="button" class="reveal-model rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold">Ukázat model</button><span class="upgrade-result text-xs" aria-live="polite"></span></div>
          <p class="upgrade-model hidden rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 text-sm leading-6"><b>Modelová odpověď:</b> ${esc(B1Gender.t(item.model))}</p>
        </article>`).join("");
      updateExAProgress();
      updateExBProgress();
    };
    const updateExAProgress = () => {
      const inputs = $$(".exA-input");
      $("#exAProgress").textContent = `Vyplněno ${inputs.filter(input => input.value.trim()).length} z ${inputs.length}`;
    };
    const checkExA = () => {
      let correct = 0;
      $$(".exA-input").forEach(input => {
        const ok = normalize(input.value) === normalize(input.dataset.answer);
        input.classList.toggle("answer-correct", ok);
        input.classList.toggle("answer-incorrect", !ok);
        const result = input.closest("article").querySelector(".exA-result");
        result.textContent = ok ? "Správně." : "Zkontroluj tvar a nápovědu.";
        result.className = `exA-result mt-2 text-xs ${ok ? "text-emerald-300" : "text-rose-300"}`;
        if (ok) correct++;
      });
      $("#exAFeedback").textContent = `Správně: ${correct} z ${$$(".exA-input").length}.`;
    };
    const updateExBProgress = () => {
      const fields = $$(".upgrade-input");
      $("#exBProgress").textContent = `Hotovo ${fields.filter(field => field.value.trim()).length} z ${fields.length}`;
    };

    renderVocab();
    renderModel();
    renderQuiz();
    renderExercises();
    $("#vocabSearch").addEventListener("input", renderVocab);
    $$(".filter-btn").forEach(button => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$(".filter-btn").forEach(item => item.className =
        `filter-btn rounded-lg px-2 py-2 text-xs ${item === button ? "bg-sky-700" : "bg-slate-800"}`);
      renderVocab();
    }));
    document.addEventListener("click", event => {
      const button = event.target.closest("[data-speak]");
      if (button) speakText(button.dataset.speak);
    });
    $("#speakModel").addEventListener("click", () => speakText(B1Gender.t(DATA.model).replace(/\*\*/g, "")));
    B1Gender.onChange(() => { renderModel(); renderQuiz(); });
    $("#checkQuiz").addEventListener("click", () => {
      let correct = 0;
      let answered = 0;
      DATA.quiz.forEach((question, index) => {
        const selected = $(`input[name="quiz-${index}"]:checked`);
        if (selected) { answered++; if (selected.value === question.correct) correct++; }
      });
      $("#quizFeedback").textContent = answered < DATA.quiz.length
        ? `Odpověděl/a jsi na ${answered} ze 3 otázek. Správně zatím ${correct}.`
        : `Výsledek: ${correct} ze 3 správně.`;
      $("#quizFeedback").className = `text-sm ${correct === 3 && answered === 3 ? "text-emerald-300" : "text-amber-200"}`;
    });
    $("#resetQuiz").addEventListener("click", () => {
      $$('input[type="radio"]').forEach(input => { input.checked = false; });
      $("#quizFeedback").textContent = "";
    });
    $("#checkExA").addEventListener("click", checkExA);
    $("#revealExA").addEventListener("click", () => {
      $$(".exA-input").forEach(input => { input.value = input.dataset.answer; input.classList.remove("answer-incorrect"); input.classList.add("answer-correct"); });
      $$(".exA-result").forEach(result => { result.textContent = "Řešení."; result.className = "exA-result mt-2 text-xs text-sky-300"; });
      updateExAProgress();
      $("#exAFeedback").textContent = "Zobrazena všechna řešení.";
    });
    $("#resetExA").addEventListener("click", () => {
      $$(".exA-input").forEach(input => { input.value = ""; input.classList.remove("answer-correct", "answer-incorrect"); });
      $$(".exA-result").forEach(result => { result.textContent = ""; });
      updateExAProgress();
      $("#exAFeedback").textContent = "";
    });
    $("#exAList").addEventListener("input", updateExAProgress);
    $("#checkExB").addEventListener("click", () => {
      const fields = $$(".upgrade-input");
      fields.forEach(field => {
        field.closest("article").querySelector(".upgrade-result").textContent = field.value.trim()
          ? "Návrh zapsán — porovnej ho s kritériem a modelovou odpovědí."
          : "Nejdřív napiš svou odpověď.";
      });
      $("#exBFeedback").textContent = `Vyplněno ${fields.filter(field => field.value.trim()).length} z ${fields.length}. Jde o vlastní tvorbu, ne automatické známkování.`;
    });
    $("#resetExB").addEventListener("click", () => {
      $$(".upgrade-input").forEach(field => { field.value = ""; });
      $$(".upgrade-result").forEach(result => { result.textContent = ""; });
      $$(".upgrade-model").forEach(model => model.classList.add("hidden"));
      updateExBProgress();
      $("#exBFeedback").textContent = "";
    });
    $("#exBList").addEventListener("input", updateExBProgress);
    $("#exBList").addEventListener("click", event => {
      const button = event.target.closest(".reveal-model");
      if (button) button.closest("article").querySelector(".upgrade-model").classList.toggle("hidden");
    });
    $("#speakPractice").addEventListener("click", () => speakText($("#practiceText").value, "practiceStatus"));
    $("#clearPractice").addEventListener("click", () => {
      $("#practiceText").value = "";
      $("#practiceCount").textContent = "0 slov";
      $("#practiceStatus").textContent = "";
    });
    $("#practiceText").addEventListener("input", () =>
      $("#practiceCount").textContent = `${wordCount($("#practiceText").value)} slov`);
    const homework = $("#homeworkDraft");
    const homeworkKey = `${NOTES_KEY}_homework`;
    try { homework.value = localStorage.getItem(homeworkKey) || ""; }
    catch (error) { $("#homeworkStatus").textContent = "Uložené údaje nejsou dostupné."; }
    const updateHomeworkCount = () => $("#homeworkCount").textContent = `${wordCount(homework.value)} slov`;
    updateHomeworkCount();
    homework.addEventListener("input", () => {
      updateHomeworkCount();
      try {
        localStorage.setItem(homeworkKey, homework.value);
        $("#homeworkStatus").textContent = "Uloženo v tomto prohlížeči.";
      } catch (error) {
        $("#homeworkStatus").textContent = "Uložení se nezdařilo; zkontroluj nastavení úložiště prohlížeče.";
      }
    });
    $("#clearHomework").addEventListener("click", () => {
      homework.value = "";
      updateHomeworkCount();
      try {
        localStorage.setItem(homeworkKey, "");
        $("#homeworkStatus").textContent = "Uloženo v tomto prohlížeči.";
      }
      catch (error) { $("#homeworkStatus").textContent = "Uložení se nezdařilo; zkontroluj nastavení úložiště prohlížeče."; }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("b1Header")) mount();
    setupNotes();
    setupTabs();
    setupFooter();
  });

  window.B1Lesson = { mount, mountStructured, mountFamily, config: cfg, notesKey: NOTES_KEY, speakText };
})();

// Student-driven grammar marking: select words, see "selected / total", then check.
// Phrases are matched word by word; a leading "~" marks a context word that is not a target.
window.B1Marking = (() => {
  const WORD = /([A-Za-zÀ-ž0-9]+(?:[’'-][A-Za-zÀ-ž0-9]+)*)/;
  const norm = text => text.toLocaleLowerCase("cs-CZ");
  const HINT = "Nejdřív označte slova, potom stiskněte „Zkontrolovat“.";

  const unwrapHighlights = container => {
    container.querySelectorAll("strong, mark, b").forEach(node => {
      if (!/text-(sky|amber|emerald|yellow)-\d/.test(node.className)) return;
      node.replaceWith(...node.childNodes);
    });
    container.normalize();
  };

  const tokenize = container => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue.trim() && !node.parentElement.closest("[data-no-mark]")) nodes.push(node);
    }
    const words = [];
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(WORD).forEach((part, index) => {
        if (!part) return;
        if (index % 2 === 1) {
          const span = document.createElement("span");
          span.className = "genitive-mark-word";
          span.textContent = part;
          span.setAttribute("role", "button");
          span.setAttribute("aria-pressed", "false");
          span.tabIndex = 0;
          words.push(span);
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      node.replaceWith(fragment);
    });
    return words;
  };

  const markTargets = (words, phrases) => {
    const tokens = words.map(word => norm(word.textContent));
    phrases.forEach(phrase => {
      const parts = phrase.split(/\s+/).map(part => ({ context: part.startsWith("~"), text: norm(part.replace(/^~/, "")) }));
      for (let i = 0; i <= tokens.length - parts.length; i++) {
        if (parts.every((part, offset) => tokens[i + offset] === part.text)) {
          parts.forEach((part, offset) => { if (!part.context) words[i + offset].dataset.correct = "true"; });
        }
      }
    });
  };

  const buildControls = (countEl, container) => {
    const row = countEl.parentElement;
    if (row.dataset.markControls) return;
    row.dataset.markControls = "true";
    row.className = "flex flex-wrap items-center gap-2";
    row.innerHTML = "";
    const check = document.createElement("button");
    check.type = "button";
    check.dataset.markAction = "check";
    check.className = "rounded-lg bg-sky-700 px-3 py-1.5 font-bold text-white hover:bg-sky-600";
    check.textContent = "Zkontrolovat";
    const clear = document.createElement("button");
    clear.type = "button";
    clear.dataset.markAction = "clear";
    clear.className = "rounded-lg bg-slate-800 px-3 py-1.5 text-slate-200 hover:bg-slate-700";
    clear.textContent = "Zrušit označení";
    row.append(countEl, check, clear);

    // Teacher-read texts: hide the text so a student does not see it on a shared screen
    const hide = document.createElement("button");
    hide.type = "button";
    hide.className = "rounded-lg border border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-800";
    hide.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Skrýt text (čte učitel)';
    const placeholder = document.createElement("div");
    placeholder.className = "hidden rounded-xl border border-dashed border-slate-600 bg-slate-900/60 p-6 text-center text-slate-300";
    placeholder.textContent = "Text je skrytý. Učitel čte nahlas, student poslouchá.";
    container.parentElement.insertBefore(placeholder, container);
    hide.addEventListener("click", () => {
      const hidden = container.classList.toggle("hidden");
      placeholder.classList.toggle("hidden", !hidden);
      hide.innerHTML = hidden ? '<i class="fa-solid fa-eye"></i> Zobrazit text' : '<i class="fa-solid fa-eye-slash"></i> Skrýt text (čte učitel)';
    });
    row.append(hide);

    const extras = document.createElement("div");
    extras.className = "space-y-2 text-sm";
    extras.innerHTML = `<p class="mark-feedback text-slate-300" aria-live="polite"></p>
      <div class="mark-legend" aria-label="Legenda">
        <span style="--legend-color:#fbbf24">žlutá = vaše označení</span>
        <span style="--legend-color:#10b981">zelená = správně</span>
        <span style="--legend-color:#ef4444">červená = chybně</span>
        <span style="--legend-color:#f97316">oranžová = chybělo</span>
      </div>`;
    container.parentElement.insertBefore(extras, container);
  };

  const setup = (containerId, countId, phrasesRaw, label = "slov ve 2. pádě") => {
    const container = document.getElementById(containerId);
    const countEl = document.getElementById(countId);
    if (!container || !countEl) return;
    // Keep the untouched source so the text can be rebuilt when the speaker gender changes
    if (!container.querySelector(".genitive-mark-word")) container._b1src = container.innerHTML;
    if (container._b1src === undefined) container._b1src = container.innerHTML;
    if (!container._b1gender) {
      container._b1gender = true;
      window.B1Gender.onChange(() => setup(containerId, countId, phrasesRaw, label));
    }
    container.innerHTML = window.B1Gender.t(container._b1src);
    const phrases = phrasesRaw.map(phrase => window.B1Gender.t(phrase));
    unwrapHighlights(container);
    const words = tokenize(container);
    markTargets(words, phrases);
    const total = words.filter(word => word.dataset.correct === "true").length;

    buildControls(countEl, container);
    const row = countEl.parentElement;
    const feedback = container.parentElement.querySelector(".mark-feedback");
    const setFeedback = (text, tone) => {
      feedback.className = `mark-feedback ${tone}`;
      feedback.textContent = text;
    };
    const isSelected = word => word.getAttribute("aria-pressed") === "true";
    const clearResults = () => words.forEach(word => word.classList.remove("mark-correct", "mark-incorrect", "mark-missed"));
    const refresh = () => { countEl.textContent = `Označeno: ${words.filter(isSelected).length} / ${total} ${label}`; };

    row.querySelector('[data-mark-action="check"]').onclick = () => {
      let correct = 0, wrong = 0, missed = 0;
      clearResults();
      words.forEach(word => {
        const target = word.dataset.correct === "true";
        if (isSelected(word) && target) { word.classList.add("mark-correct"); correct++; }
        else if (isSelected(word)) { word.classList.add("mark-incorrect"); wrong++; }
        else if (target) { word.classList.add("mark-missed"); missed++; }
      });
      if (correct === total && wrong === 0) setFeedback(`Výborně! Správně jste označili všech ${total} slov.`, "text-emerald-300");
      else setFeedback(`Správně: ${correct} / ${total}. Chybí (oranžově): ${missed}. Navíc (červeně): ${wrong}.`, "text-amber-300");
    };
    row.querySelector('[data-mark-action="clear"]').onclick = () => {
      words.forEach(word => word.setAttribute("aria-pressed", "false"));
      clearResults();
      setFeedback(HINT, "text-slate-300");
      refresh();
    };

    words.forEach(word => {
      const toggle = () => {
        word.setAttribute("aria-pressed", String(!isSelected(word)));
        clearResults();
        setFeedback(HINT, "text-slate-300");
        refresh();
      };
      word.addEventListener("click", toggle);
      word.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); }
      });
    });
    setFeedback(HINT, "text-slate-300");
    refresh();
  };

  return { setup };
})();
