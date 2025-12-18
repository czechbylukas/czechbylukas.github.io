const vocab = [
  // Questions about verb aspect
  {
    czech:   "ukončený",
    english: "A verb that is PERFECTIVE means that the action is ______",
    spanish: "Un verbo PERFECTIVO muestra que la acción es ______",
    german:  "Ein PERFEKTIVES Verb zeigt an, dass die Handlung ist ______"
  },
  {
    czech:   "neukončený",
    english: "A verb that is IMPERFECTIVE shows that the action is ______",
    spanish: "Un verbo IMPERFECTIVO muestra que la acción es ______",
    german:  "Ein IMPERFEKTIVES Verb zeigt an, dass die Handlung ist ______"
  },

  // Perfective / Imperfective verb pairs
  {
    czech:   "přečíst",
    english: "to read (perfective)",
    spanish: "leer (perfective)",
    german:  "lesen (einmalig)"
  },
  {
    czech:   "číst",
    english: "to be reading (imperfective)",
    spanish: "estar leyendo (imperfective)",
    german:  "lesen (wiederholend)"
  },
  {
    czech:   "udělat",
    english: "to do (perfective)",
    spanish: "hacer (perfective)",
    german:  "machen (einmalig)"
  },
  {
    czech:   "dělat",
    english: "to be doing (imperfective)",
    spanish: "estar haciendo (imperfective)",
    german:  "machen (wiederholend)"
  },
  {
    czech:   "dát",
    english: "to give (perfective)",
    spanish: "dar (perfective)",
    german:  "geben (einmalig)"
  },
  {
    czech:   "dávat",
    english: "to be giving (imperfective)",
    spanish: "estar dando (imperfective)",
    german:  "geben (wiederholend)"
  },
  {
    czech:   "podívat se",
    english: "to look (perfective)",
    spanish: "mirar (perfective)",
    german:  "ansehen (einmalig)"
  },
  {
    czech:   "dívat se",
    english: "to be looking (imperfective)",
    spanish: "estar mirando (imperfective)",
    german:  "sehen (wiederholend)"
  },
  {
    czech:   "dostat",
    english: "to get (perfective)",
    spanish: "recibir (perfective)",
    german:  "bekommen (einmalig)"
  },
  {
    czech:   "dostávat",
    english: "to be getting (imperfective)",
    spanish: "estar recibiendo (imperfective)",
    german:  "bekommen (wiederholend)"
  },
  {
    czech:   "sníst",
    english: "to eat up (perfective)",
    spanish: "comer (perfective)",
    german:  "aufessen (einmalig)"
  },
  {
    czech:   "jíst",
    english: "to be eating (imperfective)",
    spanish: "estar comiendo (imperfective)",
    german:  "essen (wiederholend)"
  },
  {
    czech:   "koupit",
    english: "to buy (perfective)",
    spanish: "comprar (perfective)",
    german:  "kaufen (einmalig)"
  },
  {
    czech:   "kupovat",
    english: "to be buying (imperfective)",
    spanish: "estar comprando (imperfective)",
    german:  "kaufen (wiederholend)"
  },
  {
    czech:   "vyluxovat",
    english: "to vacuum (perfective)",
    spanish: "aspirar (perfective)",
    german:  "staubsaugen (einmalig)"
  },
  {
    czech:   "luxovat",
    english: "to be vacuuming (imperfective)",
    spanish: "estar aspirando (imperfective)",
    german:  "staubsaugen (wiederholend)"
  },
  {
    czech:   "namalovat obraz",
    english: "to paint a picture (perfective)",
    spanish: "pintar un cuadro (perfective)",
    german:  "ein Bild malen (einmalig)"
  },
  {
    czech:   "malovat obraz",
    english: "to be painting a picture (imperfective)",
    spanish: "estar pintando un cuadro (imperfective)",
    german:  "ein Bild malen (wiederholend)"
  },
  {
    czech:   "umýt",
    english: "to wash (perfective)",
    spanish: "lavar (perfective)",
    german:  "waschen (einmalig)"
  },
  {
    czech:   "mýt",
    english: "to be washing (imperfective)",
    spanish: "estar lavando (imperfective)",
    german:  "waschen (wiederholend)"
  },
  {
    czech:   "opravit",
    english: "to repair (perfective)",
    spanish: "reparar (perfective)",
    german:  "reparieren (einmalig)"
  },
  {
    czech:   "opravovat",
    english: "to be repairing (imperfective)",
    spanish: "estar reparando (imperfective)",
    german:  "reparieren (wiederholend)"
  },
  {
    czech:   "vyprat",
    english: "to wash clothes (perfective)",
    spanish: "lavar ropa (perfective)",
    german:  "waschen (einmalig)"
  },
  {
    czech:   "prát",
    english: "to be washing clothes (imperfective)",
    spanish: "estar lavando ropa (imperfective)",
    german:  "waschen (wiederholend)"
  },
  {
    czech:   "vypít",
    english: "to drink up (perfective)",
    spanish: "beber (perfective)",
    german:  "austrinken (einmalig)"
  },
  {
    czech:   "pít",
    english: "to be drinking (imperfective)",
    spanish: "estar bebiendo (imperfective)",
    german:  "trinken (wiederholend)"
  },
  {
    czech:   "zaplatit",
    english: "to pay (perfective)",
    spanish: "pagar (perfective)",
    german:  "bezahlen (einmalig)"
  },
  {
    czech:   "platit",
    english: "to be paying (imperfective)",
    spanish: "estar pagando (imperfective)",
    german:  "bezahlen (wiederholend)"
  },
  {
    czech:   "prodat",
    english: "to sell (perfective)",
    spanish: "vender (perfective)",
    german:  "verkaufen (einmalig)"
  },
  {
    czech:   "prodávat",
    english: "to be selling (imperfective)",
    spanish: "estar vendiendo (imperfective)",
    german:  "verkaufen (wiederholend)"
  },
  {
    czech:   "připravit",
    english: "to prepare (perfective)",
    spanish: "preparar (perfective)",
    german:  "vorbereiten (einmalig)"
  },
  {
    czech:   "připravovat",
    english: "to be preparing (imperfective)",
    spanish: "estar preparando (imperfective)",
    german:  "vorbereiten (wiederholend)"
  },
  {
    czech:   "napsat",
    english: "to write (perfective)",
    spanish: "escribir (perfective)",
    german:  "schreiben (einmalig)"
  },
  {
    czech:   "psát",
    english: "to be writing (imperfective)",
    spanish: "estar escribiendo (imperfective)",
    german:  "schreiben (wiederholend)"
  },
  {
    czech:   "zatelefonovat",
    english: "to make a call (perfective)",
    spanish: "llamar (perfective)",
    german:  "anrufen (einmalig)"
  },
  {
    czech:   "telefonovat",
    english: "to be making a call (imperfective)",
    spanish: "estar llamando (imperfective)",
    german:  "telefonieren (wiederholend)"
  },
  {
    czech:   "naučit se",
    english: "to learn (perfective)",
    spanish: "aprender (perfective)",
    german:  "lernen (einmalig)"
  },
  {
    czech:   "učit se",
    english: "to be learning (imperfective)",
    spanish: "estar aprendiendo (imperfective)",
    german:  "lernen (wiederholend)"
  },
  {
    czech:   "uklidit",
    english: "to tidy up (perfective)",
    spanish: "ordenar (perfective)",
    german:  "aufräumen (einmalig)"
  },
  {
    czech:   "uklízet",
    english: "to be tidying up (imperfective)",
    spanish: "estar ordenando (imperfective)",
    german:  "aufräumen (wiederholend)"
  },
  {
    czech:   "uvařit",
    english: "to cook (perfective)",
    spanish: "cocinar (perfective)",
    german:  "kochen (einmalig)"
  },
  {
    czech:   "vařit",
    english: "to be cooking (imperfective)",
    spanish: "estar cocinando (imperfective)",
    german:  "kochen (wiederholend)"
  },
  {
    czech:   "zavolat",
    english: "to call (perfective)",
    spanish: "llamar (perfective)",
    german:  "anrufen (einmalig)"
  },
  {
    czech:   "volat",
    english: "to be calling (imperfective)",
    spanish: "estar llamando (imperfective)",
    german:  "rufen / anrufen (wiederholend)"
  },
  {
    czech:   "ztratit",
    english: "to lose (perfective)",
    spanish: "perder (perfective)",
    german:  "verlieren (einmalig)"
  },
  {
    czech:   "ztrácet",
    english: "to be losing (imperfective)",
    spanish: "estar perdiendo (imperfective)",
    german:  "verlieren (wiederholend)"
  },
  {
    czech:   "vyžehlit",
    english: "to iron (perfective)",
    spanish: "planchar (perfective)",
    german:  "bügeln (einmalig)"
  },
  {
    czech:   "žehlit",
    english: "to be ironing (imperfective)",
    spanish: "estar planchando (imperfective)",
    german:  "bügeln (wiederholend)"
  }
];
