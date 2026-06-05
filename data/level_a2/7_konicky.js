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
  },

,
{
  czech:   "fotbal",
  english: "football",
  spanish: "fútbol",
  german:  "Fußball"
},
{
  czech:   "hokej",
  english: "ice hockey",
  spanish: "hockey sobre hielo",
  german:  "Eishockey"
},
{
  czech:   "tenis",
  english: "tennis",
  spanish: "tenis",
  german:  "Tennis"
},
{
  czech:   "volejbal",
  english: "volleyball",
  spanish: "voleibol",
  german:  "Volleyball"
},
{
  czech:   "basketbal",
  english: "basketball",
  spanish: "baloncesto",
  german:  "Basketball"
},
{
  czech:   "lyžování",
  english: "skiing",
  spanish: "esquí",
  german:  "Skifahren"
},
{
  czech:   "plavání",
  english: "swimming",
  spanish: "natación",
  german:  "Schwimmen"
},
{
  czech:   "aerobik",
  english: "aerobics",
  spanish: "aeróbic",
  german:  "Aerobic"
},
{
  czech:   "atletika",
  english: "athletics",
  spanish: "atletismo",
  german:  "Leichtathletik"
},
{
  czech:   "gymnastika",
  english: "gymnastics",
  spanish: "gimnasia",
  german:  "Gymnastik"
},
{
  czech:   "cyklistika",
  english: "cycling",
  spanish: "ciclismo",
  german:  "Radsport"
},
{
  czech:   "fotbalista",
  english: "football player",
  spanish: "futbolista",
  german:  "Fußballspieler"
},
{
  czech:   "hokejista",
  english: "hockey player",
  spanish: "jugador de hockey",
  german:  "Eishockeyspieler"
},
{
  czech:   "sportovec/sportovkyně",
  english: "sportsman/sportswoman, athlete",
  spanish: "deportista",
  german:  "Sportler/Sportlerin"
},
{
  czech:   "hrát/zahrát si + akuzativ",
  english: "to play (what)",
  spanish: "jugar (qué)",
  german:  "spielen (was)"
},
{
  czech:   "dělat + sport",
  english: "to do (what sport)",
  spanish: "practicar (qué deporte)",
  german:  "Sport machen"
},
{
  czech:   "plavat/zaplavat si kde",
  english: "to swim (where)",
  spanish: "nadar (dónde)",
  german:  "schwimmen (wo)"
},
{
  czech:   "bruslit/zabruslit si kde",
  english: "to skate (where)",
  spanish: "patinar (dónde)",
  german:  "Schlittschuh laufen (wo)"
},
{
  czech:   "běhat kde",
  english: "to jog/run (where)",
  spanish: "correr (dónde)",
  german:  "laufen/joggen (wo)"
},
{
  czech:   "cvičit/zacvičit si kde",
  english: "to train (where)",
  spanish: "entrenar (dónde)",
  german:  "trainieren (wo)"
},
{
  czech:   "závod",
  english: "race",
  spanish: "carrera",
  german:  "Rennen"
},
{
  czech:   "soutěž",
  english: "contest/competition",
  spanish: "concurso, competición",
  german:  "Wettbewerb"
},
{
  czech:   "vyhrávat/vyhrát + nad + instrumentál",
  english: "to win against (whom)",
  spanish: "ganar contra (quién)",
  german:  "gegen jemanden gewinnen"
},
{
  czech:   "prohrávat/prohrát + s + instrumentál",
  english: "to lose with (whom)",
  spanish: "perder contra (quién)",
  german:  "gegen jemanden verlieren"
},
{
  czech:   "hřiště",
  english: "playground, pitch",
  spanish: "campo, patio de juegos",
  german:  "Spielplatz, Spielfeld"
},
{
  czech:   "stadion",
  english: "stadium",
  spanish: "estadio",
  german:  "Stadion"
},
{
  czech:   "tělocvična",
  english: "gym",
  spanish: "gimnasio",
  german:  "Turnhalle"
},
{
  czech:   "fitness/posilovna",
  english: "fitness studio",
  spanish: "gimnasio",
  german:  "Fitnessstudio"
},
{
  czech:   "bazén",
  english: "swimming pool",
  spanish: "piscina",
  german:  "Schwimmbad"
},
{
  czech:   "míč/balon",
  english: "ball",
  spanish: "pelota, balón",
  german:  "Ball"
},
{
  czech:   "kolo",
  english: "bicycle, wheel, round",
  spanish: "bicicleta, rueda, ronda",
  german:  "Fahrrad, Rad, Runde"
},
{
  czech:   "kino",
  english: "cinema",
  spanish: "cine",
  german:  "Kino"
},
{
  czech:   "divadlo",
  english: "theatre",
  spanish: "teatro",
  german:  "Theater"
},
{
  czech:   "muzeum",
  english: "museum",
  spanish: "museo",
  german:  "Museum"
},
{
  czech:   "galerie",
  english: "gallery",
  spanish: "galería",
  german:  "Galerie"
},
{
  czech:   "kulturní dům",
  english: "house of culture",
  spanish: "casa de cultura",
  german:  "Kulturhaus"
},
{
  czech:   "dávat",
  english: "to give, to put, to broadcast",
  spanish: "dar, poner, emitir",
  german:  "geben, legen, senden"
},
{
  czech:   "hrát",
  english: "to play",
  spanish: "jugar, actuar",
  german:  "spielen"
},
{
  czech:   "být otevřeno × zavřeno",
  english: "to be opened × closed",
  spanish: "estar abierto × cerrado",
  german:  "geöffnet × geschlossen sein"
},
{
  czech:   "film",
  english: "movie",
  spanish: "película",
  german:  "Film"
},
{
  czech:   "hra",
  english: "a play, a game",
  spanish: "obra, juego",
  german:  "Spiel, Theaterstück"
},
{
  czech:   "výstava",
  english: "exhibition",
  spanish: "exposición",
  german:  "Ausstellung"
},
{
  czech:   "chodit/jít kam",
  english: "to go regularly/once (where to)",
  spanish: "ir regularmente/una vez a",
  german:  "gehen (regelmäßig/einmal wohin)"
},
{
  czech:   "pokladna",
  english: "ticket office, cash desk, register",
  spanish: "taquilla, caja",
  german:  "Kasse"
},
{
  czech:   "vstupenka/lístek",
  english: "(entrance) ticket",
  spanish: "entrada, billete",
  german:  "Eintrittskarte"
},
{
  czech:   "kniha",
  english: "book",
  spanish: "libro",
  german:  "Buch"
},
{
  czech:   "číst/přečíst + akuzativ",
  english: "to read (what)",
  spanish: "leer (qué)",
  german:  "lesen (was)"
},
{
  czech:   "hudba",
  english: "music",
  spanish: "música",
  german:  "Musik"
}

];
