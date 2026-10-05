// combinations.js - CZECH PAST TENSE GRAMMAR ENGINE

window.CZECH_GRAMMAR_DB = {
  timeMarkers: [
    { text: "Včera" },
    { text: "Minulý týden" },
    { text: "Předevčírem" },
    { text: "Minulý měsíc" },
    { text: "Minulý rok" },
    { text: "Dnes ráno" },
    { text: "Ve čtvrtek" }
  ],

  subjects: [
    { label: "Muž (Já)", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "jsem" },
    { label: "Žena (Já)", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "jsem" },
    { label: "Muž (Ty)", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "jsi" },
    { label: "Žena (Ty)", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "jsi" },
    { label: "On", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "" },
    { label: "Ona", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "" },
    { label: "Dítě (Ono)", symbol: "☯", color: "text-amber-400", gender: "N", number: "SG", aux: "" },

    { label: "Muži (My)", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "jsme" },
    { label: "Ženy (My)", symbol: "♀♀", color: "text-rose-400", gender: "F", number: "PL", aux: "jsme" },
    { label: "Muži (Vy)", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "jste" },
    { label: "Ženy (Vy)", symbol: "♀♀", color: "text-rose-400", gender: "F", number: "PL", aux: "jste" },
    { label: "Oni (Muži)", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "" },
    { label: "Zvířata", symbol: "☯☯", color: "text-amber-400", gender: "N", number: "PL", aux: "" },
    { label: "Smíšená skupina", symbol: "♂♀", color: "text-purple-400", gender: "M_ANIM", number: "PL", aux: "" }
  ],

  categories: {
    generalWhat: ["úkol", "projekt", "prezentaci", "cvičení"],
    swimmingPlaces: ["v bazénu", "v řece", "v moři", "v rybníku"],
    workPlaces: ["v kanceláři", "v práci", "doma", "na počítači"],
    media: ["na televizi", "na film", "na zprávy", "na seriál"],
    sleepPlaces: ["v posteli", "v hotelu", "doma"],
    foodAndDrink: ["oběd", "večeři", "polévku", "chléb", "pizzu"],
    relaxPlaces: ["v parku", "na zahradě", "v sauně", "na gauči"],
    sports: ["fotbal", "tenis", "basketbal", "hokej"],
    studySubjects: ["češtinu", "angličtinu", "matematiku", "historii"],
    studyPlaces: ["ve škole", "na univerzitě", "v knihovně", "v kurzu"],
    phonePeople: ["kamarádovi", "mámě", "tátovi", "doktorovi"],
    readingMedia: ["knihu", "dopis", "článek", "zprávy", "e-mail"],
    placesTo: ["do kina", "do parku", "do práce", "na koncert", "domů"],
    thingsToHave: ["čas", "nápad", "schůzku", "problém", "dovolenou"],
    thingsToWant: ["kávu", "odpočinek", "nové auto", "pauzu"]
  },

  verbs: [
    {
      infinitive: "DĚLAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["generalWhat"],
      forms: {
        SG: { M: "dělal", F: "dělala", N: "dělalo" },
        PL: { M_ANIM: "dělali", F: "dělaly", N: "dělala" }
      }
    },
    {
      infinitive: "PLAVAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["swimmingPlaces"],
      forms: {
        SG: { M: "plaval", F: "plavala", N: "plavalo" },
        PL: { M_ANIM: "plavali", F: "plavaly", N: "plavala" }
      }
    },
    {
      infinitive: "PRACOVAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["workPlaces"],
      forms: {
        SG: { M: "pracoval", F: "pracovala", N: "pracovalo" },
        PL: { M_ANIM: "pracovali", F: "pracovaly", N: "pracovala" }
      }
    },
    {
      infinitive: "DÍVAT SE",
      level: 1,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
      reflexive: "se",
      compatibleCategories: ["media"],
      forms: {
        SG: { M: "díval", F: "dívala", N: "dívalo" },
        PL: { M_ANIM: "dívali", F: "dívaly", N: "dívala" }
      }
    },
    {
      infinitive: "SPÁT",
      level: 1,
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["sleepPlaces"],
      forms: {
        SG: { M: "spal", F: "spala", N: "spalo" },
        PL: { M_ANIM: "spali", F: "spaly", N: "spala" }
      }
    },
    {
      infinitive: "VAŘIT",
      level: 1,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["foodAndDrink"],
      forms: {
        SG: { M: "vařil", F: "vařila", N: "vařilo" },
        PL: { M_ANIM: "vařili", F: "vařily", N: "vařila" }
      }
    },
    {
      infinitive: "ODPOČÍVAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["relaxPlaces"],
      forms: {
        SG: { M: "odpočíval", F: "odpočívala", N: "odpočívalo" },
        PL: { M_ANIM: "odpočívali", F: "odpočívaly", N: "odpočívala" }
      }
    },
    {
      infinitive: "STUDOVAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["studySubjects"],
      forms: {
        SG: { M: "studoval", F: "studovala", N: "studovalo" },
        PL: { M_ANIM: "studovali", F: "studovaly", N: "studovala" }
      }
    },
    {
      infinitive: "UČIT SE",
      level: 1,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      reflexive: "se",
      compatibleCategories: ["studySubjects", "studyPlaces"],
      forms: {
        SG: { M: "učil", F: "učila", N: "učilo" },
        PL: { M_ANIM: "učili", F: "učily", N: "učila" }
      }
    },
    {
      infinitive: "TELEFONOVAT",
      level: 1,
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["phonePeople"],
      forms: {
        SG: { M: "telefonoval", F: "telefonovala", N: "telefonovalo" },
        PL: { M_ANIM: "telefonovali", F: "telefonovaly", N: "telefonovala" }
      }
    },
    {
      infinitive: "JÍST",
      level: 2,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["foodAndDrink"],
      forms: {
        SG: { M: "jedl", F: "jedla", N: "jedlo" },
        PL: { M_ANIM: "jedli", F: "jedly", N: "jedla" }
      }
    },
    {
      infinitive: "MÍT",
      level: 2,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["thingsToHave"],
      forms: {
        SG: { M: "měl", F: "měla", N: "mělo" },
        PL: { M_ANIM: "měli", F: "měly", N: "měla" }
      }
    },
    {
      infinitive: "JÍT",
      level: 2,
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["placesTo"],
      forms: {
        SG: { M: "šel", F: "šla", N: "šlo" },
        PL: { M_ANIM: "šli", F: "šly", N: "šla" }
      }
    },
    {
      infinitive: "ČÍST",
      level: 2,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["readingMedia"],
      forms: {
        SG: { M: "četl", F: "četla", N: "četlo" },
        PL: { M_ANIM: "četli", F: "četly", N: "četla" }
      }
    },
    {
      infinitive: "CHTÍT",
      level: 2,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["thingsToWant"],
      forms: {
        SG: { M: "chtěl", F: "chtěla", N: "chtělo" },
        PL: { M_ANIM: "chtěli", F: "chtěly", N: "chtěla" }
      }
    }
  ]
};

