// Use this for checking answers (Relaxed mode: actually strips accents)
export function normalize(str) {
    if (!str) return "";
    return str
        .trim()
        .toLowerCase()
        .normalize("NFD")             // Decompose characters (e.g., č becomes c + ˇ)
        .replace(/[\u0300-\u036f]/g, "") // Remove the accent marks
        .normalize("NFC");            // Put it back together
}

// Use this for UI logic (Keeps accents for display/regex matching)
export function cleanForUI(text) {
  if (!text) return "";
  return text.toLowerCase().normalize("NFC").trim();
}