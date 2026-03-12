// Use this for checking answers (Easy mode: ignores accents)
export function normalize(text) {
  if (!text) return "";
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Use this for UI logic (Hard mode: keeps accents for Regex/Display)
export function cleanForUI(text) {
  if (!text) return "";
  return text.toLowerCase().normalize("NFC").trim();
}