window.generateCombinationQuestion = function(targetDifficulty, restrictToFirstPerson) {
  const db = window.CZECH_GRAMMAR_DB;

  let eligibleVerbs = db.verbs.filter(v => v.level === targetDifficulty);
  if (eligibleVerbs.length === 0) {
    eligibleVerbs = db.verbs.filter(v => v.level === 1);
  }

  let eligibleSubjects = db.subjects;
  if (restrictToFirstPerson) {
    eligibleSubjects = db.subjects.filter(s => s.label.includes("Já"));
  }

  const verbObj = eligibleVerbs[Math.floor(Math.random() * eligibleVerbs.length)];
  const subjectObj = eligibleSubjects[Math.floor(Math.random() * eligibleSubjects.length)];
  const timeMarkerObj = db.timeMarkers[Math.floor(Math.random() * db.timeMarkers.length)];

  const selectedCategoryKey = verbObj.compatibleCategories[Math.floor(Math.random() * verbObj.compatibleCategories.length)];
  const categoryItems = db.categories[selectedCategoryKey];
  const targetItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];

  // Get exact verb form matching subject's number and gender
  const verbPastForm = verbObj.forms[subjectObj.number][subjectObj.gender];
  const firstTwoChars = verbPastForm.substring(0, 2);

  const isAuxiliaryQuestion = subjectObj.aux !== "" && Math.random() < 0.3;

  let gapTemplateParts = [timeMarkerObj.text];
  let fullSentenceParts = [timeMarkerObj.text];
  let targetCorrectAnswer = "";

  if (isAuxiliaryQuestion) {
    gapTemplateParts.push("[___]");
    if (verbObj.reflexive) gapTemplateParts.push(verbObj.reflexive);
    gapTemplateParts.push(verbPastForm);

    if (subjectObj.aux) fullSentenceParts.push(subjectObj.aux);
    if (verbObj.reflexive) fullSentenceParts.push(verbObj.reflexive);
    fullSentenceParts.push(verbPastForm);

    targetCorrectAnswer = subjectObj.aux;
  } else {
    if (subjectObj.aux) {
      gapTemplateParts.push(subjectObj.aux);
      fullSentenceParts.push(subjectObj.aux);
    }
    if (verbObj.reflexive) {
      gapTemplateParts.push(verbObj.reflexive);
      fullSentenceParts.push(verbObj.reflexive);
    }
    gapTemplateParts.push("[___]");
    fullSentenceParts.push(verbPastForm);

    targetCorrectAnswer = verbPastForm;
  }

  gapTemplateParts.push(targetItem + ".");
  fullSentenceParts.push(targetItem + ".");

  const sentenceTemplate = gapTemplateParts.join(" ");
  const fullCorrectSentence = fullSentenceParts.join(" ");

  let finalOptions = [];
  if (isAuxiliaryQuestion) {
    finalOptions = ["jsem", "jsi", "jsme", "jste"];
  } else {
    const verbOptionsSet = new Set();
    verbOptionsSet.add(verbPastForm);
    verbOptionsSet.add(verbObj.forms.SG.M);
    verbOptionsSet.add(verbObj.forms.SG.F);
    verbOptionsSet.add(verbObj.forms.PL.M_ANIM);
    verbOptionsSet.add(verbObj.forms.PL.F);

    finalOptions = Array.from(verbOptionsSet).slice(0, 4);
    finalOptions.sort(() => Math.random() - 0.5);
  }

  const auxOptions = ["jsem", "jsi", "jsme", "jste"];
  const wrongAuxList = auxOptions.filter(a => a !== subjectObj.aux);
  const wrongAux = wrongAuxList[Math.floor(Math.random() * wrongAuxList.length)];

  return {
    isAuxQuestion: isAuxiliaryQuestion,
    verbInfinitive: verbObj.infinitive,
    verbImage: verbObj.image,
    subjectSymbol: subjectObj.symbol,
    subjectColor: subjectObj.color,
    subjectLabel: subjectObj.label,
    sentenceTemplate: sentenceTemplate,
    fullCorrectSentence: fullCorrectSentence,
    correctPastForm: targetCorrectAnswer,
    actualPastVerb: verbPastForm,
    firstTwoChars: firstTwoChars,
    auxiliary: subjectObj.aux,
    wrongAuxiliary: wrongAux,
    timeMarker: timeMarkerObj.text,
    reflexive: verbObj.reflexive,
    targetItem: targetItem,
    options: finalOptions
  };
};