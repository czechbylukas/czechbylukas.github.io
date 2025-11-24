document.addEventListener("DOMContentLoaded", () => {
  const languages = [
    { code: "en", flag: "/images/flags/en.png" },
    { code: "cz", flag: "/images/flags/cz.png" },
    { code: "es", flag: "/images/flags/es.png" },
    { code: "de", flag: "/images/flags/de.png" }
  ];

  const container = document.getElementById("language-selector-container");
  if (!container) return;

  // Load saved language or default
  let currentLang = localStorage.getItem("selectedLanguage") || "en";

  // Create current flag button
  const btn = document.createElement("button");
  btn.id = "current-lang-btn";
  btn.type = "button";
  btn.style.background = "none";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  container.appendChild(btn);

  // Create dropdown list
  const dropdown = document.createElement("ul");
  dropdown.id = "lang-dropdown";
  container.appendChild(dropdown);

  function updateCurrentFlag() {
    const current = languages.find(l => l.code === currentLang);
    btn.innerHTML = `<img src="${current.flag}" class="flag-icon" alt="${current.code}">`;
  }

  function buildDropdown() {
    dropdown.innerHTML = "";
    languages.forEach(l => {
      if (l.code !== currentLang) {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${l.flag}" class="flag-icon" alt="${l.code}">`;
        li.dataset.lang = l.code;
        dropdown.appendChild(li);
      }
    });
    dropdown.style.display = "none";
  }

  async function applyLanguage(lang, reload = false) {
    currentLang = lang;
    localStorage.setItem("selectedLanguage", lang);
    document.documentElement.setAttribute("lang", lang);
    updateCurrentFlag();
    buildDropdown();

    // Optional: load translations immediately if needed
    if (typeof loadTranslations === "function") {
      await loadTranslations(lang);
    }

    // Let other scripts know
    document.dispatchEvent(new Event("languageChanged"));

    // Re-render vocab table if relevant
    if (typeof renderVocab === "function") renderVocab();

    // 🔄 If reload requested (user clicked a new language), reload page
    if (reload) {
      // Small timeout ensures localStorage update completes before reload
      setTimeout(() => location.reload(), 150);
    }
  }

  // Initialize selector
  applyLanguage(currentLang, false);

  // Toggle dropdown
  btn.addEventListener("click", e => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Select language from dropdown
  dropdown.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const newLang = li.dataset.lang;

    // ✅ Apply language and reload page
    applyLanguage(newLang, true);
  });


  // Close dropdown clicking outside
  document.addEventListener("click", e => {
    if (!container.contains(e.target)) dropdown.style.display = "none";
  });
});
