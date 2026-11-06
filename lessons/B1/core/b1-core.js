/*
 * Shared logic for every B1 lesson page. Edit here to change all lessons at once.
 *
 * A lesson page only provides its own content plus a config block, e.g.
 *   <script>window.B1_LESSON = { topic: "Cestování", number: 3, title: "Cesta do zahraničí",
 *            icon: "fa-plane-departure", notesKey: "cz_b1_l3_notes", tabs: { exC: "Role play" } };</script>
 *   <script src="../core/b1-core.js"></script>
 * and calls B1Lesson.mount() directly after <body>.
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

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("b1Header")) mount();
    setupNotes();
    setupTabs();
    setupFooter();
  });

  window.B1Lesson = { mount, config: cfg, notesKey: NOTES_KEY, speakText };
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
