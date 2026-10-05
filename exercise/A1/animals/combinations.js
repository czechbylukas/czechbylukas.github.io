// combinations.js

window.ANIMAL_DATABASE = {
  verbTemplates: [
    {
      id: "videti",
      infinitive: "VIDĚT",
      caseKey: "acc",
      caseName: "4. pád (Akuzativ)",
      buildSentence: (animal, form, isPlural) => {
        const past = isPlural ? "Viděli jsme" : (animal.gender === "F" ? "Viděla jsem" : "Viděl jsem");
        return `${past} [___].`;
      }
    },
    {
      id: "rikati",
      infinitive: "ŘÍKAT",
      caseKey: "dat",
      caseName: "3. pád (Dativ)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Říkali jsme" : "Říkám";
        return `${verb} [___] tajemství.`;
      }
    },
    {
      id: "jiti_s",
      infinitive: "JÍT S",
      caseKey: "inst",
      caseName: "7. pád (Instrumentál)",
      buildSentence: (animal, form, isPlural) => {
        const prep = /^[vf]/i.test(form) ? "se" : "s";
        return `Jdu na procházku ${prep} [___].`;
      }
    },
    {
      id: "mluviti_o",
      infinitive: "MLUVIT O",
      caseKey: "loc",
      caseName: "6. pád (Lokál)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Mluvili jsme" : "Mluvil jsem";
        return `${verb} o [___].`;
      }
    },
    {
      id: "bat_se",
      infinitive: "BÁT SE",
      caseKey: "gen",
      caseName: "2. pád (Genitiv)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Báli jsme se" : "Bál jsem se";
        return `${verb} [___].`;
      }
    },
    {
      id: "to_je_krasny",
      infinitive: "BÝT (Přídavné jméno)",
      caseKey: "nom",
      caseName: "1. pád (Nominativ)",
      buildSentence: (animal, form, isPlural) => {
        if (isPlural) {
          return animal.gender === "M_ANIM" ? "To jsou krásní [___]." : "To jsou krásné [___].";
        }
        if (animal.gender === "F") return "To je krásná [___].";
        if (animal.gender === "N") return "To je krásné [___].";
        return "To je krásný [___].";
      }
    }
  ],

  levels: {
    1: {
      name: "Začátečník",
      icon: "🌱",
      animals: [
        {
          id: "pes",
          nominative: "pes",
          english: "Dog",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "pes", gen: "psa", dat: "psovi", acc: "psa", voc: "pse", loc: "psovi", inst: "psem" },
            plural: { nom: "psi", gen: "psů", dat: "psům", acc: "psy", voc: "psi", loc: "psech", inst: "psy" }
          }
        },
        {
          id: "kocka",
          nominative: "kočka",
          english: "Cat",
          gender: "F",
          symbol: "♀",
          color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "kočka", gen: "kočky", dat: "kočce", acc: "kočku", voc: "kočko", loc: "kočce", inst: "kočkou" },
            plural: { nom: "kočky", gen: "koček", dat: "kočkám", acc: "kočky", voc: "kočky", loc: "kočkách", inst: "kočkami" }
          }
        }
      ]
    },
    2: {
      name: "Mírně pokročilý",
      icon: "🌿",
      animals: [
        {
          id: "vlk",
          nominative: "vlk",
          english: "Wolf",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          // Accurate Wolf Image
          image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "vlk", gen: "vlka", dat: "vlkovi", acc: "vlka", voc: "vlku", loc: "vlkovi", inst: "vlkem" },
            plural: { nom: "vlci", gen: "vlků", dat: "vlkům", acc: "vlky", voc: "vlci", loc: "vlcích", inst: "vlky" }
          }
        },
        {
          id: "medved",
          nominative: "medvěd",
          english: "Bear",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "medvěd", gen: "medvěda", dat: "medvědovi", acc: "medvěda", voc: "medvěde", loc: "medvědovi", inst: "medvědem" },
            plural: { nom: "medvědi", gen: "medvědů", dat: "medvědům", acc: "medvědy", voc: "medvědi", loc: "medvědech", inst: "medvědy" }
          }
        },
        {
          id: "ryba",
          nominative: "ryba",
          english: "Fish",
          gender: "F",
          symbol: "♀",
          color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "ryba", gen: "ryby", dat: "rybě", acc: "rybu", voc: "rybo", loc: "rybě", inst: "rybou" },
            plural: { nom: "ryby", gen: "ryb", dat: "rybám", acc: "ryby", voc: "ryby", loc: "rybách", inst: "rybami" }
          }
        },
        {
          id: "kun",
          nominative: "kůň",
          english: "Horse",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "kůň", gen: "koně", dat: "koni", acc: "koně", voc: "koni", loc: "koni", inst: "koněm" },
            plural: { nom: "koně", gen: "koní", dat: "koním", acc: "koně", voc: "koně", loc: "koních", inst: "koňmi" }
          }
        }
      ]
    },
    3: {
      name: "Středně pokročilý",
      icon: "🌳",
      animals: [
        {
          id: "jezek",
          nominative: "ježek",
          english: "Hedgehog",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          // Accurate Hedgehog Image
          image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "ježek", gen: "ježka", dat: "ježkovi", acc: "ježka", voc: "ježku", loc: "ježkovi", inst: "ježkem" },
            plural: { nom: "ježci", gen: "ježků", dat: "ježkům", acc: "ježky", voc: "ježci", loc: "ježcích", inst: "ježky" }
          }
        },
        {
          id: "veverka",
          nominative: "veverka",
          english: "Squirrel",
          gender: "F",
          symbol: "♀",
          color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "veverka", gen: "veverky", dat: "veverce", acc: "veverku", voc: "veverko", loc: "veverce", inst: "veverkou" },
            plural: { nom: "veverky", gen: "veverek", dat: "veverkám", acc: "veverky", voc: "veverky", loc: "veverkách", inst: "veverkami" }
          }
        }
      ]
    },
    4: {
      name: "Vyšší střední",
      icon: "🦅",
      animals: [
        {
          id: "netopyr",
          nominative: "netopýr",
          english: "Bat",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          // Accurate Bat Image
          image: "https://images.unsplash.com/photo-1581852017103-68accd5509e7?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "netopýr", gen: "netopýra", dat: "netopýrovi", acc: "netopýra", voc: "netopýre", loc: "netopýrovi", inst: "netopýrem" },
            plural: { nom: "netopýři", gen: "netopýrů", dat: "netopýrům", acc: "netopýry", voc: "netopýři", loc: "netopýrech", inst: "netopýry" }
          }
        }
      ]
    },
    5: {
      name: "Pokročilý",
      icon: "👑",
      animals: [
        {
          id: "chobotnice",
          nominative: "chobotnice",
          english: "Octopus",
          gender: "F",
          symbol: "♀",
          color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "chobotnice", gen: "chobotnice", dat: "chobotnici", acc: "chobotnici", voc: "chobotnice", loc: "chobotnici", inst: "chobotnicí" },
            plural: { nom: "chobotnice", gen: "chobotnic", dat: "chobotnicím", acc: "chobotnice", voc: "chobotnice", loc: "chobotnicích", inst: "chobotnicemi" }
          }
        }
      ]
    },
    6: {
      name: "Mistr / Exotika",
      icon: "🐉",
      animals: [
        {
          id: "lednacek",
          nominative: "ledňáček",
          english: "Kingfisher",
          gender: "M_ANIM",
          symbol: "♂",
          color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: {
            singular: { nom: "ledňáček", gen: "ledňáčka", dat: "ledňáčkovi", acc: "ledňáčka", voc: "ledňáčku", loc: "ledňáčkovi", inst: "ledňáčkem" },
            plural: { nom: "ledňáčci", gen: "ledňáčků", dat: "ledňáčkům", acc: "ledňáčky", voc: "ledňáčci", loc: "ledňáčcích", inst: "ledňáčky" }
          }
        }
      ]
    }
  }
};

