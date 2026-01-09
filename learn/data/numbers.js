// words with translations (for Hangman, Flashcards, Drag & Drop, etc.)
export const numbersData = {
  A1: [
    { cs: "jeden", en: "one", de: "eins", es: "uno" },
    { cs: "dva", en: "two", de: "zwei", es: "dos" },
    { cs: "tři", en: "three", de: "drei", es: "tres" },
    { cs: "čtyři", en: "four", de: "vier", es: "cuatro" },
    { cs: "pět", en: "five", de: "fünf", es: "cinco" },
    { cs: "šest", en: "six", de: "sechs", es: "seis" },
    { cs: "sedm", en: "seven", de: "sieben", es: "siete" },
    { cs: "osm", en: "eight", de: "acht", es: "ocho" },
    { cs: "devět", en: "nine", de: "neun", es: "nueve" },
    { cs: "deset", en: "ten", de: "zehn", es: "diez" }
  ],
  A2: [
    { cs: "jedenáct", en: "eleven", de: "elf", es: "once" },
    { cs: "dvanáct", en: "twelve", de: "zwölf", es: "doce" },
    { cs: "třináct", en: "thirteen", de: "dreizehn", es: "trece" },
    { cs: "čtrnáct", en: "fourteen", de: "vierzehn", es: "catorce" },
    { cs: "patnáct", en: "fifteen", de: "fünfzehn", es: "quince" },
    { cs: "šestnáct", en: "sixteen", de: "sechzehn", es: "dieciséis" },
    { cs: "sedmnáct", en: "seventeen", de: "siebzehn", es: "diecisiete" },
    { cs: "osmnáct", en: "eighteen", de: "achtzehn", es: "dieciocho" },
    { cs: "devatenáct", en: "nineteen", de: "neunzehn", es: "diecinueve" },
    { cs: "dvacet", en: "twenty", de: "zwanzig", es: "veinte" }
  ]
};

// fill-in-the-gap / multiple choice questions
export const numbersQuestions = {
  A1: [
    { text: "Mám {{gap}} mobil (1).", answers: ["jeden"] },
    { text: "Koupil jsem {{gap}} rohlíky (2).", answers: ["dva"] },
    { text: "Vidím {{gap}} kočky (3).", answers: ["tři"] },
    { text: "Máme {{gap}} psy (4).", answers: ["čtyři"] },
    { text: "Na stole je {{gap}} knih (5).", answers: ["pět"] },
    { text: "V krabici je {{gap}} míčů (6).", answers: ["šest"] },
    { text: "Na zahradě roste {{gap}} stromů (7).", answers: ["sedm"] },
    { text: "Mám {{gap}} přátel (8).", answers: ["osm"] },
    { text: "Na stěně visí {{gap}} obrazů (9).", answers: ["devět"] },
    { text: "V kuchyni je {{gap}} židlí (10).", answers: ["deset"] }
  ],
  A2: [
    { text: "Mám {{gap}} dětí (11).", answers: ["jedenáct"] },
    { text: "V obchodě koupil {{gap}} pomeranče (12).", answers: ["dvanáct"] }
  ]
};
