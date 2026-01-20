// -----------------------------
// practice.js - FIXED VERSION
// -----------------------------

// 1. GLOBAL VARIABLES
// -----------------------------
let lang = localStorage.getItem("selectedLanguage") || "en";
let currentIndex = 0;
let originalOrder = []; 

// Flashcard elements
const englishCard = document.getElementById("englishCard");
const czechCard = document.getElementById("czechCard");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("progressText");

// -----------------------------
// 2. HELPER: Get translation
// -----------------------------
function getTranslation(item) {
  switch(lang) {
    case "de": return item.german;
    case "es": return item.spanish;
    default:   return item.english;
  }
}

// -----------------------------
// 3. RENDER FLASHCARDS
// -----------------------------
function renderCard(index) {
  // Safety check: ensure vocab exists
  if (!typeof vocab === 'undefined' || !vocab || vocab.length === 0) return;

  const item = vocab[index];

  // Left card
  if (englishCard) englishCard.textContent = getTranslation(item);

  // Right card
  if (czechCard) {
      const clickMsg = (typeof translations !== 'undefined' && translations.messages?.clickToShow) 
                       ? translations.messages.clickToShow 
                       : "Click to show Czech";
      
      czechCard.textContent = clickMsg;
      czechCard.classList.add("click-to-show");
  }

  // Update progress
  if (progressText) progressText.textContent = `${index + 1} / ${vocab.length}`;
  if (progressBar) progressBar.style.width = ((index + 1) / vocab.length * 100) + "%";
}

// -----------------------------
// 4. CLICK TO REVEAL CZECH
// -----------------------------
if (czechCard) {
    czechCard.addEventListener("click", () => {
      if (!vocab || !vocab[currentIndex]) return;
      const item = vocab[currentIndex];
      czechCard.textContent = item.czech + (item.pronunciation ? ` (${item.pronunciation})` : "");
      czechCard.classList.remove("click-to-show");
    });
}

// -----------------------------
// 5. SHUFFLE BUTTON LOGIC (UPDATED)
// -----------------------------
function initShuffleButton() {
  const vocabContainer = document.querySelector('.vocab-container');

  // 1. Create the button if it doesn't exist
  if (vocabContainer && !document.getElementById("shuffleCheckbox")) {
    
    const shuffleDiv = document.createElement('div');
    shuffleDiv.style.cssText = "text-align: center; margin-bottom: 15px; font-family: sans-serif;";
    
    // We add a <span> around the text so we can target it later to update the language
    shuffleDiv.innerHTML = `
      <label style="cursor: pointer; font-size: 1.1rem;">
        <input type="checkbox" id="shuffleCheckbox" style="transform: scale(1.2); margin-right: 8px;"> 
        <span id="shuffleTextLabel">🔀 Shuffle Randomly</span>
      </label>
    `;

    vocabContainer.parentNode.insertBefore(shuffleDiv, vocabContainer);

    // Add functionality
    const checkbox = document.getElementById("shuffleCheckbox");
    checkbox.addEventListener("change", () => {
      if (typeof vocab === 'undefined' || !vocab) return;

      if (originalOrder.length === 0) originalOrder = [...vocab];

      if (checkbox.checked) {
        const shuffled = [...originalOrder];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        vocab.length = 0;
        vocab.push(...shuffled);
      } else {
        vocab.length = 0;
        vocab.push(...originalOrder);
      }
      currentIndex = 0;
      renderCard(currentIndex);
    });
  }

  // 2. Function to update the text
  const updateShuffleText = () => {
    const label = document.getElementById("shuffleTextLabel");
    if (label && typeof translations !== 'undefined' && translations.messages?.shuffle) {
        label.textContent = translations.messages.shuffle;
    }
  };

  // 3. Try to update immediately (if translations are already loaded)
  updateShuffleText();

  // 4. Listen for the "languageChanged" event from your language-selector.js
  // This ensures that if the translations arrive LATER, the text still updates.
  document.addEventListener("languageChanged", () => {
      updateShuffleText();
      // Also re-render the card to update the "Click to show" text
      renderCard(currentIndex);
  });
}

// -----------------------------
// 6. NAVIGATION BUTTONS
// -----------------------------
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if(currentIndex > 0) currentIndex--;
      renderCard(currentIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if(typeof vocab !== 'undefined' && currentIndex < vocab.length - 1) currentIndex++;
      renderCard(currentIndex);
    });
}

// Arrow keys
document.addEventListener("keydown", (event) => {
  if (typeof vocab === 'undefined' || !vocab) return;

  if (event.key === "ArrowLeft") {
    if (currentIndex > 0) {
      currentIndex--;
      renderCard(currentIndex);
    }
  } else if (event.key === "ArrowRight") {
    if (currentIndex < vocab.length - 1) {
      currentIndex++;
      renderCard(currentIndex);
    }
  }
});

// -----------------------------
// 7. INITIALIZATION
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  initShuffleButton();
  renderCard(currentIndex);
});