window.getAnimalsForLevel = function(targetLevel, cumulative = false) {
  let list = [];
  const levels = window.ANIMAL_DATABASE.levels;
  if (cumulative) {
    for (let i = 1; i <= targetLevel; i++) {
      if (levels[i]) list = list.concat(levels[i].animals);
    }
  } else {
    if (levels[targetLevel]) list = levels[targetLevel].animals;
  }
  return list.length ? list : levels[1].animals;
};

window.generateAnimalQuestion = function(userLevel) {
  const pool = window.getAnimalsForLevel(userLevel, true);
  const selectedAnimal = pool[Math.floor(Math.random() * pool.length)];

  const templates = window.ANIMAL_DATABASE.verbTemplates;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

  const isPlural = Math.random() < 0.2;
  const numberKey = isPlural ? "plural" : "singular";
  const targetCaseKey = selectedTemplate.caseKey;
  
  const correctTarget = selectedAnimal.declension[numberKey][targetCaseKey];
  const sentenceTemplate = selectedTemplate.buildSentence(selectedAnimal, correctTarget, isPlural);
  const fullCorrectSentence = sentenceTemplate.replace("[___]", correctTarget);

  let distractor = selectedAnimal.nominative;
  if (distractor.toLowerCase() === correctTarget.toLowerCase()) {
    distractor = selectedAnimal.declension.singular.inst;
  }

  const optionSet = new Set();
  optionSet.add(correctTarget);
  Object.values(selectedAnimal.declension.singular).forEach(v => optionSet.add(v));
  Object.values(selectedAnimal.declension.plural).forEach(v => optionSet.add(v));

  let finalOptions = Array.from(optionSet).slice(0, 4);
  finalOptions.sort(() => Math.random() - 0.5);

  return {
    animal: selectedAnimal,
    template: selectedTemplate,
    isPlural: isPlural,
    sentenceTemplate: sentenceTemplate,
    fullCorrectSentence: fullCorrectSentence,
    correctTarget: correctTarget,
    distractor: distractor,
    options: finalOptions
  };
};