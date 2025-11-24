// data/level_a2/9_health.js
const vocab = [
  {
    czech:   "tělo",
    english: "body",
    spanish: "cuerpo",
    german:  "Körper"
  },
  {
    czech:   "hlava",
    english: "head",
    spanish: "cabeza",
    german:  "Kopf"
  },
  {
    czech:   "oko/oči",
    english: "eye/eyes",
    spanish: "ojo/ojos",
    german:  "Auge/Augen"
  },
  {
    czech:   "nos",
    english: "nose",
    spanish: "nariz",
    german:  "Nase"
  },
  {
    czech:   "ucho/uši",
    english: "ear/ears",
    spanish: "oreja/orejas",
    german:  "Ohr/Ohren"
  },
  {
    czech:   "ústa, pusa",
    english: "mouth",
    spanish: "boca",
    german:  "Mund"
  },
  {
    czech:   "tvář, obličej",
    english: "cheek (of face), face",
    spanish: "mejilla, cara",
    german:  "Wange, Gesicht"
  },
  {
    czech:   "zub",
    english: "tooth",
    spanish: "diente",
    german:  "Zahn"
  },
  {
    czech:   "jazyk",
    english: "language, tongue",
    spanish: "lengua",
    german:  "Zunge"
  },
  {
    czech:   "krk",
    english: "neck, throat",
    spanish: "cuello, garganta",
    german:  "Hals"
  },
  {
    czech:   "ruka",
    english: "hand, arm",
    spanish: "mano, brazo",
    german:  "Hand, Arm"
  },
  {
    czech:   "prst",
    english: "finger",
    spanish: "dedo",
    german:  "Finger"
  },
  {
    czech:   "záda",
    english: "back (anatomy)",
    spanish: "espalda",
    german:  "Rücken"
  },
  {
    czech:   "srdce",
    english: "heart",
    spanish: "corazón",
    german:  "Herz"
  },
  {
    czech:   "břicho",
    english: "belly",
    spanish: "abdomen, vientre",
    german:  "Bauch"
  },
  {
    czech:   "žaludek",
    english: "stomach",
    spanish: "estómago",
    german:  "Magen"
  },
  {
    czech:   "kost",
    english: "bone",
    spanish: "hueso",
    german:  "Knochen"
  },
  {
    czech:   "kůže",
    english: "skin, leather",
    spanish: "piel, cuero",
    german:  "Haut, Leder"
  },
  {
    czech:   "bolest",
    english: "pain",
    spanish: "dolor",
    german:  "Schmerz"
  },
  {
    czech:   "rýma",
    english: "runny nose",
    spanish: "resfriado, secreción nasal",
    german:  "Schnupfen"
  },
  {
    czech:   "kašel",
    english: "cough",
    spanish: "tos",
    german:  "Husten"
  },
  {
    czech:   "průjem",
    english: "diarrhea",
    spanish: "diarrea",
    german:  "Durchfall"
  },
  {
    czech:   "zácpa",
    english: "constipation, traffic jam",
    spanish: "estreñimiento, atasco",
    german:  "Verstopfung, Stau"
  },
  {
    czech:   "teplota/horečka",
    english: "temperature/fever",
    spanish: "temperatura/fiebre",
    german:  "Temperatur/Fieber"
  },
  {
    czech:   "tlak",
    english: "pressure",
    spanish: "presión",
    german:  "Druck"
  },
  {
    czech:   "bolet + akuzativ zájmena/substantiva + nominativ",
    english: "to hurt (whom) (what)",
    spanish: "doler (a quién, qué)",
    german:  "weh tun (wem, was)"
  },
  {
    czech:   "zvracet",
    english: "to vomit",
    spanish: "vomitar",
    german:  "erbrechen"
  },
  {
    czech:   "kašlat",
    english: "to cough",
    spanish: "toser",
    german:  "husten"
  },
  {
    czech:   "dýchat",
    english: "to breathe",
    spanish: "respirar",
    german:  "atmen"
  },
  {
    czech:   "unavený",
    english: "tired",
    spanish: "cansado",
    german:  "müde"
  },
  {
    czech:   "nemocný",
    english: "sick",
    spanish: "enfermo",
    german:  "krank"
  },
  {
    czech:   "zdravý",
    english: "healthy",
    spanish: "saludable",
    german:  "gesund"
  },
  {
    czech:   "nehoda",
    english: "accident",
    spanish: "accidente",
    german:  "Unfall"
  },
  {
    czech:   "rána",
    english: "wound",
    spanish: "herida",
    german:  "Wunde"
  },
  {
    czech:   "zranit se kde",
    english: "to injure self (where)",
    spanish: "lastimarse (dónde)",
    german:  "sich verletzen (wo)"
  },
  {
    czech:   "nemoc",
    english: "illness, disease",
    spanish: "enfermedad",
    german:  "Krankheit"
  },
  {
    czech:   "operace",
    english: "surgery",
    spanish: "operación",
    german:  "Operation"
  },
  {
    czech:   "úraz",
    english: "injury",
    spanish: "lesión",
    german:  "Verletzung"
  },
  {
    czech:   "krev",
    english: "blood",
    spanish: "sangre",
    german:  "Blut"
  },
  {
    czech:   "vyšetření, kontrola",
    english: "examination, check up",
    spanish: "examen, revisión",
    german:  "Untersuchung, Kontrolle"
  },
  {
    czech:   "lék",
    english: "medicine",
    spanish: "medicina",
    german:  "Medikament"
  },
  {
    czech:   "alergie",
    english: "allergy",
    spanish: "alergia",
    german:  "Allergie"
  },
  {
    czech:   "dieta",
    english: "diet",
    spanish: "dieta",
    german:  "Diät"
  },
  {
    czech:   "ordinační hodiny",
    english: "working hours (of a doctor)",
    spanish: "horario de consulta",
    german:  "Sprechzeiten"
  },
  {
    czech:   "ordinovat kde, kdy",
    english: "to ordinate (where, when)",
    spanish: "consultar dónde, cuándo",
    german:  "praktizieren (wo, wann)"
  },
  {
    czech:   "objednat se",
    english: "to make an appointment (for self)",
    spanish: "pedir cita",
    german:  "einen Termin vereinbaren"
  },
  {
    czech:   "léčit se + s + instrumentál",
    english: "to get treatment for (what)",
    spanish: "tratarse con ...",
    german:  "behandelt werden mit ..."
  },
  {
    czech:   "změřit + akuzativ",
    english: "to measure (what)",
    spanish: "medir ...",
    german:  "messen ... (was)"
  },
  {
    czech:   "předepsat + akuzativ",
    english: "to prescribe (what)",
    spanish: "recetar ...",
    german:  "verschreiben ... (was)"
  },
  {
    czech:   "brát + akuzativ",
    english: "to take (what, medicine)",
    spanish: "tomar ...",
    german:  "einnehmen ... (was)"
  },
  {
    czech:   "držet dietu",
    english: "to be on a diet",
    spanish: "seguir una dieta",
    german:  "Diät halten"
  },
  {
    czech:   "viróza",
    english: "viral infection",
    spanish: "infección viral",
    german:  "Virusinfektion"
  },
  {
    czech:   "chřipka",
    english: "flu, influenza",
    spanish: "gripe",
    german:  "Grippe"
  },
  {
    czech:   "vysoký tlak",
    english: "high pressure",
    spanish: "presión alta",
    german:  "Bluthochdruck"
  },
  {
    czech:   "lékař/ka, doktor/ka",
    english: "doctor",
    spanish: "médico/a",
    german:  "Arzt/Ärztin"
  },
  {
    czech:   "zdravotní sestra",
    english: "nurse",
    spanish: "enfermero/a",
    german:  "Krankenpfleger/in"
  },
  {
    czech:   "ošetřovatel/ka",
    english: "caretaker",
    spanish: "cuidador/a",
    german:  "Pflegekraft"
  },
  {
    czech:   "ordinace",
    english: "the practice (of a doctor)",
    spanish: "consultorio",
    german:  "Praxis"
  },
  {
    czech:   "čekárna",
    english: "waiting room",
    spanish: "sala de espera",
    german:  "Wartezimmer"
  },
  {
    czech:   "nemocnice",
    english: "hospital",
    spanish: "hospital",
    german:  "Krankenhaus"
  },
  {
    czech:   "pohotovost",
    english: "emergency",
    spanish: "urgencias",
    german:  "Notaufnahme"
  },
  {
    czech:   "těhotný",
    english: "pregnant",
    spanish: "embarazada",
    german:  "schwanger"
  },
  {
    czech:   "očkování",
    english: "vaccination",
    spanish: "vacunación",
    german:  "Impfung"
  },
  {
    czech:   "recept, předpis",
    english: "prescription",
    spanish: "receta",
    german:  "Rezept"
  },
  {
    czech:   "zdravotní pojištění",
    english: "health insurance",
    spanish: "seguro médico",
    german:  "Krankenversicherung"
  }
];
