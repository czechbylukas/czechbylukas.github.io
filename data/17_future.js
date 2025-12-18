// data/17_future.js
const vocab = [
  {
    czech: "přečtu (perf.)",
    english: "I will read",
    spanish: "Voy a leer (terminado)",
    german: "Ich werde lesen (perfekt)"
  },
  {
    czech: "budu číst (imperf.)",
    english: "I will be reading",
    spanish: "Estaré leyendo (no terminado)",
    german: "Ich werde lesen (imperfekt)"
  },
  {
    czech: "udělám (perf.)",
    english: "I will do",
    spanish: "lo haré (terminado)",
    german: "Ich werde tun (perfekt)"
  },
  {
    czech: "budu dělat (imperf.)",
    english: "I will be doing",
    spanish: "Yo estaré haciendo (no terminado)",
    german: "Ich werde tun (imperfekt)"
  },
  {
    czech: "dám (perf.)",
    english: "I will give",
    spanish: "Yo daré (terminado)",
    german: "Ich werde geben (perfekt)"
  },
  {
    czech: "budu dávat (imperf.)",
    english: "I will be giving",
    spanish: "Estaré dando (no terminado)",
    german: "Ich werde geben (imperfekt)"
  },
  {
    czech: "podívám se (perf.)",
    english: "I will look / watch",
    spanish: "miraré (terminado)",
    german: "Ich werde schauen (perfekt)"
  },
  {
    czech: "budu dívat se (imperf.)",
    english: "I will be watching / looking",
    spanish: "Estaré mirando (no terminado)",
    german: "Ich werde schauen (imperfekt)"
  },
  {
    czech: "dostanu (perf.)",
    english: "I will get",
    spanish: "recibiré (terminado)",
    german: "Ich werde bekommen (perfekt)"
  },
  {
    czech: "budu dostávat (imperf.)",
    english: "I will be getting",
    spanish: "Estaré recibiendo (no terminado)",
    german: "Ich werde bekommen (imperfekt)"
  },
  {
    czech: "sním (perf.)",
    english: "I will eat",
    spanish: "comeré (terminado)",
    german: "Ich werde essen (perfekt)"
  },
  {
    czech: "budu jíst (imperf.)",
    english: "I will be eating",
    spanish: "estaré comiendo (no terminado)",
    german: "Ich werde essen (imperfekt)"
  },
  {
    czech: "koupím (perf.)",
    english: "I will buy",
    spanish: "compraré (terminado)",
    german: "Ich werde kaufen (perfekt)"
  },
  {
    czech: "budu kupovat (imperf.)",
    english: "I will be buying",
    spanish: "Estaré comprando (no terminado)",
    german: "Ich werde kaufen (imperfekt)"
  },
  {
    czech: "vyluxuju (perf.)",
    english: "I will vacuum / hoover",
    spanish: "aspiraré (terminado)",
    german: "Ich werde staubsaugen (perfekt)"
  },
  {
    czech: "budu luxovat (imperf.)",
    english: "I will be vacuum cleaning / hoovering",
    spanish: "Estaré aspirando (no terminado)",
    german: "Ich werde staubsaugen (imperfekt)"
  },
  {
    czech: "namaluju obraz (perf.)",
    english: "I will paint a picture",
    spanish: "Pintaré un cuadro (terminado)",
    german: "Ich werde ein Bild malen (perfekt)"
  },
  {
    czech: "budu malovat obraz (imperf.)",
    english: "I will be painting a picture",
    spanish: "estaré pintando un cuadro (no terminado)",
    german: "Ich werde ein Bild malen (imperfekt)"
  },
  {
    czech: "umyju (perf.)",
    english: "I will wash",
    spanish: "lavaré (terminado)",
    german: "Ich werde waschen (perfekt)"
  },
  {
    czech: "budu mýt (imperf.)",
    english: "I will be washing",
    spanish: "estaré lavando (no terminado)",
    german: "Ich werde waschen (imperfekt)"
  },
  {
    czech: "opravím (perf.)",
    english: "I will repair",
    spanish: "repararé (terminado)",
    german: "Ich werde reparieren (perfekt)"
  },
  {
    czech: "budu opravovat (imperf.)",
    english: "I will be repairing",
    spanish: "estaré reparando (no terminado)",
    german: "Ich werde reparieren (imperfekt)"
  },
  {
    czech: "vyperu (perf.)",
    english: "I will wash (do the laundry)",
    spanish: "Voy a lavar la ropa (terminado)",
    german: "Ich werde die Wäsche waschen (perfekt)"
  },
  {
    czech: "budu prát (imperf.)",
    english: "I will be washing (doing the laundry)",
    spanish: "estaré lavando la ropa (no terminado)",
    german: "Ich werde die Wäsche waschen (imperfekt)"
  },
  {
    czech: "vypiju (perf.)",
    english: "I will drink",
    spanish: "Voy a beber (terminado)",
    german: "Ich werde trinken (perfekt)"
  },
  {
    czech: "budu pít (imperf.)",
    english: "I will be drinking",
    spanish: "estaré bebiendo (no terminado)",
    german: "Ich werde trinken (imperfekt)"
  },
  {
    czech: "zaplatím (perf.)",
    english: "I will pay",
    spanish: "Voy a pagar (terminado)",
    german: "Ich werde bezahlen (perfekt)"
  },
  {
    czech: "budu platit (imperf.)",
    english: "I will be paying",
    spanish: "estaré pagando (no terminado)",
    german: "Ich werde bezahlen (imperfekt)"
  },
  {
    czech: "prodám (perf.)",
    english: "I will sell",
    spanish: "venderé (terminado)",
    german: "Ich werde verkaufen (perfekt)"
  },
  {
    czech: "budu prodávat (imperf.)",
    english: "I will be selling",
    spanish: "Estaré vendiendo (no terminado)",
    german: "Ich werde verkaufen (imperfekt)"
  },
  {
    czech: "připravím (perf.)",
    english: "I will prepare",
    spanish: "prepararé (terminado)",
    german: "Ich werde vorbereiten (perfekt)"
  },
  {
    czech: "budu připravovat (imperf.)",
    english: "I will be preparing",
    spanish: "Estaré preparando (no terminado)",
    german: "Ich werde vorbereiten (imperfekt)"
  },
  {
    czech: "napíšu (perf.)",
    english: "I will write",
    spanish: "escribiré (terminado)",
    german: "Ich werde schreiben (perfekt)"
  },
  {
    czech: "budu psát (imperf.)",
    english: "I will be writing",
    spanish: "Estaré escribiendo (no terminado)",
    german: "Ich werde schreiben (imperfekt)"
  },
  {
    czech: "zatelefonuju (perf.)",
    english: "I will call",
    spanish: "llamaré (terminado)",
    german: "Ich werde anrufen (perfekt)"
  },
  {
    czech: "budu telefonovat (imperf.)",
    english: "I will be calling",
    spanish: "Estaré llamando (no terminado)",
    german: "Ich werde anrufen (imperfekt)"
  },
  {
    czech: "naučím se (perf.)",
    english: "I will learn",
    spanish: "Aprenderé (terminado)",
    german: "Ich werde lernen (perfekt)"
  },
  {
    czech: "budu učit se (imperf.)",
    english: "I will be learning",
    spanish: "Estaré aprendiendo (no terminado)",
    german: "Ich werde lernen (imperfekt)"
  },
  {
    czech: "uklidím (perf.)",
    english: "I will clean / tidy up",
    spanish: "limpiaré (terminado)",
    german: "Ich werde aufräumen (perfekt)"
  },
  {
    czech: "budu uklízet (imperf.)",
    english: "I will be cleaning / tidying up",
    spanish: "Estaré limpiando (no terminado)",
    german: "Ich werde aufräumen (imperfekt)"
  },
  {
    czech: "uvařím (perf.)",
    english: "I will cook",
    spanish: "Yo cocinaré (terminado)",
    german: "Ich werde kochen (perfekt)"
  },
  {
    czech: "budu vařit (imperf.)",
    english: "I will be cooking",
    spanish: "Estaré cocinando (no terminado)",
    german: "Ich werde kochen (imperfekt)"
  },
  {
    czech: "zavolám (perf.)",
    english: "I will call",
    spanish: "llamaré (terminado)",
    german: "Ich werde anrufen (perfekt)"
  },
  {
    czech: "budu volat (imperf.)",
    english: "I will be calling",
    spanish: "Estaré llamando (no terminado)",
    german: "Ich werde anrufen (imperfekt)"
  },
  {
    czech: "ztratím (perf.)",
    english: "I will lose",
    spanish: "perderé (terminado)",
    german: "Ich werde verlieren (perfekt)"
  },
  {
    czech: "budu ztrácet (imperf.)",
    english: "I will be losing",
    spanish: "estaré perdiendo (no terminado)",
    german: "Ich werde verlieren (imperfekt)"
  },
  {
    czech: "vyžehlím (perf.)",
    english: "I will iron",
    spanish: "plancharé (terminado)",
    german: "Ich werde bügeln (perfekt)"
  },
  {
    czech: "budu žehlit (imperf.)",
    english: "I will be ironing",
    spanish: "Estaré planchando (no terminado)",
    german: "Ich werde bügeln (imperfekt)"
  }
];
