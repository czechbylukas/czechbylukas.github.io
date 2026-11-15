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
    { label: "Muž (Já)", pronoun: "Já", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "jsem" },
    { label: "Žena (Já)", pronoun: "Já", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "jsem" },
    { label: "Muž (Ty)", pronoun: "Ty", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "jsi" },
    { label: "Žena (Ty)", pronoun: "Ty", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "jsi" },
    { label: "On", pronoun: "On", symbol: "♂", color: "text-blue-400", gender: "M", number: "SG", aux: "" },
    { label: "Ona", pronoun: "Ona", symbol: "♀", color: "text-rose-400", gender: "F", number: "SG", aux: "" },
    { label: "Dítě (Ono)", pronoun: "Ono", symbol: "☯", color: "text-amber-400", gender: "N", number: "SG", aux: "" },

    { label: "Muži (My)", pronoun: "My", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "jsme" },
    { label: "Ženy (My)", pronoun: "My", symbol: "♀♀", color: "text-rose-400", gender: "F", number: "PL", aux: "jsme" },
    { label: "Muži (Vy)", pronoun: "Vy", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "jste" },
    { label: "Ženy (Vy)", pronoun: "Vy", symbol: "♀♀", color: "text-rose-400", gender: "F", number: "PL", aux: "jste" },
    { label: "Oni (Muži)", pronoun: "Oni", symbol: "♂♂", color: "text-blue-400", gender: "M_ANIM", number: "PL", aux: "" },
    { label: "Zvířata", pronoun: "Ona", symbol: "☯☯", color: "text-amber-400", gender: "N", number: "PL", aux: "" },
    { label: "Smíšená skupina", pronoun: "Oni", symbol: "♂♀", color: "text-purple-400", gender: "M_ANIM", number: "PL", aux: "" }
  ],

  categories: {
    generalWhat: ["úkol", "projekt", "prezentaci", "cvičení"],
    swimmingPlaces: ["v bazénu", "v řece", "v moři", "v rybníku"],
    workPlaces: ["v kanceláři", "v práci", "doma", "na počítači"],
    media: ["na televizi", "na film", "na zprávy", "na seriál"],
    sleepPlaces: ["v posteli", "v hotelu", "doma"],
    foodAndDrink: ["oběd", "večeři", "polévku", "chléb", "pizzu", "kuře"],
    relaxPlaces: ["v parku", "na zahradě", "v sauně", "na gauči"],
    sports: ["fotbal", "tenis", "basketbal", "hokej"],
    studySubjects: ["češtinu", "angličtinu", "matematiku", "historii"],
    studyPlaces: ["ve škole", "na univerzitě", "v knihovně", "v kurzu"],
    phonePeople: ["kamarádovi", "mámě", "tátovi", "doktorovi"],
    readingMedia: ["knihu", "dopis", "článek", "zprávy", "e-mail"],
    placesTo: ["do kina", "do parku", "do práce", "na koncert", "domů"],
    thingsToHave: ["čas", "nápad", "schůzku", "problém", "dovolenou"],
    thingsToWant: ["kávu", "odpočinek", "nové auto", "pauzu"],
    writing: ["dopis", "zprávu", "e-mail"],
    shopping: ["potraviny", "ovoce", "chléb"],
    understanding: ["otázce", "odpovědi", "vysvětlení"],
    travel: ["do Prahy", "do zahraničí", "po Evropě"],
    driving: ["auto", "autobus", "taxi"],
    waiting: ["na vlak", "na kamaráda", "na autobus"],
    visiting: ["muzeum", "kamaráda", "výstavu"],
    explaining: ["pravidlo", "postup", "úkol"],
    recommending: ["film", "knihu", "restauraci"],
    deciding: ["pro změnu", "pro cestu", "pro nový plán"],
    planning: ["dovolenou", "cestu", "schůzku"],
    negotiating: ["o smlouvě", "o ceně", "o podmínkách"],
    persuading: ["kolegu", "kamaráda", "zákazníka"],
    adapting: ["změně", "novým podmínkám", "situaci"],
    evaluating: ["výsledky", "projekt", "nabídku"],
    arranging: ["setkání", "kontakt", "spolupráci"],
    justifying: ["rozhodnutí", "návrh", "změnu"],
    considering: ["náklady", "rizika", "potřeby zákazníků"],
    specifying: ["požadavky", "podmínky", "detaily"],
    questioning: ["tvrzení", "závěr", "rozhodnutí"],
    reflecting: ["zkušenosti", "vlastní práci", "své rozhodnutí"],
    interpreting: ["výsledky", "údaje", "text"],
    formulating: ["otázku", "návrh", "odpověď"]
  },

  verbs: [
    {
      infinitive: "DĚLAT",
      translation: "to do",
      level: 1,
      image: "https://images.unsplash.com/photo-1712000155290-ee65c0a82eda?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["generalWhat"],
      forms: {
        SG: { M: "dělal", F: "dělala", N: "dělalo" },
        PL: { M_ANIM: "dělali", F: "dělaly", N: "dělala" }
      }
    },
      {
        infinitive: "PSÁT", translation: "to write", level: 1,
        image: "https://images.unsplash.com/photo-1488722796624-0aa6f1bb6399", reflexive: false, compatibleCategories: ["writing"],
        forms: { SG: { M: "psal", F: "psala", N: "psalo" }, PL: { M_ANIM: "psali", F: "psaly", N: "psala" } }
      },
      {
        infinitive: "KUPOVAT", translation: "to buy", level: 1,
        image: "https://images.unsplash.com/photo-1685640206182-c51b8aa9b686", reflexive: false, compatibleCategories: ["shopping"],
        forms: { SG: { M: "kupoval", F: "kupovala", N: "kupovalo" }, PL: { M_ANIM: "kupovali", F: "kupovaly", N: "kupovala" } }
      },
      {
        infinitive: "ROZUMĚT", translation: "to understand", level: 1,
        image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42", reflexive: false, compatibleCategories: ["understanding"],
        forms: { SG: { M: "rozuměl", F: "rozuměla", N: "rozumělo" }, PL: { M_ANIM: "rozuměli", F: "rozuměly", N: "rozuměla" } }
      },
      {
        infinitive: "CESTOVAT", translation: "to travel", level: 2,
        image: "https://images.unsplash.com/photo-1521575363954-393ae1439d33", reflexive: false, compatibleCategories: ["travel"],
        forms: { SG: { M: "cestoval", F: "cestovala", N: "cestovalo" }, PL: { M_ANIM: "cestovali", F: "cestovaly", N: "cestovala" } }
      },
      {
        infinitive: "ŘÍDIT", translation: "to drive", level: 2,
        image: "https://images.unsplash.com/photo-1666706017766-f884bbfcd643", reflexive: false, compatibleCategories: ["driving"],
        forms: { SG: { M: "řídil", F: "řídila", N: "řídilo" }, PL: { M_ANIM: "řídili", F: "řídily", N: "řídila" } }
      },
      {
        infinitive: "ČEKAT", translation: "to wait", level: 2,
        image: "https://images.unsplash.com/photo-1752500997837-d50181837e6a", reflexive: false, compatibleCategories: ["waiting"],
        forms: { SG: { M: "čekal", F: "čekala", N: "čekalo" }, PL: { M_ANIM: "čekali", F: "čekaly", N: "čekala" } }
      },
      {
        infinitive: "NAVŠTÍVIT", translation: "to visit", level: 2,
        image: "https://images.unsplash.com/photo-1643841368618-4aa128ae63c2", reflexive: false, compatibleCategories: ["visiting"],
        forms: { SG: { M: "navštívil", F: "navštívila", N: "navštívilo" }, PL: { M_ANIM: "navštívili", F: "navštívily", N: "navštívila" } }
      },
      {
        infinitive: "VYSVĚTLIT", translation: "to explain", level: 3,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7", reflexive: false, compatibleCategories: ["explaining"],
        forms: { SG: { M: "vysvětlil", F: "vysvětlila", N: "vysvětlilo" }, PL: { M_ANIM: "vysvětlili", F: "vysvětlily", N: "vysvětlila" } }
      },
      {
        infinitive: "DOPORUČIT", translation: "to recommend", level: 3,
        image: "https://images.unsplash.com/photo-1758600587781-e98ef705ab0e", reflexive: false, compatibleCategories: ["recommending"],
        forms: { SG: { M: "doporučil", F: "doporučila", N: "doporučilo" }, PL: { M_ANIM: "doporučili", F: "doporučily", N: "doporučila" } }
      },
      {
        infinitive: "ROZHODNOUT SE", translation: "to decide", level: 3,
        image: "https://images.unsplash.com/photo-1429743305873-d4065c15f93e", reflexive: "se", compatibleCategories: ["deciding"],
        forms: { SG: { M: "rozhodl", F: "rozhodla", N: "rozhodlo" }, PL: { M_ANIM: "rozhodli", F: "rozhodly", N: "rozhodla" } }
      },
      {
        infinitive: "PLÁNOVAT", translation: "to plan", level: 3,
        image: "https://images.unsplash.com/photo-1488722796624-0aa6f1bb6399", reflexive: false, compatibleCategories: ["planning"],
        forms: { SG: { M: "plánoval", F: "plánovala", N: "plánovalo" }, PL: { M_ANIM: "plánovali", F: "plánovaly", N: "plánovala" } }
      },
      {
        infinitive: "VYJEDNÁVAT", translation: "to negotiate", level: 4,
        image: "https://images.unsplash.com/photo-1681505531034-8d67054e07f6", reflexive: false, compatibleCategories: ["negotiating"],
        forms: { SG: { M: "vyjednával", F: "vyjednávala", N: "vyjednávalo" }, PL: { M_ANIM: "vyjednávali", F: "vyjednávaly", N: "vyjednávala" } }
      },
      {
        infinitive: "PŘESVĚDČIT", translation: "to persuade", level: 4,
        image: "https://images.unsplash.com/photo-1714976694720-01c558074a80", reflexive: false, compatibleCategories: ["persuading"],
        forms: { SG: { M: "přesvědčil", F: "přesvědčila", N: "přesvědčilo" }, PL: { M_ANIM: "přesvědčili", F: "přesvědčily", N: "přesvědčila" } }
      },
      {
        infinitive: "PŘIZPŮSOBIT SE", translation: "to adapt", level: 4,
        image: "https://images.unsplash.com/photo-1617540021016-72023b487e99", reflexive: "se", compatibleCategories: ["adapting"],
        forms: { SG: { M: "přizpůsobil", F: "přizpůsobila", N: "přizpůsobilo" }, PL: { M_ANIM: "přizpůsobili", F: "přizpůsobily", N: "přizpůsobila" } }
      },
      {
        infinitive: "VYHODNOTIT", translation: "to evaluate", level: 4,
        image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be", reflexive: false, compatibleCategories: ["evaluating"],
        forms: { SG: { M: "vyhodnotil", F: "vyhodnotila", N: "vyhodnotilo" }, PL: { M_ANIM: "vyhodnotili", F: "vyhodnotily", N: "vyhodnotila" } }
      },
      {
        infinitive: "ZPROSTŘEDKOVAT", translation: "to arrange or facilitate", level: 5,
        image: "https://images.unsplash.com/photo-1459499362902-55a20553e082", reflexive: false, compatibleCategories: ["arranging"],
        forms: { SG: { M: "zprostředkoval", F: "zprostředkovala", N: "zprostředkovalo" }, PL: { M_ANIM: "zprostředkovali", F: "zprostředkovaly", N: "zprostředkovala" } }
      },
      {
        infinitive: "ZDŮVODNIT", translation: "to justify", level: 5,
        image: "https://images.unsplash.com/photo-1758691736545-5c33b6255dca", reflexive: false, compatibleCategories: ["justifying"],
        forms: { SG: { M: "zdůvodnil", F: "zdůvodnila", N: "zdůvodnilo" }, PL: { M_ANIM: "zdůvodnili", F: "zdůvodnily", N: "zdůvodnila" } }
      },
      {
        infinitive: "ZOHLEDNIT", translation: "to take into account", level: 5,
        image: "https://images.unsplash.com/photo-1768055105012-4c53791b2877", reflexive: false, compatibleCategories: ["considering"],
        forms: { SG: { M: "zohlednil", F: "zohlednila", N: "zohlednilo" }, PL: { M_ANIM: "zohlednili", F: "zohlednily", N: "zohlednila" } }
      },
      {
        infinitive: "SPECIFIKOVAT", translation: "to specify", level: 5,
        image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a", reflexive: false, compatibleCategories: ["specifying"],
        forms: { SG: { M: "specifikoval", F: "specifikovala", N: "specifikovalo" }, PL: { M_ANIM: "specifikovali", F: "specifikovaly", N: "specifikovala" } }
      },
      {
        infinitive: "ZPOCHYBNIT", translation: "to question or challenge", level: 6,
        image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d", reflexive: false, compatibleCategories: ["questioning"],
        forms: { SG: { M: "zpochybnil", F: "zpochybnila", N: "zpochybnilo" }, PL: { M_ANIM: "zpochybnili", F: "zpochybnily", N: "zpochybnila" } }
      },
      {
        infinitive: "REFLEKTOVAT", translation: "to reflect on", level: 6,
        image: "https://images.unsplash.com/photo-1758876022649-ab858801c6dc", reflexive: false, compatibleCategories: ["reflecting"],
        forms: { SG: { M: "reflektoval", F: "reflektovala", N: "reflektovalo" }, PL: { M_ANIM: "reflektovali", F: "reflektovaly", N: "reflektovala" } }
      },
      {
        infinitive: "INTERPRETOVAT", translation: "to interpret", level: 6,
        image: "https://images.unsplash.com/photo-1707157281599-d155d1da5b4c", reflexive: false, compatibleCategories: ["interpreting"],
        forms: { SG: { M: "interpretoval", F: "interpretovala", N: "interpretovalo" }, PL: { M_ANIM: "interpretovali", F: "interpretovaly", N: "interpretovala" } }
      },
      {
        infinitive: "FORMULOVAT", translation: "to formulate", level: 6,
        image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd", reflexive: false, compatibleCategories: ["formulating"],
        forms: { SG: { M: "formuloval", F: "formulovala", N: "formulovalo" }, PL: { M_ANIM: "formulovali", F: "formulovaly", N: "formulovala" } }
      },
    {
      infinitive: "PLAVAT",
      translation: "to swim",
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
      translation: "to work",
      level: 1,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["workPlaces"],
      forms: {
        SG: { M: "pracoval", F: "pracovala", N: "pracovalo" },
        PL: { M_ANIM: "pracovali", F: "pracovaly", N: "pracovala" }
      }
    },
    {
      infinitive: "DÍVAT SE",
      translation: "to watch",
      level: 1,
      image: "https://images.unsplash.com/photo-1692188071339-2825a8a997f1?auto=format&fit=crop&w=600&q=80",
      reflexive: "se",
      compatibleCategories: ["media"],
      forms: {
        SG: { M: "díval", F: "dívala", N: "dívalo" },
        PL: { M_ANIM: "dívali", F: "dívaly", N: "dívala" }
      }
    },
    {
      infinitive: "SPÁT",
      translation: "to sleep",
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
      translation: "to cook",
      level: 1,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["foodAndDrink"],
      forms: {
        SG: { M: "vařil", F: "vařila", N: "vařilo" },
        PL: { M_ANIM: "vařili", F: "vařily", N: "vařila" }
      }
    },
    {
      infinitive: "ODPOČÍVAT",
      translation: "to rest",
      level: 1,
      image: "https://images.unsplash.com/photo-1568617935424-49ab968826d7?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["relaxPlaces"],
      forms: {
        SG: { M: "odpočíval", F: "odpočívala", N: "odpočívalo" },
        PL: { M_ANIM: "odpočívali", F: "odpočívaly", N: "odpočívala" }
      }
    },
    {
      infinitive: "STUDOVAT",
      translation: "to study",
      level: 1,
      image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["studySubjects"],
      forms: {
        SG: { M: "studoval", F: "studovala", N: "studovalo" },
        PL: { M_ANIM: "studovali", F: "studovaly", N: "studovala" }
      }
    },
    {
      infinitive: "UČIT SE",
      translation: "to learn",
      level: 1,
      image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=600&q=80",
      reflexive: "se",
      compatibleCategories: ["studySubjects", "studyPlaces"],
      forms: {
        SG: { M: "učil", F: "učila", N: "učilo" },
        PL: { M_ANIM: "učili", F: "učily", N: "učila" }
      }
    },
    {
      infinitive: "TELEFONOVAT",
      translation: "to call",
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
  infinitive: "SLAVIT",
  translation: "to celebrate",
  level: 2,
  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
  reflexive: false,
  compatibleCategories: [],
  forms: {
    SG: { M: "slavil", F: "slavila", N: "slavilo" },
    PL: { M_ANIM: "slavili", F: "slavily", N: "slavila" }
  }
},
{
  infinitive: "HRÁT",
  translation: "to play",
  level: 2,
  image: "https://images.unsplash.com/photo-1536594527669-2f555de54e95?auto=format&fit=crop&w=600&q=80",
  reflexive: false,
  compatibleCategories: [],
  forms: {
    SG: { M: "hrál", F: "hrála", N: "hrálo" },
    PL: { M_ANIM: "hráli", F: "hrály", N: "hrála" }
  }
},
{
  infinitive: "PÍT",
  translation: "to drink",
  level: 2,
  image: "https://images.unsplash.com/photo-1651063067981-8baeab7e7912?auto=format&fit=crop&w=600&q=80",
  reflexive: false,
  compatibleCategories: [],
  forms: {
    SG: { M: "pil", F: "pila", N: "pilo" },
    PL: { M_ANIM: "pili", F: "pily", N: "pila" }
  }
},
{
  infinitive: "ZPÍVAT",
  translation: "to sing",
  level: 1,
  image: "https://images.unsplash.com/photo-1792355548852-91113888bff7?auto=format&fit=crop&w=600&q=80",
  reflexive: false,
  compatibleCategories: [],
  forms: {
    SG: { M: "zpíval", F: "zpívala", N: "zpívalo" },
    PL: { M_ANIM: "zpívali", F: "zpívaly", N: "zpívala" }
  }
},
{
  infinitive: "MLUVIT",
  translation: "to speak",
  level: 1,
  image: "https://images.unsplash.com/photo-1677594332274-3e2c016723b7?auto=format&fit=crop&w=600&q=80",
  reflexive: false,
  compatibleCategories: [],
  forms: {
    SG: { M: "mluvil", F: "mluvila", N: "mluvilo" },
    PL: { M_ANIM: "mluvili", F: "mluvily", N: "mluvila" }
  }
},
    {
      infinitive: "JÍST",
      translation: "to eat",
      level: 2,
      image: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["foodAndDrink"],
      forms: {
        SG: { M: "jedl", F: "jedla", N: "jedlo" },
        PL: { M_ANIM: "jedli", F: "jedly", N: "jedla" }
      }
    },
    {
      infinitive: "MÍT",
      translation: "to have",
      level: 2,
      image: "https://images.unsplash.com/photo-1544639044-4f142ceb6a2b",
      reflexive: false,
      compatibleCategories: ["thingsToHave"],
      forms: {
        SG: { M: "měl", F: "měla", N: "mělo" },
        PL: { M_ANIM: "měli", F: "měly", N: "měla" }
      }
    },
    {
      infinitive: "JÍT",
      translation: "to go",
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
      translation: "to read",
      level: 2,
      image: "https://images.unsplash.com/photo-1725582203570-d396d6399cab",
      reflexive: false,
      compatibleCategories: ["readingMedia"],
      forms: {
        SG: { M: "četl", F: "četla", N: "četlo" },
        PL: { M_ANIM: "četli", F: "četly", N: "četla" }
      }
    },
    {
      infinitive: "CHTÍT",
      translation: "to want",
      level: 2,
      image: "https://images.unsplash.com/photo-1511028897949-27b3f9f7924d?auto=format&fit=crop&w=600&q=80",
      reflexive: false,
      compatibleCategories: ["thingsToWant"],
      forms: {
        SG: { M: "chtěl", F: "chtěla", N: "chtělo" },
        PL: { M_ANIM: "chtěli", F: "chtěly", N: "chtěla" }
      }
    }
  ]
};

