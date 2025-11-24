// data/level_a2/6_leisure.js
const vocab = [
  {
    czech:   "víkend",
    english: "weekend",
    spanish: "fin de semana",
    german:  "Wochenende"
  },
  {
    czech:   "svátek",
    english: "public holiday, name day",
    spanish: "festivo, santo",
    german:  "Feiertag"
  },
  {
    czech:   "prázdniny",
    english: "vacation, holidays (at school)",
    spanish: "vacaciones",
    german:  "Ferien"
  },
  {
    czech:   "dovolená",
    english: "vacation (at work)",
    spanish: "vacaciones",
    german:  "Urlaub"
  },
  {
    czech:   "mít volno",
    english: "to be free, to be off work",
    spanish: "estar libre",
    german:  "frei haben"
  },
  {
    czech:   "volný",
    english: "free",
    spanish: "libre",
    german:  "frei"
  },
  {
    czech:   "počítač",
    english: "computer",
    spanish: "ordenador / computadora",
    german:  "Computer"
  },
  {
    czech:   "procházka",
    english: "walk, stroll",
    spanish: "paseo",
    german:  "Spaziergang"
  },
  {
    czech:   "výlet",
    english: "trip, excursion",
    spanish: "excursión",
    german:  "Ausflug"
  },
  {
    czech:   "hospoda",
    english: "pub, bar",
    spanish: "bar",
    german:  "Kneipe"
  },
  {
    czech:   "nakupování",
    english: "shopping",
    spanish: "compras",
    german:  "Einkaufen"
  },
  {
    czech:   "návštěva",
    english: "visit",
    spanish: "visita",
    german:  "Besuch"
  },
  {
    czech:   "poslouchat/poslechnout si + akuzativ",
    english: "to listen (what)",
    spanish: "escuchar (qué)",
    german:  "hören (was)"
  },
  {
    czech:   "procházet se/projít se kde",
    english: "to walk/stroll (where)",
    spanish: "pasear (dónde)",
    german:  "spazieren gehen (wo)"
  },
  {
    czech:   "chodit na + kam",
    english: "to go (regularly, on foot) (+ where)",
    spanish: "ir regularmente a",
    german:  "gehen (regelmäßig wohin)"
  },
  {
    czech:   "jezdit na + kam",
    english: "to go (regularly, by vehicle) (+ where)",
    spanish: "ir regularmente en (vehículo) a",
    german:  "fahren (regelmäßig wohin)"
  },
  {
    czech:   "pouštět si/pustit si + akuzativ",
    english: "to play (music) (what)",
    spanish: "poner (música)",
    german:  "abspielen (Musik)"
  },
  {
    czech:   "posílat/poslat + akuzativ",
    english: "to send (what)",
    spanish: "enviar (qué)",
    german:  "schicken (was)"
  },
  {
    czech:   "koníček, hobby",
    english: "hobby",
    spanish: "afición, pasatiempo",
    german:  "Hobby"
  },
  {
    czech:   "hudební nástroj",
    english: "musical instrument",
    spanish: "instrumento musical",
    german:  "Musikinstrument"
  },
  {
    czech:   "housle",
    english: "violin",
    spanish: "violín",
    german:  "Violine"
  },
  {
    czech:   "šachy",
    english: "chess",
    spanish: "ajedrez",
    german:  "Schach"
  },
  {
    czech:   "karty",
    english: "cards",
    spanish: "cartas",
    german:  "Karten"
  },
  {
    czech:   "kulečník",
    english: "pool; billiards",
    spanish: "billar",
    german:  "Billard"
  },
  {
    czech:   "zahrada",
    english: "garden",
    spanish: "jardín",
    german:  "Garten"
  },
  {
    czech:   "domácí práce",
    english: "household chores",
    spanish: "tareas domésticas",
    german:  "Hausarbeit"
  },
  {
    czech:   "mít zájem o + akuzativ",
    english: "to have interest about (what)",
    spanish: "interesarse en (qué)",
    german:  "Interesse haben an (was)"
  },
  {
    czech:   "zajímat se o + akuzativ",
    english: "to be interested in (what)",
    spanish: "interesarse en (qué)",
    german:  "sich interessieren für (was)"
  },
  {
    czech:   "bavit + osobní zájmeno v akuzativu + nominativ",
    english: "to entertain (what/who) (what)",
    spanish: "divertir (a quién / qué)",
    german:  "unterhalten (wen / was)"
  },
  {
    czech:   "hrát na + akuzativ",
    english: "to play (what)",
    spanish: "tocar (instrumento)",
    german:  "spielen (Instrument)"
  },
  {
    czech:   "tancovat",
    english: "to dance",
    spanish: "bailar",
    german:  "tanzen"
  },
  {
    czech:   "zpívat",
    english: "to sing",
    spanish: "cantar",
    german:  "singen"
  },
  {
    czech:   "fotografovat",
    english: "to take photos",
    spanish: "fotografiar",
    german:  "fotografieren"
  },
  {
    czech:   "cestovat",
    english: "to travel",
    spanish: "viajar",
    german:  "reisen"
  },
  {
    czech:   "chodit na procházky",
    english: "to go for walks",
    spanish: "salir a pasear",
    german:  "spazieren gehen"
  },
  {
    czech:   "jezdit na kole",
    english: "to ride a bike",
    spanish: "andar en bicicleta",
    german:  "Fahrrad fahren"
  },
  {
    czech:   "sportovat",
    english: "to do sports",
    spanish: "hacer deporte",
    german:  "Sport treiben"
  },
  {
    czech:   "plavat",
    english: "to swim",
    spanish: "nadar",
    german:  "schwimmen"
  },
  {
    czech:   "sbírat + akuzativ",
    english: "to collect (what)",
    spanish: "coleccionar (qué)",
    german:  "sammeln (was)"
  },
  {
    czech:   "chytat + akuzativ",
    english: "to catch (what)",
    spanish: "atrapar (qué)",
    german:  "fangen (was)"
  },
  {
    czech:   "chovat + akuzativ",
    english: "to breed (what)",
    spanish: "criar (qué)",
    german:  "züchten (was)"
  },
  {
    czech:   "malovat + akuzativ",
    english: "to paint (what)",
    spanish: "pintar (qué)",
    german:  "malen (was)"
  }
];
