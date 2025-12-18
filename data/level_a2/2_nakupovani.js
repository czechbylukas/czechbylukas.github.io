// data/level_a2/7_shopping.js
const vocab = [
  {
    czech:   "obchod",
    english: "shop",
    spanish: "tienda",
    german:  "Geschäft"
  },
  {
    czech:   "supermarket",
    english: "supermarket",
    spanish: "supermercado",
    german:  "Supermarkt"
  },
  {
    czech:   "nákupní centrum",
    english: "shopping centre",
    spanish: "centro comercial",
    german:  "Einkaufszentrum"
  },
  {
    czech:   "pekařství, pekárna",
    english: "bakery",
    spanish: "panadería",
    german:  "Bäckerei"
  },
  {
    czech:   "cukrárna",
    english: "sweet shop",
    spanish: "confitería",
    german:  "Süßwarengeschäft"
  },
  {
    czech:   "řeznictví",
    english: "butcher shop",
    spanish: "carnicería",
    german:  "Metzgerei"
  },
  {
    czech:   "ovoce a zelenina",
    english: "fruits and veggies",
    spanish: "frutas y verduras",
    german:  "Obst und Gemüse"
  },
  {
    czech:   "papírnictví",
    english: "stationary store",
    spanish: "papelería",
    german:  "Schreibwarenladen"
  },
  {
    czech:   "lékárna",
    english: "pharmacy",
    spanish: "farmacia",
    german:  "Apotheke"
  },
  {
    czech:   "drogerie",
    english: "drug store (no medicine, cleaning and hygiene items)",
    spanish: "tienda de productos de higiene",
    german:  "Drogerie"
  },
  {
    czech:   "trh",
    english: "market",
    spanish: "mercado",
    german:  "Markt"
  },
  {
    czech:   "potraviny",
    english: "grocery store",
    spanish: "tienda de comestibles",
    german:  "Lebensmittelgeschäft"
  },
  {
    czech:   "oblečení",
    english: "clothing; clothes",
    spanish: "ropa",
    german:  "Kleidung"
  },
  {
    czech:   "boty",
    english: "shoes, boots",
    spanish: "zapatos, botas",
    german:  "Schuhe, Stiefel"
  },
  {
    czech:   "dárek",
    english: "gift",
    spanish: "regalo",
    german:  "Geschenk"
  },
  {
    czech:   "nádobí",
    english: "dishes",
    spanish: "vajilla",
    german:  "Geschirr"
  },
  {
    czech:   "bunda",
    english: "jacket",
    spanish: "chaqueta",
    german:  "Jacke"
  },
  {
    czech:   "košile",
    english: "button down shirt",
    spanish: "camisa",
    german:  "Hemd"
  },
  {
    czech:   "kalhoty",
    english: "trousers, pants",
    spanish: "pantalones",
    german:  "Hose"
  },
  {
    czech:   "džíny, rifle",
    english: "jeans",
    spanish: "vaqueros",
    german:  "Jeans"
  },
  {
    czech:   "tričko, triko",
    english: "t-shirt",
    spanish: "camiseta",
    german:  "T-Shirt"
  },
  {
    czech:   "svetr",
    english: "sweater",
    spanish: "suéter",
    german:  "Pullover"
  },
  {
    czech:   "šaty",
    english: "dress",
    spanish: "vestido",
    german:  "Kleid"
  },
  {
    czech:   "sukně",
    english: "skirt",
    spanish: "falda",
    german:  "Rock"
  },
  {
    czech:   "spodní prádlo",
    english: "underwear",
    spanish: "ropa interior",
    german:  "Unterwäsche"
  },
  {
    czech:   "ponožky",
    english: "socks",
    spanish: "calcetines",
    german:  "Socken"
  },
  {
    czech:   "čepice",
    english: "cap / hat",
    spanish: "gorra / sombrero",
    german:  "Mütze / Hut"
  },
  {
    czech:   "šátek, šála",
    english: "scarf",
    spanish: "pañuelo / bufanda",
    german:  "Tuch / Schal"
  },
  {
    czech:   "rukavice",
    english: "gloves",
    spanish: "guantes",
    german:  "Handschuhe"
  },
  {
    czech:   "deštník",
    english: "umbrella",
    spanish: "paraguas",
    german:  "Regenschirm"
  },
  {
    czech:   "batoh",
    english: "backpack",
    spanish: "mochila",
    german:  "Rucksack"
  },
  {
    czech:   "kabelka",
    english: "handbag",
    spanish: "bolso",
    german:  "Handtasche"
  },
  {
    czech:   "taška",
    english: "bag",
    spanish: "bolsa",
    german:  "Tasche"
  },
  {
    czech:   "cena",
    english: "price",
    spanish: "precio",
    german:  "Preis"
  },
  {
    czech:   "sleva",
    english: "discount",
    spanish: "descuento",
    german:  "Rabatt"
  },
  {
    czech:   "kupovat/koupit + akuzativ",
    english: "to buy (what)",
    spanish: "comprar (qué)",
    german:  "kaufen (was)"
  },
  {
    czech:   "prodávat/prodat + akuzativ",
    english: "to sell (what)",
    spanish: "vender (qué)",
    german:  "verkaufen (was)"
  },
  {
    czech:   "nabízet/nabídnout",
    english: "to offer",
    spanish: "ofrecer",
    german:  "anbieten"
  },
  {
    czech:   "stát",
    english: "to cost (price)",
    spanish: "costar",
    german:  "kosten"
  },
  {
    czech:   "potřebovat + akuzativ",
    english: "to need (what)",
    spanish: "necesitar (qué)",
    german:  "brauchen (was)"
  },
  {
    czech:   "levný",
    english: "cheap",
    spanish: "barato",
    german:  "billig"
  },
  {
    czech:   "drahý",
    english: "expensive",
    spanish: "caro",
    german:  "teuer"
  },
  {
    czech:   "zdarma, zadarmo",
    english: "for free",
    spanish: "gratis",
    german:  "kostenlos"
  },
  {
    czech:   "kabinka",
    english: "changing room",
    spanish: "probador",
    german:  "Umkleidekabine"
  },
  {
    czech:   "číslo",
    english: "number, size",
    spanish: "número, talla",
    german:  "Nummer, Größe"
  },
  {
    czech:   "velikost",
    english: "size (of clothes)",
    spanish: "talla",
    german:  "Größe"
  },
  {
    czech:   "barva",
    english: "color",
    spanish: "color",
    german:  "Farbe"
  },
  {
    czech:   "zkusit si + akuzativ",
    english: "to try (on self) (what)",
    spanish: "probarse (qué)",
    german:  "anprobieren (was)"
  },
  {
    czech:   "vyměnit + akuzativ + za + akuzativ",
    english: "to exchange (what) for (what)",
    spanish: "cambiar (qué) por (qué)",
    german:  "umtauschen (was) gegen (was)"
  },
  {
    czech:   "předpis, recept",
    english: "prescription",
    spanish: "receta médica",
    german:  "Verschreibung"
  },
  {
    czech:   "lék na + akuzativ / proti + dativ",
    english: "medicine for / against (what)",
    spanish: "medicina para / contra (qué)",
    german:  "Medikament für / gegen (was)"
  },
  {
    czech:   "prášek",
    english: "pill",
    spanish: "pastilla",
    german:  "Tablette"
  },
  {
    czech:   "brát + akuzativ",
    english: "to take (medicine, imperf.)",
    spanish: "tomar (qué)",
    german:  "nehmen (was)"
  },
  {
    czech:   "doporučit + akuzativ",
    english: "to recommend",
    spanish: "recomendar",
    german:  "empfehlen"
  },
  {
    czech:   "pokladna, kasa",
    english: "cash desk",
    spanish: "caja",
    german:  "Kasse"
  },
  {
    czech:   "karta",
    english: "card",
    spanish: "tarjeta",
    german:  "Karte"
  },
  {
    czech:   "peníze",
    english: "money",
    spanish: "dinero",
    german:  "Geld"
  },
  {
    czech:   "účtenka",
    english: "receipt",
    spanish: "recibo",
    german:  "Quittung"
  },
  {
    czech:   "platit / zaplatit + adverb",
    english: "to pay (how)",
    spanish: "pagar (cómo)",
    german:  "bezahlen (wie)"
  },
  {
    czech:   "vracet / vrátit",
    english: "to return",
    spanish: "devolver",
    german:  "zurückgeben"
  },
  {
    czech:   "hotově, hotovost",
    english: "in cash",
    spanish: "en efectivo",
    german:  "bar"
  },
  {
    czech:   "služba",
    english: "service",
    spanish: "servicio",
    german:  "Dienstleistung"
  },
  {
    czech:   "čistírna",
    english: "dry cleaners",
    spanish: "tintorería",
    german:  "Reinigung"
  },
  {
    czech:   "prádelna",
    english: "launderette",
    spanish: "lavandería",
    german:  "Waschsalon"
  },
  {
    czech:   "opravna obuvi",
    english: "shoe repair",
    spanish: "reparación de calzado",
    german:  "Schuhreparatur"
  },
  {
    czech:   "kadeřnictví / holičství",
    english: "hairdresser’s / barber’s",
    spanish: "peluquería / barbería",
    german:  "Friseur / Barbershop"
  },
  {
    czech:   "půjčovna (oblečení)",
    english: "rental (clothes)",
    spanish: "alquiler (ropa)",
    german:  "Verleih (Kleidung)"
  },
  {
    czech:   "pošta",
    english: "post office",
    spanish: "correo",
    german:  "Post"
  },
];
