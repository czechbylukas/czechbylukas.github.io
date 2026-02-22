let translations = {};
let currentLang = localStorage.getItem("selectedLanguage") || "en";

async function loadTranslations(lang) {
  try {
    const res = await fetch(`/data/translations/translations_${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    translations = await res.json();
    currentLang = lang;
    applyTranslations();
  } catch (err) {
    console.error(`Failed to load translations for ${lang}:`, err);
  }
}

function applyTranslations() {
  if (!translations || Object.keys(translations).length === 0) return;

  // ---------- PAGE TITLE ----------


  // ---------- HEADINGS ----------
  const idsToTranslate = [
    "heading-welcome",
    "heading-mainPageText",
    "heading-topics",
    "heading-vocab",
    "heading-vocabList",
    "heading-exercise",
    "heading-exList",
    "heading-tests",
    "heading-testList",
    "link-ex-useful-phrases",
    "link-ex-past-tense",
    "link-ex-question-generator",
    "link-ex-question-words",
    "link-ex-verbs-a",
    "link-ex-verbs-i",
    "link-ex-verbs-e",
    "link-ex-genitive",
    "link-ex-accusative",
    "link-ex-instrumental",
    "link-ex-dative",
    "link-ex-locative",
    "link-ex-prefixes",
    "link-ex-perfective-imperfective",
    "link-ex-future",
    "link-ex-adverbs-adjectives",
    "link-ex-pronouns",
    "link-ex-numbers",
    "link-test-useful-phrases",
    "link-test-past-tense",
    "link-test-question-words",
    "link-test-verbs-a",
    "link-test-verbs-i",
    "link-test-verbs-e",
    "link-test-genitive",
    "link-test-accusative",
    "link-test-instrumental",
    "link-test-dative",
    "link-test-locative",
    "link-test-prefixes",
    "link-test-perfective-imperfective",
    "link-test-adverbs-adjectives",
    "link-test-pronouns",
    "link-test-numbers",
    "heading-vocabTitle",
    "heading-practice",
    "heading-test-title",
    "heading-test-instructions",


    "link-ex-osobni-udaje",
    "link-ex-nakupovani",
    "link-ex-denni-rezim",
    "link-ex-cestovani",
    "link-ex-jidlo-piti",
    "link-ex-prace",
    "link-ex-konicky",
    "link-ex-bydleni",
    "link-ex-urady",
    "link-ex-vzdelavani",
    "link-ex-pocasi",
    "link-ex-zdravi",
    "link-ex-kontakt",
    "heading-vocabSectionGrammar",
    "heading-vocabA2Section",
    "text-more-present",
    "text-more-cases",
    "text-more-prefixes",
    "text-more-future",
    "link-ex-allcases",
    "link-pres-easy",
    "link-pres-mid",
    "link-pres-hard",
    "link-past-pres-multi",
    "link-cases-easy",
    "link-cases-mid",
    "link-cases-hard",
    "link-prefix-mid",
    "link-prefix-hard",
    "link-future-mid"

  ];

  idsToTranslate.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (translations[id]) {
        el.textContent = translations[id];
      } else if (id === "heading-practice" && translations["heading-useful-phrases"]) {
        el.textContent = translations["heading-useful-phrases"];
      }
    }
  });

  // ---------- MENU ----------
  const menuItems = ["home", "vocabulary", "practicing", "presentations", "testing", "support"];
  menuItems.forEach(item => {
    const el = document.getElementById(`menu-${item}`);
    if (el && translations.menu && translations.menu[item]) {
      el.textContent = translations.menu[item];
    }
  });

  // ---------- VOCAB / PRACTICE / TEST BUTTONS ----------
  const btnMap = {
    "btn-practice": "practice",
    "btn-vocab": "vocabulary",
    "btn-test": "test",
    "btn-home": "home",
    "prevBtn": "prev",
    "nextBtn": "next",
    "btn-exerciseList": "exerciseList",
    "btn-vocabList": "vocabList"
  };

  if (translations.buttons) {
    for (const [id, key] of Object.entries(btnMap)) {
      const el = document.getElementById(id);
      if (el && translations.buttons[key]) el.textContent = translations.buttons[key];
    }
  }

  // ---------- TABLE HEADERS ----------
  const tableCzech = document.getElementById("table-czech");
  const tablePronunciation = document.getElementById("table-pronunciation");
  const tableEnglish = document.getElementById("table-english");

  if (translations.tableHeadings) {
    if (tableCzech && translations.tableHeadings.czech)
      tableCzech.textContent = translations.tableHeadings.czech;
    if (tablePronunciation && translations.tableHeadings.pronunciation)
      tablePronunciation.textContent = translations.tableHeadings.pronunciation;
    if (tableEnglish && translations.tableHeadings.english)
      tableEnglish.textContent = translations.tableHeadings.english;
  }

  // ---------- FOOTER ----------
  const footerText = document.getElementById("footer-text");
  const footerLink = document.getElementById("footer-link");
  if (footerText) {
    if (translations["footer-text"]) {
      if (footerText.childNodes && footerText.childNodes.length > 0 && footerLink) {
        footerText.childNodes[0].nodeValue = translations["footer-text"] + " ";
      } else {
        footerText.textContent = translations["footer-text"];
        if (footerLink && translations["footer-link"]) footerLink.textContent = translations["footer-link"];
      }
    }
    if (footerLink && translations["footer-link"]) footerLink.textContent = translations["footer-link"];
  }

  // ---------- CALL PAGE-SPECIFIC FUNCTIONS ----------
  if (typeof renderVocab === "function") {
    try { renderVocab(); } catch (e) { }
  }
}

// Load translations for saved language on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("selectedLanguage") || currentLang || "en";
  loadTranslations(saved);
});
