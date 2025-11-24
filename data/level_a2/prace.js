// data/level_a2/5_jobs.js
const vocab = [
  {
    czech:   "servírka",
    english: "waitress",
    spanish: "camarera",
    german:  "Kellnerin"
  },
  {
    czech:   "zaměstnání",
    english: "employment",
    spanish: "empleo",
    german:  "Beschäftigung"
  },
  {
    czech:   "povolání",
    english: "occupation",
    spanish: "ocupación",
    german:  "Beruf"
  },
  {
    czech:   "dělník/dělnice",
    english: "labourer",
    spanish: "trabajador / trabajadora",
    german:  "Arbeiter / Arbeiterin"
  },
  {
    czech:   "řidič/ka",
    english: "driver",
    spanish: "conductor / conductora",
    german:  "Fahrer / Fahrerin"
  },
  {
    czech:   "prodavač/ka",
    english: "shop assistant",
    spanish: "dependiente / dependienta",
    german:  "Verkäufer / Verkäuferin"
  },
  {
    czech:   "číšník/číšnice",
    english: "waiter",
    spanish: "camarero / camarera",
    german:  "Kellner / Kellnerin"
  },
  {
    czech:   "kadeřník/kadeřnice",
    english: "hairdresser",
    spanish: "peluquero / peluquera",
    german:  "Friseur / Friseurin"
  },
  {
    czech:   "úředník/úřednice",
    english: "clerk, official",
    spanish: "funcionario / funcionaria",
    german:  "Beamter / Beamtin"
  },
  {
    czech:   "účetní",
    english: "accountant",
    spanish: "contable",
    german:  "Buchhalter"
  },
  {
    czech:   "lékař/ka",
    english: "doctor",
    spanish: "médico / médica",
    german:  "Arzt / Ärztin"
  },
  {
    czech:   "učitel/ka",
    english: "teacher",
    spanish: "profesor / profesora",
    german:  "Lehrer / Lehrerin"
  },
  {
    czech:   "právník/právnička",
    english: "lawyer",
    spanish: "abogado / abogada",
    german:  "Anwalt / Anwältin"
  },
  {
    czech:   "soudce/soudkyně",
    english: "judge",
    spanish: "juez / jueza",
    german:  "Richter / Richterin"
  },
  {
    czech:   "policista/policistka",
    english: "policeman / policewoman",
    spanish: "policía",
    german:  "Polizist / Polizistin"
  },
  {
    czech:   "novinář/ka",
    english: "journalist",
    spanish: "periodista",
    german:  "Journalist / Journalistin"
  },
  {
    czech:   "podnikatel/ka",
    english: "businessman/woman, entrepreneur",
    spanish: "empresario / empresaria",
    german:  "Unternehmer / Unternehmerin"
  },
  {
    czech:   "pracovat jako + nominativ",
    english: "work as (who)",
    spanish: "trabajar como",
    german:  "arbeiten als"
  },
  {
    czech:   "student/ka",
    english: "student",
    spanish: "estudiante",
    german:  "Student / Studentin"
  },
  {
    czech:   "nezaměstnaný",
    english: "unemployed",
    spanish: "desempleado",
    german:  "arbeitslos"
  },
  {
    czech:   "žena na mateřské dovolené",
    english: "woman on a maternity leave",
    spanish: "mujer de baja maternal",
    german:  "Frau in Elternzeit"
  },
  {
    czech:   "pracoviště",
    english: "workplace",
    spanish: "lugar de trabajo",
    german:  "Arbeitsplatz"
  },
  {
    czech:   "továrna",
    english: "factory, plant",
    spanish: "fábrica",
    german:  "Fabrik"
  },
  {
    czech:   "podnik",
    english: "enterprise",
    spanish: "empresa",
    german:  "Betrieb"
  },
  {
    czech:   "stavba",
    english: "construction, building",
    spanish: "construcción",
    german:  "Bau"
  },
  {
    czech:   "firma",
    english: "company",
    spanish: "empresa",
    german:  "Firma"
  },
  {
    czech:   "úřad",
    english: "administration office",
    spanish: "oficina administrativa",
    german:  "Amt"
  },
  {
    czech:   "farma",
    english: "farm",
    spanish: "granja",
    german:  "Bauernhof"
  },
  {
    czech:   "škola",
    english: "school",
    spanish: "escuela",
    german:  "Schule"
  },
  {
    czech:   "nemocnice",
    english: "hospital",
    spanish: "hospital",
    german:  "Krankenhaus"
  },
  {
    czech:   "banka",
    english: "bank",
    spanish: "banco",
    german:  "Bank"
  },
  {
    czech:   "obchod",
    english: "shop",
    spanish: "tienda",
    german:  "Geschäft"
  },
  {
    czech:   "zaměstnavatel",
    english: "employer",
    spanish: "empleador",
    german:  "Arbeitgeber"
  },
  {
    czech:   "zaměstnanec/zaměstnankyně",
    english: "employee",
    spanish: "empleado / empleada",
    german:  "Arbeitnehmer / Arbeitnehmerin"
  },
  {
    czech:   "ředitel/ka",
    english: "director",
    spanish: "director / directora",
    german:  "Direktor / Direktorin"
  },
  {
    czech:   "vedoucí",
    english: "leader, executive, head",
    spanish: "jefe / jefa",
    german:  "Leiter / Leiterin"
  },
  {
    czech:   "pracovní doba",
    english: "working hours",
    spanish: "horario laboral",
    german:  "Arbeitszeit"
  },
  {
    czech:   "směna",
    english: "shift (work)",
    spanish: "turno",
    german:  "Schicht"
  },
  {
    czech:   "pracovní smlouva",
    english: "employment contract",
    spanish: "contrato de trabajo",
    german:  "Arbeitsvertrag"
  },
  {
    czech:   "pracovat + kde",
    english: "to work (where)",
    spanish: "trabajar (dónde)",
    german:  "arbeiten (wo)"
  },
  {
    czech:   "těžký",
    english: "heavy, difficult",
    spanish: "pesado / difícil",
    german:  "schwer"
  },
  {
    czech:   "lehký",
    english: "light, easy",
    spanish: "ligero / fácil",
    german:  "leicht"
  },
  {
    czech:   "nebezpečný",
    english: "dangerous",
    spanish: "peligroso",
    german:  "gefährlich"
  },
  {
    czech:   "mzda",
    english: "wage",
    spanish: "salario",
    german:  "Lohn"
  },
  {
    czech:   "plat, výplata",
    english: "salary",
    spanish: "salario",
    german:  "Gehalt"
  },
  {
    czech:   "odměna",
    english: "remuneration / bonus",
    spanish: "remuneración / bono",
    german:  "Vergütung / Bonus"
  },
  {
    czech:   "platit + částka v akuzativu",
    english: "to pay (what amount)",
    spanish: "pagar (qué cantidad)",
    german:  "bezahlen (welchen Betrag)"
  },
  {
    czech:   "vydělávat/vydělat + částka v akuzativu",
    english: "to earn (what amount)",
    spanish: "ganar (qué cantidad)",
    german:  "verdienen (welchen Betrag)"
  },
  {
    czech:   "brát + částka v akuzativu",
    english: "to take (earn) (what amount)",
    spanish: "recibir (qué cantidad)",
    german:  "nehmen (welchen Betrag)"
  },
  {
    czech:   "hrubý",
    english: "brutto (before tax)",
    spanish: "bruto",
    german:  "brutto"
  },
  {
    czech:   "čistý",
    english: "netto (after tax)",
    spanish: "neto",
    german:  "netto"
  },
  {
    czech:   "základní",
    english: "basic",
    spanish: "básico",
    german:  "grundlegend"
  },
  {
    czech:   "průměrný",
    english: "average",
    spanish: "promedio",
    german:  "durchschnittlich"
  },
  {
    czech:   "minimální",
    english: "minimal",
    spanish: "mínimo",
    german:  "minimal"
  },
  {
    czech:   "osobní",
    english: "personal",
    spanish: "personal",
    german:  "persönlich"
  },
  {
    czech:   "zvláštní",
    english: "strange, rare",
    spanish: "extraño / raro",
    german:  "seltsam / ungewöhnlich"
  },
  {
    czech:   "práce",
    english: "work, job",
    spanish: "trabajo",
    german:  "Arbeit"
  },
  {
    czech:   "praxe, pracovní zkušenost",
    english: "work experience",
    spanish: "experiencia laboral",
    german:  "Arbeitserfahrung"
  },
  {
    czech:   "životopis",
    english: "CV",
    spanish: "currículum",
    german:  "Lebenslauf"
  },
  {
    czech:   "úřad práce",
    english: "job centre",
    spanish: "oficina de empleo",
    german:  "Arbeitsamt"
  },
  {
    czech:   "hledat + akuzativ",
    english: "to look for (what)",
    spanish: "buscar (qué)",
    german:  "suchen (was)"
  },
  {
    czech:   "najít + akuzativ",
    english: "to find (what)",
    spanish: "encontrar (qué)",
    german:  "finden (was)"
  },
  {
    czech:   "podnikat",
    english: "to run a business",
    spanish: "emprender / dirigir un negocio",
    german:  "ein Geschäft betreiben"
  },
  {
    czech:   "kancelář",
    english: "office",
    spanish: "oficina",
    german:  "Büro"
  }
];
