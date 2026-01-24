// data/level_A2/1_personal_info.js
const vocab = [
  {
    czech:   "jméno",
    english: "name",
    spanish: "nombre",
    german:  "Name"
  },
  {
    czech:   "křestní jméno",
    english: "first name",
    spanish: "nombre de pila",
    german:  "Vorname"
  },
  {
    czech:   "příjmení",
    english: "surname",
    spanish: "apellido",
    german:  "Nachname"
  },
  {
    czech:   "jmenovat se",
    english: "to be named",
    spanish: "llamarse",
    german:  "heißen"
  },
  {
    czech:   "pan",
    english: "Mr",
    spanish: "señor",
    german:  "Herr"
  },
  {
    czech:   "paní",
    english: "Mrs",
    spanish: "señora",
    german:  "Frau"
  },
  {
    czech:   "slečna",
    english: "Ms",
    spanish: "señorita",
    german:  "Fräulein"
  },
  {
    czech:   "adresa",
    english: "address",
    spanish: "dirección",
    german:  "Adresse"
  },
  {
    czech:   "stát",
    english: "state, country",
    spanish: "estado, país",
    german:  "Staat, Land"
  },
  {
    czech:   "ulice",
    english: "street",
    spanish: "calle",
    german:  "Straße"
  },
  {
    czech:   "číslo",
    english: "number",
    spanish: "número",
    german:  "Nummer"
  },
  {
    czech:   "PSČ",
    english: "zip code",
    spanish: "código postal",
    german:  "Postleitzahl"
  },
  {
    czech:   "(číslo) popisné, orientační",
    english: "house number",
    spanish: "número de casa",
    german:  "Hausnummer"
  },
  {
    czech:   "žít, bydlet (kde + 6. pád)",
    english: "to live (where)",
    spanish: "vivir",
    german:  "wohnen, leben"
  },
  {
    czech:   "bydlet u + 2. pád",
    english: "to live at (parents)",
    spanish: "vivir con (los padres)",
    german:  "bei jemandem wohnen"
  },
  {
    czech:   "přestěhovat se kam (do Prahy)",
    english: "to move to",
    spanish: "mudarse a",
    german:  "umziehen nach"
  },
  {
    czech:   "zavináč",
    english: "@",
    spanish: "@",
    german:  "@"
  },
  {
    czech:   "datum narození",
    english: "date of birth",
    spanish: "fecha de nacimiento",
    german:  "Geburtsdatum"
  },
  {
    czech:   "místo narození",
    english: "place of birth",
    spanish: "lugar de nacimiento",
    german:  "Geburtsort"
  },
  {
    czech:   "narodit se kde/kdy",
    english: "to be born where/when",
    spanish: "nacer dónde/cuándo",
    german:  "geboren werden wo/wann"
  },
  {
    czech:   "rok",
    english: "year",
    spanish: "año",
    german:  "Jahr"
  },
  {
    czech:   "věk",
    english: "age",
    spanish: "edad",
    german:  "Alter"
  },
  {
    czech:   "dospělý",
    english: "adult",
    spanish: "adulto",
    german:  "Erwachsener"
  },
  {
    czech:   "je mi 30 let (být + dativ)",
    english: "I am 30 years old",
    spanish: "tengo 30 años",
    german:  "ich bin 30 Jahre alt"
  },
  {
    czech:   "muž",
    english: "man",
    spanish: "hombre",
    german:  "Mann"
  },
  {
    czech:   "žena",
    english: "woman",
    spanish: "mujer",
    german:  "Frau"
  },
  {
    czech:   "pohlaví",
    english: "gender, sex",
    spanish: "género, sexo",
    german:  "Geschlecht"
  },
  {
    czech:   "kluk",
    english: "boy",
    spanish: "chico",
    german:  "Junge"
  },
  {
    czech:   "holka",
    english: "girl",
    spanish: "chica",
    german:  "Mädchen"
  },
  {
    czech:   "manžel/ka",
    english: "husband/wife",
    spanish: "esposo / esposa",
    german:  "Ehemann / Ehefrau"
  },
  {
    czech:   "přítel / přítelkyně",
    english: "boyfriend / girlfriend",
    spanish: "novio, novia",
    german:  "Freund, Freundin"
  },
  {
    czech:   "partner/ka",
    english: "partner",
    spanish: "pareja",
    german:  "Partner/in"
  },
  {
    czech:   "sňatek, svatba",
    english: "wedding",
    spanish: "boda",
    german:  "Hochzeit"
  },
  {
    czech:   "oženit se / vdát se / vzít se",
    english: "to get married",
    spanish: "casarse",
    german:  "heiraten"
  },
  {
    czech:   "žít s + instrumentál",
    english: "to live with...",
    spanish: "vivir con...",
    german:  "mit ... zusammenleben"
  },
  {
    czech:   "svobodný, svobodná",
    english: "single",
    spanish: "soltero/a",
    german:  "ledig"
  },
  {
    czech:   "ženatý, vdaná",
    english: "married",
    spanish: "casado/a",
    german:  "verheiratet"
  },
  {
    czech:   "národnost",
    english: "nationality",
    spanish: "nacionalidad",
    german:  "Nationalität"
  },
  {
    czech:   "občanství",
    english: "citizenship",
    spanish: "ciudadanía",
    german:  "Staatsbürgerschaft"
  },
  {
    czech:   "být z + genitiv",
    english: "to be from / to come from",
    spanish: "ser de",
    german:  "aus ... kommen"
  },
  {
    czech:   "náboženství",
    english: "religion",
    spanish: "religión",
    german:  "Religion"
  },
  {
    czech:   "křesťan",
    english: "Christian",
    spanish: "cristiano",
    german:  "Christ"
  },
  {
    czech:   "muslim/ka",
    english: "Muslim",
    spanish: "musulmán / musulmana",
    german:  "Muslim / Muslimin"
  },
  {
    czech:   "ateista",
    english: "atheist",
    spanish: "ateo",
    german:  "Atheist"
  },
  {
    czech:   "kostel",
    english: "church",
    spanish: "iglesia",
    german:  "Kirche"
  },
  {
    czech:   "mešita",
    english: "mosque",
    spanish: "mezquita",
    german:  "Moschee"
  },
  {
    czech:   "chrám",
    english: "temple",
    spanish: "templo",
    german:  "Tempel"
  },
  {
    czech:   "pas",
    english: "passport",
    spanish: "pasaporte",
    german:  "Pass"
  },
  {
    czech:   "vízum",
    english: "visa",
    spanish: "visado",
    german:  "Visum"
  },
  {
    czech:   "rodné číslo",
    english: "birth certificate number",
    spanish: "número de nacimiento",
    german:  "Geburtsnummer"
  },
  {
    czech:   "podpis",
    english: "signature",
    spanish: "firma",
    german:  "Unterschrift"
  },
  {
    czech:   "rodina",
    english: "family",
    spanish: "familia",
    german:  "Familie"
  },
  {
    czech:   "rodiče",
    english: "parents",
    spanish: "padres",
    german:  "Eltern"
  },
  {
    czech:   "matka / maminka / máma",
    english: "mother",
    spanish: "madre, mamá",
    german:  "Mutter, Mama"
  },
  {
    czech:   "otec / tatínek / táta",
    english: "father",
    spanish: "padre, papá",
    german:  "Vater, Papa"
  },
  {
    czech:   "dítě / děti",
    english: "child / children",
    spanish: "niño / niños",
    german:  "Kind / Kinder"
  },
  {
    czech:   "syn",
    english: "son",
    spanish: "hijo",
    german:  "Sohn"
  },
  {
    czech:   "dcera",
    english: "daughter",
    spanish: "hija",
    german:  "Tochter"
  },
  {
    czech:   "bratr",
    english: "brother",
    spanish: "hermano",
    german:  "Bruder"
  },
  {
    czech:   "sestra",
    english: "sister",
    spanish: "Schwester",
    german:  "Schwester"
  },
  {
    czech:   "bratranec",
    english: "male cousin",
    spanish: "primo",
    german:  "Cousin"
  },
  {
    czech:   "sestřenice",
    english: "female cousin",
    spanish: "prima",
    german:  "Cousine"
  },
  {
    czech:   "babička",
    english: "grandmother",
    spanish: "abuela",
    german:  "Großmutter"
  },
  {
    czech:   "dědeček, děda",
    english: "grandfather, grandpa",
    spanish: "abuelo",
    german:  "Großvater, Opa"
  },
  {
    czech:   "strýc, strejda",
    english: "uncle",
    spanish: "tío",
    german:  "Onkel"
  },
  {
    czech:   "teta",
    english: "aunt",
    spanish: "tía",
    german:  "Tante"
  },
  {
    czech:   "brýle",
    english: "glasses",
    spanish: "gafas",
    german:  "Brille"
  },
  {
    czech:   "oko / oči",
    english: "eye / eyes",
    spanish: "ojo / ojos",
    german:  "Auge / Augen"
  },
  {
    czech:   "vlasy",
    english: "hair",
    spanish: "pelo",
    german:  "Haare"
  },
  {
    czech:   "vypadat jako",
    english: "to look like",
    spanish: "parecerse a",
    german:  "aussehen wie"
  },
  {
    czech:   "mít",
    english: "to have",
    spanish: "tener",
    german:  "haben"
  },
  {
    czech:   "mít na sobě",
    english: "to wear (to have on)",
    spanish: "llevar puesto",
    german:  "anhaben"
  },
  {
    czech:   "nosit + akuzativ",
    english: "to wear (regularly)",
    spanish: "usar, llevar",
    german:  "tragen"
  },
  {
    czech:   "krásný",
    english: "beautiful",
    spanish: "bonito, hermoso",
    german:  "schön"
  },
  {
    czech:   "ošklivý",
    english: "ugly",
    spanish: "feo",
    german:  "hässlich"
  },
  {
    czech:   "mladý",
    english: "young",
    spanish: "joven",
    german:  "jung"
  },
  {
    czech:   "starý",
    english: "old",
    spanish: "viejo",
    german:  "alt"
  },
  {
    czech:   "vysoký",
    english: "tall",
    spanish: "alto",
    german:  "groß"
  },
  {
    czech:   "malý",
    english: "small",
    spanish: "pequeño",
    german:  "klein"
  },
  {
    czech:   "střední",
    english: "middle",
    spanish: "mediano",
    german:  "mittel"
  },
  {
    czech:   "hubený (štíhlý)",
    english: "slim / skinny",
    spanish: "delgado",
    german:  "dünn, schlank"
  },
  {
    czech:   "plnoštíhlý",
    english: "full-figured",
    spanish: "rellenito",
    german:  "vollschlank (kurvig)"
  },
  {
    czech:   "tlustý",
    english: "fat",
    spanish: "gordo",
    german:  "dick"
  },
  {
    czech:   "kudrnatý",
    english: "wavy",
    spanish: "ondulado",
    german:  "wellig"
  },
  {
    czech:   "rovný",
    english: "straight",
    spanish: "liso",
    german:  "glatt"
  },
 {
    czech:   "vlnitý",
    english: "straight",
    spanish: "liso",
    german:  "glatt"
  },
  {
    czech:   "blond",
    english: "blond",
    spanish: "rubio",
    german:  "blond"
  },
  {
    czech:   "šedivý",
    english: "grey-haired",
    spanish: "canoso",
    german:  "grauhaarig"
  },
  {
    czech:   "člověk",
    english: "person",
    spanish: "persona",
    german:  "Person"
  },
  {
    czech:   "chytrý",
    english: "clever, smart",
    spanish: "listo, inteligente",
    german:  "schlau, klug"
  },
  {
    czech:   "hloupý",
    english: "stupid, silly",
    spanish: "tonto",
    german:  "dumm"
  },
  {
    czech:   "inteligentní",
    english: "intelligent",
    spanish: "inteligente",
    german:  "intelligent"
  },
  {
    czech:   "pracovitý",
    english: "hard-working",
    spanish: "trabajador",
    german:  "fleißig"
  },
  {
    czech:   "líný",
    english: "lazy",
    spanish: "perezoso",
    german:  "faul"
  },
  {
    czech:   "klidný",
    english: "calm",
    spanish: "tranquilo",
    german:  "ruhig"
  },
  {
    czech:   "nervózní",
    english: "nervous",
    spanish: "nervioso",
    german:  "nervös"
  },
  {
    czech:   "hodný",
    english: "nice, kind",
    spanish: "bueno, amable",
    german:  "lieb, nett"
  },
  {
    czech:   "zlý",
    english: "mean, evil",
    spanish: "malo",
    german:  "böse"
  },
  {
    czech:   "veselý",
    english: "cheerful",
    spanish: "alegre",
    german:  "fröhlich"
  },
  {
    czech:   "smutný",
    english: "sad",
    spanish: "triste",
    german:  "traurig"
  },
  {
    czech:   "sympatický",
    english: "nice, likable",
    spanish: "simpático",
    german:  "sympathisch"
  },
  {
    czech:   "temperamentní",
    english: "lively, temperamental",
    spanish: "temperamental",
    german:  "temperamentvoll"
  },
  {
    czech:   "odvážný",
    english: "brave, courageous",
    spanish: "valiente",
    german:  "mutig"
  },
  {
    czech:   "pomoct / pomáhat",
    english: "to help",
    spanish: "ayudar",
    german:  "helfen"
  }
];
