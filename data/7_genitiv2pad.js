// data/3_prepositions.js
const vocab = [
  {
    czech: "bez",
    english: "without",
    spanish: "sin",
    german: "ohne"
  },
  {
    czech: "během",
    english: "during",
    spanish: "durante",
    german: "während"
  },
  {
    czech: "blízko",
    english: "near, nearby",
    spanish: "cerca",
    german: "in der Nähe"
  },
  {
    czech: "do",
    english: "into / to",
    spanish: "hasta",
    german: "bis (in, zu, nach)"
  },
  {
    czech: "kolem",
    english: "around, past",
    spanish: "en alrededor",
    german: "herum"
  },
  {
    czech: "kromě",
    english: "except, apart of",
    spanish: "además",
    german: "außer"
  },
  {
    czech: "místo",
    english: "instead of",
    spanish: "al lugar de",
    german: "anstatt"
  },
  {
    czech: "od",
    english: "from (the surface)",
    spanish: "de, desde",
    german: "von (aus, seit, ab)"
  },
  {
    czech: "podle",
    english: "according to",
    spanish: "según",
    german: "laut"
  },
  {
    czech: "u",
    english: "(near)by",
    spanish: "cerca",
    german: "bei"
  },
  {
    czech: "uprostřed",
    english: "in the middle of",
    spanish: "en la mitad",
    german: "in der Mitte, inmitten"
  },
  {
    czech: "vedle",
    english: "next to",
    spanish: "al lado de",
    german: "neben"
  },
  {
    czech: "z",
    english: "from (the inside)",
    spanish: "de, desde",
    german: "aus"
  },
  {
    czech: "městO -> městA",
    english: "city (neutral)",
    spanish: "ciudad",
    german: "Stadt"
  },
  {
    czech: "ženA -> ženY",
    english: "woman (feminine)",
    spanish: "mujer",
    german: "Frau"
  },
  {
    czech: "řůžE -> růžE",
    english: "rose (feminine)",
    spanish: "rosa",
    german: "Rose"
  },
  {
    czech: "pán -> pánA",
    english: "man (masculine, animated)",
    spanish: "hombre",
    german: "Mann"
  },
  {
    czech: "hrad -> hradU",
    english: "castle (masculine, inanimated)",
    spanish: "castillo",
    german: "Burg"
  },
  {
    czech: "muž -> mužE",
    english: "man (masculine, animated)",
    spanish: "hombre",
    german: "Mann"
  },
  {
    czech: "stroj -> strojE",
    english: "machine (masculine, inanimated)",
    spanish: "máquina",
    german: "Maschine"
  },
  {
    czech: "Jdu do restauracE.",
    english: "I am going (on foot) to the restaurant.",
    spanish: "Voy al restaurante.",
    german: "Ich gehe in ein Restaurant."
  },
  {
    czech: "Jdu do parkU.",
    english: "I am going (on foot) to the park.",
    spanish: "Voy a un parque.",
    german: "Ich gehe in den Park."
  },
  {
    czech: "Jdu do kinA.",
    english: "I am going (on foot) to the cinema.",
    spanish: "Voy al cine.",
    german: "Ich gehe ins Kino."
  },
  {
    czech: "Jdu do hospodY.",
    english: "I am going (on foot) to the pub.",
    spanish: "Voy a la taberna / pub.",
    german: "Ich gehe in die Kneipe."
  },
  {
    czech: "Jsem z ČeskA.",
    english: "I am from Czech Republic.",
    spanish: "Soy de Chequía.",
    german: "Ich komme aus der Tschechischen Republik."
  },
  {
    czech: "Jsem z AmerikY.",
    english: "I am from America.",
    spanish: "Soy de América.",
    german: "Ich komme aus Amerika."
  },
  {
    czech: "Jsem z VietnamU.",
    english: "I am from Vietnam.",
    spanish: "Soy de Vietnam.",
    german: "Ich komme aus Vietnam."
  },
  {
    czech: "Jsem z BangladéšE.",
    english: "I am from Bangladesh.",
    spanish: "Soy de Bangladesh.",
    german: "Ich komme aus Bangladesch."
  },
  {
    czech: "Jsem z ItáliE.",
    english: "I am from Italy.",
    spanish: "Soy de Italia.",
    german: "Ich komme aus Italien."
  },
  {
    czech: "Jdu ze školY do kinA.",
    english: "I am going from school to cinema.",
    spanish: "Voy de la escuela al cine.",
    german: "Ich gehe von der Schule ins Kino."
  },
  {
    czech: "Jdu od doktorA.",
    english: "I come from the doctor.",
    spanish: "Voy del médico.",
    german: "Ich komme vom Arzt."
  },
  {
    czech: "Jdu od maminkY do prácE.",
    english: "I come from mum to work.",
    spanish: "Voy (de casa) de mi madre al trabajo.",
    german: "Ich gehe von meiner Mutter zur Arbeit."
  },
  {
    czech: "Bydlím u kamarádkY ze školY.",
    english: "I live by a friend from the school.",
    spanish: "Vivo con un amigo de la escuela.",
    german: "Ich lebe bei einem Freund aus der Schule zusammen."
  },
  {
    czech: "Blízko městA je hrad.",
    english: "Near the city there is a castle.",
    spanish: "Cerca de la ciudad hay un castillo.",
    german: "In der Nähe der Stadt gibt es eine Burg."
  },
  {
    czech: "Kolem školY je park.",
    english: "Around the school there is a park.",
    spanish: "Hay un parque alrededor de la escuela.",
    german: "Rund um die Schule gibt es einen Park."
  },
  {
    czech: "Vedle bankY je pošta.",
    english: "Next to the bank there is a post office.",
    spanish: "Hay una oficina de correos al lado del banco.",
    german: "Neben der Bank befindet sich ein Postamt."
  },
  {
    czech: "2 litry mléka",
    english: "2 litres of milk",
    spanish: "2 litros de leche",
    german: "2 Liter Milch"
  },
  {
    czech: "bratr Lukáše",
    english: "Brother of Lukáš",
    spanish: "Hermano de Lukas",
    german: "Bruder von Lukáš"
  },
  {
    czech: "5 piv",
    english: "5 beers",
    spanish: "5 cervezas",
    german: "5 Biere"
  },
  {
    czech: "Na guláš potřebuju 2 kila masa.",
    english: "I need 2 kilos of meat for the goulash.",
    spanish: "Necesito 2 kilos de carne para el gulash.",
    german: "Für das Gulasch brauche ich 2 Kilo Fleisch."
  },
  {
    czech: "Koupil jsem 2 metry látky na šaty.",
    english: "I bought 2 meters of fabric for a dress.",
    spanish: "Compré 2 metros de tela para un vestido.",
    german: "Ich habe 2 Meter Stoff für ein Kleid gekauft."
  },
  {
    czech: "Vzal jsem 4 litry benzínu.",
    english: "I took 4 liters of petrol.",
    spanish: "Tomé 4 litros de gasolina.",
    german: "Ich habe 4 Liter Benzin genommen."
  },
  {
    czech: "lžíce cukru",
    english: "a spoon of sugar",
    spanish: "cucharada de azúcar",
    german: "ein Löffel Zucker"
  },
  {
    czech: "šálek kávy",
    english: "cup of coffee",
    spanish: "una taza de café",
    german: "eine Tasse Kaffee"
  },
  {
    czech: "sklenice vody",
    english: "a glass of water",
    spanish: "un vaso de agua",
    german: "ein Glas Wasser"
  },
  {
    czech: "trochu šlehačky",
    english: "a bit of cream",
    spanish: "un poco de crema batida",
    german: "ein bisschen Sahne"
  },
  {
    czech: "hodně práce",
    english: "a lot of work",
    spanish: "mucho trabajo",
    german: "viel Arbeit"
  },
  {
    czech: "šunka Evy",
    english: "ham of Eva",
    spanish: "jamón de Eva",
    german: "Schinken von Eva"
  },
  {
    czech: "salám Petra",
    english: "salami of Petr",
    spanish: "salami de Pedro",
    german: "Salami von Petr"
  }
];
