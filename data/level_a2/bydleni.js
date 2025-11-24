// data/level_a2/8_home.js
const vocab = [
  {
    czech:   "byt",
    english: "apartment, flat",
    spanish: "apartamento, piso",
    german:  "Wohnung, Appartement"
  },
  {
    czech:   "dům",
    english: "house",
    spanish: "casa",
    german:  "Haus"
  },
  {
    czech:   "bydlet",
    english: "to stay, to live",
    spanish: "vivir, quedarse",
    german:  "wohnen, leben"
  },
  {
    czech:   "zařízený",
    english: "furnished",
    spanish: "amueblado",
    german:  "möbliert"
  },
  {
    czech:   "nezařízený",
    english: "unfurnished",
    spanish: "sin amueblar",
    german:  "unmöbliert"
  },
  {
    czech:   "nájem",
    english: "rent",
    spanish: "alquiler",
    german:  "Miete"
  },
  {
    czech:   "majitel/ka",
    english: "owner",
    spanish: "propietario/a",
    german:  "Eigentümer/in"
  },
  {
    czech:   "soused/ka",
    english: "neighbour",
    spanish: "vecino/a",
    german:  "Nachbar/in"
  },
  {
    czech:   "spolubydlící",
    english: "roommate, flatmate",
    spanish: "compañero/a de piso",
    german:  "Mitbewohner/in"
  },
  {
    czech:   "pronajímat/pronajmout + akuzativ",
    english: "to rent ... (what)",
    spanish: "alquilar ... (qué)",
    german:  "vermieten ... (was)"
  },
  {
    czech:   "místnost",
    english: "room",
    spanish: "habitación",
    german:  "Zimmer"
  },
  {
    czech:   "kuchyně/kuchyň",
    english: "kitchen",
    spanish: "cocina",
    german:  "Küche"
  },
  {
    czech:   "pokoj",
    english: "room",
    spanish: "habitación",
    german:  "Zimmer"
  },
  {
    czech:   "obývací pokoj/obývák",
    english: "living room",
    spanish: "sala de estar",
    german:  "Wohnzimmer"
  },
  {
    czech:   "ložnice",
    english: "bedroom",
    spanish: "dormitorio",
    german:  "Schlafzimmer"
  },
  {
    czech:   "koupelna",
    english: "bathroom",
    spanish: "baño",
    german:  "Badezimmer"
  },
  {
    czech:   "záchod/WC/toaleta",
    english: "toilet",
    spanish: "aseo, baño",
    german:  "Toilette"
  },
  {
    czech:   "okno",
    english: "window",
    spanish: "ventana",
    german:  "Fenster"
  },
  {
    czech:   "dveře",
    english: "door",
    spanish: "puerta",
    german:  "Tür"
  },
  {
    czech:   "chodba",
    english: "corridor, hallway",
    spanish: "pasillo",
    german:  "Flur, Korridor"
  },
  {
    czech:   "schod",
    english: "stair, step",
    spanish: "escalón",
    german:  "Treppe, Stufe"
  },
  {
    czech:   "zahrada",
    english: "garden",
    spanish: "jardín",
    german:  "Garten"
  },
  {
    czech:   "garáž",
    english: "garage",
    spanish: "garaje",
    german:  "Garage"
  },
  {
    czech:   "klidný",
    english: "peaceful, quiet, calm",
    spanish: "tranquilo, calmado",
    german:  "ruhig, friedlich"
  },
  {
    czech:   "nábytek",
    english: "furniture",
    spanish: "muebles",
    german:  "Möbel"
  },
  {
    czech:   "stůl",
    english: "table, desk",
    spanish: "mesa, escritorio",
    german:  "Tisch, Schreibtisch"
  },
  {
    czech:   "židle",
    english: "chair",
    spanish: "silla",
    german:  "Stuhl"
  },
  {
    czech:   "skříň",
    english: "wardrobe",
    spanish: "armario",
    german:  "Schrank"
  },
  {
    czech:   "postel",
    english: "bed",
    spanish: "cama",
    german:  "Bett"
  },
  {
    czech:   "gauč, pohovka, sedačka",
    english: "couch, sofa",
    spanish: "sofá",
    german:  "Sofa, Couch"
  },
  {
    czech:   "sprcha",
    english: "shower",
    spanish: "ducha",
    german:  "Dusche"
  },
  {
    czech:   "vana",
    english: "bathtub",
    spanish: "bañera",
    german:  "Badewanne"
  },
  {
    czech:   "umyvadlo",
    english: "washbasin, sink",
    spanish: "lavabo",
    german:  "Waschbecken"
  },
  {
    czech:   "domácí spotřebič",
    english: "household appliance",
    spanish: "electrodoméstico",
    german:  "Haushaltsgerät"
  },
  {
    czech:   "televizor / televize",
    english: "TV",
    spanish: "televisor",
    german:  "Fernseher"
  },
  {
    czech:   "rádio",
    english: "radio",
    spanish: "radio",
    german:  "Radio"
  },
  {
    czech:   "počítač",
    english: "computer",
    spanish: "ordenador, computadora",
    german:  "Computer"
  },
  {
    czech:   "lednička, lednice, chladnička",
    english: "fridge",
    spanish: "nevera",
    german:  "Kühlschrank"
  },
  {
    czech:   "pračka",
    english: "washing machine",
    spanish: "lavadora",
    german:  "Waschmaschine"
  },
  {
    czech:   "sporák",
    english: "cooker, stove",
    spanish: "cocina",
    german:  "Herd"
  },
  {
    czech:   "mikrovlnka",
    english: "microwave oven",
    spanish: "microondas",
    german:  "Mikrowelle"
  },
  {
    czech:   "lampa",
    english: "lamp",
    spanish: "lámpara",
    german:  "Lampe"
  },
  {
    czech:   "fungovat",
    english: "to work, operate",
    spanish: "funcionar",
    german:  "funktionieren"
  },
  {
    czech:   "opravovat/opravit + akuzativ",
    english: "to repair ... (what)",
    spanish: "reparar ... (qué)",
    german:  "reparieren ... (was)"
  },
  {
    czech:   "pustit + akuzativ",
    english: "to turn on ... (water)",
    spanish: "abrir ... (agua)",
    german:  "anschalten ... (was)"
  },
  {
    czech:   "zastavit + akuzativ",
    english: "to stop ... (water)",
    spanish: "cerrar ... (agua)",
    german:  "stoppen ... (was)"
  },
  {
    czech:   "zapínat/zapnout + akuzativ",
    english: "to turn on ... (what)",
    spanish: "encender ... (qué)",
    german:  "einschalten ... (was)"
  },
  {
    czech:   "vypínat/vypnout + akuzativ",
    english: "to turn off ... (what)",
    spanish: "apagar ... (qué)",
    german:  "ausschalten ... (was)"
  },
  {
    czech:   "rozsvítit + akuzativ",
    english: "to turn the light on",
    spanish: "encender la luz",
    german:  "Licht einschalten"
  },
  {
    czech:   "zhasnout + akuzativ",
    english: "to turn the light off",
    spanish: "apagar la luz",
    german:  "Licht ausschalten"
  },
  {
    czech:   "topit + instrumentál",
    english: "to heat (using what)",
    spanish: "calentar con ...",
    german:  "heizen mit ..."
  },
  {
    czech:   "rozbitý",
    english: "broken",
    spanish: "roto",
    german:  "kaputt"
  },
  {
    czech:   "zrcadlo",
    english: "mirror",
    spanish: "espejo",
    german:  "Spiegel"
  },
  {
    czech:   "stěna / zeď",
    english: "wall (in a room / in general)",
    spanish: "pared",
    german:  "Wand, Mauer"
  }
];