window.CZECH_GRAMMAR_DB.verbs.forEach(verb => {
  verb.image = window.exerciseImageUrl(verb.image);
});

window.generateCombinationQuestion = function(targetDifficulty, restrictToFirstPerson, mode = "grammar") {
  const db = window.CZECH_GRAMMAR_DB;
  const knownVerbs = window.getKnownVerbsThroughLevel(targetDifficulty);
  const currentLevelVerbs = knownVerbs.filter(v => v.level === Number(targetDifficulty));
  const lowerLevelVerbs = knownVerbs.filter(v => v.level < Number(targetDifficulty));
  if (knownVerbs.length === 0) {
    throw new Error(`No known verbs are available for level ${targetDifficulty}.`);
  }

  let eligibleVerbs;

  if (currentLevelVerbs.length > 0 && lowerLevelVerbs.length > 0) {
    eligibleVerbs = Math.random() < 0.5 ? currentLevelVerbs : lowerLevelVerbs;
  } else if (currentLevelVerbs.length > 0) {
    eligibleVerbs = currentLevelVerbs;
  } else if (lowerLevelVerbs.length > 0) {
    eligibleVerbs = lowerLevelVerbs;
  } else {
    eligibleVerbs = knownVerbs;
  }

  const eligibleSubjects = restrictToFirstPerson
    ? db.subjects.filter(s => s.label.includes("Já"))
    : db.subjects;

  const verbObj = eligibleVerbs[Math.floor(Math.random() * eligibleVerbs.length)];
  const subjectObj = eligibleSubjects[Math.floor(Math.random() * eligibleSubjects.length)];
  const timeMarkerObj = db.timeMarkers[Math.floor(Math.random() * db.timeMarkers.length)];

  const selectedCategoryKey = verbObj.compatibleCategories[Math.floor(Math.random() * verbObj.compatibleCategories.length)];
  const categoryItems = db.categories[selectedCategoryKey];
  const targetItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];

  // Get exact verb form matching subject's number and gender
  const verbPastForm = verbObj.forms[subjectObj.number][subjectObj.gender];
  const firstTwoChars = verbPastForm.substring(0, 2);

  const isVocabularyQuestion = mode === "vocab";
  const isAuxiliaryQuestion = !isVocabularyQuestion && subjectObj.aux !== "" && Math.random() < 0.3;

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
    if (verbObj.reflexive && !isVocabularyQuestion) {
      gapTemplateParts.push(verbObj.reflexive);
    }
    gapTemplateParts.push("[___]");
    if (verbObj.reflexive) fullSentenceParts.push(verbObj.reflexive);
    fullSentenceParts.push(verbPastForm);

    targetCorrectAnswer = isVocabularyQuestion
      ? `${verbObj.reflexive ? `${verbObj.reflexive} ` : ""}${verbPastForm}`
      : verbPastForm;
  }

  gapTemplateParts.push(targetItem + ".");
  fullSentenceParts.push(targetItem + ".");

  const sentenceTemplate = gapTemplateParts.join(" ");
  const fullCorrectSentence = fullSentenceParts.join(" ");

  let finalOptions = [];
  if (isAuxiliaryQuestion) {
    finalOptions = ["jsem", "jsi", "jsme", "jste"];
  } else if (isVocabularyQuestion) {
    const shuffleVerbs = verbs => [...verbs].sort(() => Math.random() - 0.5);
    const distinctDistractors = shuffleVerbs(eligibleVerbs.filter(optionVerb =>
      optionVerb !== verbObj &&
      !optionVerb.compatibleCategories.some(category => verbObj.compatibleCategories.includes(category))
    ));
    const remainingDistractors = shuffleVerbs(eligibleVerbs.filter(optionVerb =>
      optionVerb !== verbObj && !distinctDistractors.includes(optionVerb)
    ));
    const vocabularyVerbs = [verbObj, ...distinctDistractors, ...remainingDistractors].slice(0, 4);
    finalOptions = vocabularyVerbs.map(optionVerb => {
      const form = optionVerb.forms[subjectObj.number][subjectObj.gender];
      return `${optionVerb.reflexive ? `${optionVerb.reflexive} ` : ""}${form}`;
    }).sort(() => Math.random() - 0.5);
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
    verbTranslation: verbObj.translation,
    verbImage: verbObj.image,
    subjectSymbol: subjectObj.symbol,
    subjectColor: subjectObj.color,
    subjectLabel: subjectObj.label,
    subjectPronoun: subjectObj.pronoun,
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

window.getKnownVerbsThroughLevel = function(level) {
  const db = window.CZECH_GRAMMAR_DB;
  return db.verbs.filter(verb =>
    verb.level <= Number(level) &&
    Array.isArray(verb.compatibleCategories) &&
    verb.compatibleCategories.some(category => db.categories[category]?.length) &&
    window.isPracticeWordKnown("verb", verb.infinitive, true)
  );
};