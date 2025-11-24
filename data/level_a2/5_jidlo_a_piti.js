// data/level_a2/4_food.js
const vocab = [
  {
    czech:   "Můžete mi přinést jídelní lístek?",
    english: "Can I have the menu please?",
    spanish: "¿Me puede traer el menú, por favor?",
    german:  "Können Sie mir bitte die Speisekarte bringen?"
  },
  {
    czech:   "Máte vybráno?",
    english: "Are you ready to order?",
    spanish: "¿Ha elegido?",
    german:  "Haben Sie gewählt?"
  },
  {
    czech:   "Co si dáte?",
    english: "What will you have?",
    spanish: "¿Qué va a tomar?",
    german:  "Was möchten Sie?"
  },
  {
    czech:   "Máte nějaké vegetariánské / bezmasé jídlo?",
    english: "Do you have any vegetarian / meatless dish?",
    spanish: "¿Tienen algún plato vegetariano / sin carne?",
    german:  "Haben Sie ein vegetarisches / fleischloses Gericht?"
  },
  {
    czech:   "Dám si....",
    english: "I'll have ....",
    spanish: "Tomaré ....",
    german:  "Ich nehme ...."
  },
  {
    czech:   "Dobrou chuť!",
    english: "Enjoy your meal!",
    spanish: "¡Buen provecho!",
    german:  "Guten Appetit!"
  },
  {
    czech:   "Na zdraví!",
    english: "Cheers!",
    spanish: "¡Salud!",
    german:  "Prost!"
  },
  {
    czech:   "Zaplatíme! / Účet, prosím.",
    english: "Check please!",
    spanish: "¡La cuenta, por favor!",
    german:  "Die Rechnung, bitte!"
  },
  {
    czech:   "kreditní karta",
    english: "credit card",
    spanish: "tarjeta de crédito",
    german:  "Kreditkarte"
  },
  {
    czech:   "Hovězí guláš s knedlíkem",
    english: "Beef goulash with dumplings (thick beef stew)",
    spanish: "Goulash de ternera con albóndigas",
    german:  "Rindergulasch mit Knödeln"
  },
  {
    czech:   "Hovězí svíčková na smetaně, knedlík",
    english: "Beef sirloin with dumplings and vegetable cream sauce",
    spanish: "Solomillo de ternera con salsa de crema y albóndigas",
    german:  "Rinderfilet mit Knödeln und Gemüsesoße"
  },
  {
    czech:   "Kuřecí prsíčka s broskví",
    english: "Chicken breasts with peach slices",
    spanish: "Pechugas de pollo con melocotón",
    german:  "Hähnchenbrust mit Pfirsich"
  },
  {
    czech:   "Smažený sýr",
    english: "Fried cheese (thick slice of cheese breaded and fried)",
    spanish: "Queso frito",
    german:  "Gebratener Käse"
  },
  {
    czech:   "Mám alergii na... / Jsem alergický/á na...",
    english: "I have an allergy to...",
    spanish: "Tengo alergia a...",
    german:  "Ich bin allergisch gegen..."
  },
  {
    czech:   "Mám dietu. / Držím dietu.",
    english: "I'm on a diet.",
    spanish: "Estoy a dieta.",
    german:  "Ich mache eine Diät."
  },
  {
    czech:   "Nemůžu jíst ...",
    english: "I cannot eat ....",
    spanish: "No puedo comer ...",
    german:  "Ich kann ... nicht essen."
  },
  {
    czech:   "Smažený vepřový řízek",
    english: "Pork schnitzel (slice of pork breaded and fried)",
    spanish: "Escalope de cerdo frito",
    german:  "Paniertes Schweineschnitzel"
  },
  {
    czech:   "Vepřová pečeně, knedlík, zelí / \"vepřo-knedlo-zelo\" (coll.)",
    english: "Roast pork, dumplings and sauerkraut",
    spanish: "Cerdo asado, albóndigas y chucrut",
    german:  "Schweinebraten mit Knödeln und Sauerkraut"
  },
  {
    czech:   "Pečené kuře s brambory",
    english: "Roasted chicken with potatoes",
    spanish: "Pollo asado con patatas",
    german:  "Brathähnchen mit Kartoffeln"
  },
  {
    czech:   "Pečená kachna / husa se zelím a knedlíkem",
    english: "Roasted duck / goose with sauerkraut and dumplings",
    spanish: "Pato / ganso asado con chucrut y albóndigas",
    german:  "Gebratene Ente / Gans mit Sauerkraut und Knödeln"
  },
  {
    czech:   "Plněná paprika s rajskou omáčkou",
    english: "Stuffed bell peppers with tomato sauce",
    spanish: "Pimientos rellenos con salsa de tomate",
    german:  "Gefüllte Paprika mit Tomatensoße"
  },
  {
    czech:   "jablečný džus",
    english: "apple juice",
    spanish: "zumo de manzana",
    german:  "Apfelsaft"
  },
  {
    czech:   "pečený / opékaný",
    english: "baked / roasted",
    spanish: "horneado / asado",
    german:  "gebacken / geröstet"
  },
  {
    czech:   "hovězí",
    english: "beef",
    spanish: "ternera",
    german:  "Rindfleisch"
  },
  {
    czech:   "pivo",
    english: "beer",
    spanish: "cerveza",
    german:  "Bier"
  },
  {
    czech:   "účet",
    english: "bill",
    spanish: "cuenta",
    german:  "Rechnung"
  },
  {
    czech:   "snídaně",
    english: "breakfast",
    spanish: "desayuno",
    german:  "Frühstück"
  },
  {
    czech:   "zelí",
    english: "cabbage",
    spanish: "col",
    german:  "Kohl"
  },
  {
    czech:   "kuře, kuřecí (maso)",
    english: "chicken",
    spanish: "pollo",
    german:  "Huhn"
  },
  {
    czech:   "káva",
    english: "coffee",
    spanish: "café",
    german:  "Kaffee"
  },
  {
    czech:   "vařený",
    english: "cooked / boiled",
    spanish: "cocido / hervido",
    german:  "gekocht"
  },
  {
    czech:   "moučník, zákusek, dezert",
    english: "dessert",
    spanish: "postre",
    german:  "Nachspeise / Dessert"
  },
  {
    czech:   "večeře",
    english: "dinner",
    spanish: "cena",
    german:  "Abendessen"
  },
  {
    czech:   "nápoj",
    english: "drink",
    spanish: "bebida",
    german:  "Getränk"
  },
  {
    czech:   "knedlík",
    english: "dumpling",
    spanish: "albóndiga",
    german:  "Knödel"
  },
  {
    czech:   "ryba (sg.), ryby (pl.)",
    english: "fish",
    spanish: "pescado",
    german:  "Fisch"
  },
  {
    czech:   "hranolky",
    english: "French fries",
    spanish: "patatas fritas",
    german:  "Pommes frites"
  },
  {
    czech:   "smažený",
    english: "fried",
    spanish: "frito",
    german:  "gebraten"
  },
  {
    czech:   "ovoce",
    english: "fruit",
    spanish: "fruta",
    german:  "Obst"
  },
  {
    czech:   "zmrzlina",
    english: "ice-cream",
    spanish: "helado",
    german:  "Eis"
  },
  {
    czech:   "oběd",
    english: "lunch",
    spanish: "almuerzo",
    german:  "Mittagessen"
  },
  {
    czech:   "jídelní lístek",
    english: "menu",
    spanish: "menú",
    german:  "Speisekarte"
  },
  {
    czech:   "ubrousek",
    english: "napkin",
    spanish: "servilleta",
    german:  "Serviette"
  },
  {
    czech:   "pomerančový džus",
    english: "orange juice",
    spanish: "zumo de naranja",
    german:  "Orangensaft"
  },
  {
    czech:   "těstoviny",
    english: "pasta",
    spanish: "pasta",
    german:  "Nudeln"
  },
  {
    czech:   "vepřové",
    english: "pork",
    spanish: "cerdo",
    german:  "Schweinefleisch"
  },
  {
    czech:   "brambory",
    english: "potatoes",
    spanish: "patatas",
    german:  "Kartoffeln"
  },
  {
    czech:   "restaurace",
    english: "restaurant",
    spanish: "restaurante",
    german:  "Restaurant"
  },
  {
    czech:   "rýže",
    english: "rice",
    spanish: "arroz",
    german:  "Reis"
  },
  {
    czech:   "salát",
    english: "salad",
    spanish: "ensalada",
    german:  "Salat"
  },
  {
    czech:   "omáčka",
    english: "sauce",
    spanish: "salsa",
    german:  "Soße"
  },
  {
    czech:   "(kyselé) zelí",
    english: "sauerkraut",
    spanish: "chucrut",
    german:  "Sauerkraut"
  },
  {
    czech:   "příloha",
    english: "side dish",
    spanish: "guarnición",
    german:  "Beilage"
  },
  {
    czech:   "polévka",
    english: "soup",
    spanish: "sopa",
    german:  "Suppe"
  },
  {
    czech:   "cukr",
    english: "sugar",
    spanish: "azúcar",
    german:  "Zucker"
  },
  {
    czech:   "čaj",
    english: "tea",
    spanish: "té",
    german:  "Tee"
  },
  {
    czech:   "spropitné, dýško",
    english: "tip",
    spanish: "propina",
    german:  "Trinkgeld"
  },
  {
    czech:   "zelenina",
    english: "vegetables",
    spanish: "verduras",
    german:  "Gemüse"
  },
  {
    czech:   "voda",
    english: "water",
    spanish: "agua",
    german:  "Wasser"
  },
  {
    czech:   "víno",
    english: "wine",
    spanish: "vino",
    german:  "Wein"
  },
  {
    czech:   "hlavní chod",
    english: "main course",
    spanish: "plato principal",
    german:  "Hauptgericht"
  },
  {
    czech:   "servírka, číšnice",
    english: "waitress",
    spanish: "camarera",
    german:  "Kellnerin"
  },
  {
    czech:   "číšník",
    english: "waiter",
    spanish: "camarero",
    german:  "Kellner"
  },
  {
    czech:   "kuchař",
    english: "chef",
    spanish: "cocinero",
    german:  "Koch"
  },
  {
    czech:   "pít",
    english: "to drink",
    spanish: "beber",
    german:  "trinken"
  },
  {
    czech:   "kavárna",
    english: "cafe, coffee shop",
    spanish: "cafetería",
    german:  "Café"
  },
  {
    czech:   "objednávka",
    english: "order",
    spanish: "pedido",
    german:  "Bestellung"
  },
  {
    czech:   "lahodná / chutná pizza",
    english: "delicious pizza",
    spanish: "pizza deliciosa",
    german:  "leckere Pizza"
  }
];
