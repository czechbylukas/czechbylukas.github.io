// data/level_a2/2_daily_household.js
const vocab = [
  {
    czech:   "vstávat / vstát",
    english: "to get up (repeatedly / once)",
    spanish: "levantarse",
    german:  "aufstehen"
  },
  {
    czech:   "budit se / probudit se",
    english: "to wake up (repeatedly / once)",
    spanish: "despertarse",
    german:  "aufwachen"
  },
  {
    czech:   "oblékat se / obléknout se",
    english: "to put on, dress up (repeatedly / once)",
    spanish: "vestirse",
    german:  "sich anziehen"
  },
  {
    czech:   "jít / chodit kam",
    english: "to go (on foot) where to (once / repeatedly)",
    spanish: "ir a pie",
    german:  "gehen"
  },
  {
    czech:   "jet / jezdit kam",
    english: "to go (by vehicle) where to (once / repeatedly)",
    spanish: "ir en vehículo",
    german:  "fahren"
  },
  {
    czech:   "vracet se / vrátit se domů",
    english: "to return home (repeatedly / once)",
    spanish: "volver a casa",
    german:  "nach Hause zurückkehren"
  },
  {
    czech:   "nakupovat / nakoupit",
    english: "to shop (repeatedly / once)",
    spanish: "hacer compras",
    german:  "einkaufen"
  },
  {
    czech:   "odpočívat / odpočinout si",
    english: "to relax (repeatedly / once)",
    spanish: "descansar",
    german:  "sich ausruhen"
  },
  {
    czech:   "chodit spát / jít spát",
    english: "to go to bed (repeatedly / once)",
    spanish: "irse a la cama",
    german:  "zu Bett gehen"
  },
  {
    czech:   "spát",
    english: "to sleep",
    spanish: "dormir",
    german:  "schlafen"
  },
  {
    czech:   "mýdlo",
    english: "soap",
    spanish: "jabón",
    german:  "Seife"
  },
  {
    czech:   "šampon",
    english: "shampoo",
    spanish: "champú",
    german:  "Shampoo"
  },
  {
    czech:   "toaletní papír",
    english: "toilet paper",
    spanish: "papel higiénico",
    german:  "Toilettenpapier"
  },
  {
    czech:   "dámské vložky",
    english: "female sanitary pads",
    spanish: "compresas femeninas",
    german:  "Damenbinden"
  },
  {
    czech:   "ručník",
    english: "towel",
    spanish: "toalla",
    german:  "Handtuch"
  },
  {
    czech:   "pasta na zuby (zubní pasta)",
    english: "toothpaste",
    spanish: "pasta de dientes",
    german:  "Zahnpasta"
  },
  {
    czech:   "kartáček na zuby (zubní kartáček)",
    english: "toothbrush",
    spanish: "cepillo de dientes",
    german:  "Zahnbürste"
  },
  {
    czech:   "krém",
    english: "creme",
    spanish: "crema",
    german:  "Creme"
  },
  {
    czech:   "hřeben",
    english: "comb",
    spanish: "peine",
    german:  "Kamm"
  },
  {
    czech:   "fén",
    english: "hairdryer",
    spanish: "secador",
    german:  "Föhn"
  },
  {
    czech:   "holicí strojek",
    english: "razor, electric shaver",
    spanish: "maquinilla de afeitar",
    german:  "Rasierer"
  },
  {
    czech:   "kartáč",
    english: "brush",
    spanish: "cepillo",
    german:  "Bürste"
  },
  {
    czech:   "kapesník",
    english: "handkerchief",
    spanish: "pañuelo",
    german:  "Taschentuch"
  },
  {
    czech:   "mýt se / umýt se",
    english: "to wash oneself (repeatedly / once)",
    spanish: "lavarse",
    german:  "sich waschen"
  },
  {
    czech:   "sprchovat se / osprchovat se",
    english: "to take a shower (repeatedly / once)",
    spanish: "ducharse",
    german:  "duschen"
  },
  {
    czech:   "koupat se / vykoupat se",
    english: "to bathe (repeatedly / once)",
    spanish: "bañarse",
    german:  "baden"
  },
  {
    czech:   "čistit si zuby / vyčistit si zuby",
    english: "to brush (self) teeth (repeatedly / once)",
    spanish: "cepillarse los dientes",
    german:  "Zähne putzen"
  },
  {
    czech:   "česat si / učesat si vlasy",
    english: "to comb one's hair (repeatedly / once)",
    spanish: "peinarse",
    german:  "Haare kämmen"
  },
  {
    czech:   "malovat se / namalovat se",
    english: "to put on makeup (repeatedly / once)",
    spanish: "maquillarse",
    german:  "sich schminken"
  },
  {
    czech:   "holit se / oholit se",
    english: "to shave (repeatedly / once)",
    spanish: "afeitarse",
    german:  "sich rasieren"
  },
  {
    czech:   "prací prášek",
    english: "laundry detergent",
    spanish: "detergente para la ropa",
    german:  "Waschpulver"
  },
  {
    czech:   "čisticí prostředek",
    english: "detergent",
    spanish: "detergente",
    german:  "Reinigungsmittel"
  },
  {
    czech:   "žehlička",
    english: "an iron",
    spanish: "plancha",
    german:  "Bügeleisen"
  },
  {
    czech:   "vysavač / lux",
    english: "hoover, vacuum cleaner",
    spanish: "aspiradora",
    german:  "Staubsauger"
  },
  {
    czech:   "prát / vyprat",
    english: "to wash the clothes (repeatedly / once)",
    spanish: "lavar la ropa",
    german:  "Wäsche waschen"
  },
  {
    czech:   "žehlit / vyžehlit",
    english: "to iron (repeatedly / once)",
    spanish: "planchar",
    german:  "bügeln"
  },
  {
    czech:   "mýt / umýt",
    english: "to wash (repeatedly / once)",
    spanish: "lavar",
    german:  "waschen"
  },
  {
    czech:   "vyčistit",
    english: "to clean",
    spanish: "limpiar",
    german:  "reinigen"
  },
  {
    czech:   "uklízet / uklidit",
    english: "to clean / to tidy (repeatedly / once)",
    spanish: "ordenar, limpiar",
    german:  "aufräumen, reinigen"
  },
  {
    czech:   "vysávat / vysát",
    english: "to vacuum (repeatedly / once)",
    spanish: "pasar la aspiradora",
    german:  "staubsaugen"
  },
  {
    czech:   "luxovat / vyluxovat",
    english: "to vacuum (repeatedly / once)",
    spanish: "pasar la aspiradora",
    german:  "staubsaugen"
  }
];
