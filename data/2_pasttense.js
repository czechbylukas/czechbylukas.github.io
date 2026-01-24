// main/data/2_pasttense.js

export const vocab = [
  { czech: "dělat", english: "to do", spanish: "hacer", german: "machen", block: 1 },
  { czech: "plavat", english: "to swim", spanish: "nadar", german: "schwimmen", block: 1 },
  { czech: "pracovat", english: "to work", spanish: "trabajar", german: "arbeiten", block: 1 },
  { czech: "koukat se, dívat se", english: "to watch", spanish: "mirar", german: "schauen", block: 1 },
  { czech: "spát", english: "to sleep", spanish: "dormir", german: "schlafen", block: 1 },
  { czech: "vařit", english: "to cook", spanish: "cocinar", german: "kochen", block: 1 },
  { czech: "odpočívat", english: "to rest", spanish: "descansar", german: "sich ausruhen", block: 1 },
  { czech: "sportovat", english: "to do sports", spanish: "hacer deporte", german: "Sport treiben", block: 1 },
  { czech: "studovat, učit se", english: "to study, to learn", spanish: "estudiar, aprender", german: "studieren, lernen", block: 1 },
  { czech: "telefonovat", english: "to call", spanish: "llamar por telefon", german: "telefonieren", block: 1 },
  { czech: "Co jsi dělal/dělala včera?", english: "What were you doing yesterday?", spanish: "¿Qué hiciste ayer?", german: "Was hast du gestern gemacht?", block: 2 },
  { czech: "Včera večer jsem se díval/a na televizi.", english: "Yesterday evening I was watching TV.", spanish: "Anoche estuve viendo la televisión.", german: "Gestern Abend habe ich ferngesehen.", block: 2 },
  { czech: "V noci jsem spal/a.", english: "At night I was sleeping.", spanish: "Por la noche estuve durmiendo.", german: "In der Nacht habe ich geschlafen.", block: 2 },
  { czech: "V pátek jsem vařil/a kuře.", english: "On Friday, I was cooking chicken.", spanish: "El viernes estuve cocinando pollo.", german: "Am Freitag habe ich Hähnchen gekocht.", block: 2 },
  { czech: "O víkendu jsem pracoval/a.", english: "I was working at the weekend.", spanish: "El fin de semana estuve trabajando.", german: "Am Wochenende habe ich gearbeitet.", block: 3 },
  { czech: "V pondělí jsem odpočíval/a.", english: "On Monday, I was resting.", spanish: "El lunes estuve descansando.", german: "Am Montag habe ich mich ausgeruht.", block: 3 },
  { czech: "Ve středu jsem studoval/a češtinu.", english: "On Wednesday, I was studying Czech.", spanish: "El miércoles estuve estudiando checo.", german: "Am Mittwoch habe ich Tschechisch gelernt.", block: 3 },
  { czech: "V sobotu jsem telefonoval/a rodině.", english: "On Saturday, I was calling my family.", spanish: "El sábado estuve llamando a mi familia.", german: "Am Samstag habe ich s rodinou telefonoval.", block: 3 }
];

const transform = (i) => ({ cs: i.czech, en: i.english, es: i.spanish, de: i.german });

// Game Logic
export const pastTenseData = {
  A1: vocab.filter(i => i.block === 1 || i.block === 2).map(transform),
  A2: vocab.filter(i => i.block === 2 || i.block === 3).map(transform)
};

export const pastTenseQuestions = {
  A1: [{ text: "Já {{gap}} (spát).", answers: ["spal", "spala"] }],
  A2: [{ text: "Včera jsem {{gap}}.", answers: ["pracoval", "pracovala"] }]
};