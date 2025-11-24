// data/level_a2/3_travel.js
const vocab = [
  {
    czech:   "jízdné",
    english: "fare",
    spanish: "tarifa",
    german:  "Fahrpreis"
  },
  {
    czech:   "jízdenka",
    english: "ticket",
    spanish: "billete",
    german:  "Fahrkarte"
  },
  {
    czech:   "rezervace",
    english: "reservation, booking",
    spanish: "reserva",
    german:  "Reservierung"
  },
  {
    czech:   "cestující",
    english: "passenger",
    spanish: "pasajero",
    german:  "Passagier"
  },
  {
    czech:   "destinace",
    english: "destination",
    spanish: "destino",
    german:  "Reiseziel"
  },
  {
    czech:   "itinerář",
    english: "itinerary",
    spanish: "itinerario",
    german:  "Reiseplan"
  },
  {
    czech:   "cesta",
    english: "journey",
    spanish: "viaje",
    german:  "Reise"
  },
  {
    czech:   "cestovní pojištění",
    english: "travel insurance",
    spanish: "seguro de viaje",
    german:  "Reiseversicherung"
  },
  {
    czech:   "dovolená, prázdniny",
    english: "holiday",
    spanish: "vacaciones",
    german:  "Urlaub"
  },
  {
    czech:   "prohlížení památek",
    english: "sightseeing",
    spanish: "turismo",
    german:  "Besichtigung"
  },
  {
    czech:   "služební cesta",
    english: "business trip",
    spanish: "viaje de negocios",
    german:  "Geschäftsreise"
  },
  {
    czech:   "rezervovat",
    english: "to book, to reserve",
    spanish: "reservar",
    german:  "reservieren"
  },
  {
    czech:   "zrušit rezervaci (zrušený, zrušit)",
    english: "cancel a booking (cancelled, to cancel)",
    spanish: "cancelar una reserva",
    german:  "Buchung stornieren"
  },
  {
    czech:   "přijet",
    english: "to arrive",
    spanish: "llegar",
    german:  "ankommen"
  },
  {
    czech:   "odjet",
    english: "to leave, to depart",
    spanish: "salir",
    german:  "abreisen"
  },
  {
    czech:   "cestovat",
    english: "to travel",
    spanish: "viajar",
    german:  "reisen"
  },
  {
    czech:   "navštívit",
    english: "to visit",
    spanish: "visitar",
    german:  "besuchen"
  },
  {
    czech:   "zpoždění",
    english: "delay",
    spanish: "retraso",
    german:  "Verspätung"
  },
  {
    czech:   "informační přepážka, informace",
    english: "information desk",
    spanish: "mostrador de información",
    german:  "Informationsschalter"
  },
  {
    czech:   "zavazadlo, kufr",
    english: "luggage, baggage",
    spanish: "equipaje",
    german:  "Gepäck"
  },
  {
    czech:   "mapa",
    english: "map",
    spanish: "mapa",
    german:  "Karte"
  },
  {
    czech:   "pasová kontrola",
    english: "passport control",
    spanish: "control de pasaportes",
    german:  "Passkontrolle"
  },
  {
    czech:   "na kole",
    english: "by bicycle",
    spanish: "en bicicleta",
    german:  "mit dem Fahrrad"
  },
  {
    czech:   "lodí",
    english: "by boat",
    spanish: "en barco",
    german:  "mit dem Boot"
  },
  {
    czech:   "autobusem",
    english: "by bus / coach",
    spanish: "en autobús",
    german:  "mit dem Bus"
  },
  {
    czech:   "autem",
    english: "by car",
    spanish: "en coche",
    german:  "mit dem Auto"
  },
  {
    czech:   "na motorce",
    english: "by motorcycle",
    spanish: "en motocicleta",
    german:  "mit dem Motorrad"
  },
  {
    czech:   "letadlem",
    english: "by plane",
    spanish: "en avión",
    german:  "mit dem Flugzeug"
  },
  {
    czech:   "vlakem",
    english: "by train",
    spanish: "en tren",
    german:  "mit dem Zug"
  },
  {
    czech:   "pěšky",
    english: "on foot",
    spanish: "a pie",
    german:  "zu Fuß"
  },
  {
    czech:   "Můžete mi ukázat, jak se dostanu do obchodu s potravinami, prosím?",
    english: "Can you show me the way to grocery shop please?",
    spanish: "¿Puede mostrarme cómo llegar a la tienda de comestibles, por favor?",
    german:  "Können Sie mir bitte zeigen, wie ich zum Lebensmittelgeschäft komme?"
  },
  {
    czech:   "Jak se tam dostanu?",
    english: "How do I get there?",
    spanish: "¿Cómo llego allí?",
    german:  "Wie komme ich dorthin?"
  },
  {
    czech:   "Jak se dostanu na Českou ambasádu?",
    english: "How do I get to the Czech embassy?",
    spanish: "¿Cómo llego a la embajada checa?",
    german:  "Wie komme ich zur tschechischen Botschaft?"
  },
  {
    czech:   "Kde najdu restauraci?",
    english: "Where can I find a restaurant?",
    spanish: "¿Dónde puedo encontrar un restaurante?",
    german:  "Wo finde ich ein Restaurant?"
  },
  {
    czech:   "Jak dlouho to trvá autem?",
    english: "How long does it take by car?",
    spanish: "¿Cuánto tiempo se tarda en coche?",
    german:  "Wie lange dauert es mit dem Auto?"
  },
  {
    czech:   "Jak dlouho trvá cesta do Brna?",
    english: "How long does it take to get to Brno?",
    spanish: "¿Cuánto tiempo se tarda en llegar a Brno?",
    german:  "Wie lange dauert die Fahrt nach Brünn?"
  },
  {
    czech:   "Jak dlouho to letí?",
    english: "How long is the flight?",
    spanish: "¿Cuánto dura el vuelo?",
    german:  "Wie lange dauert der Flug?"
  },
  {
    czech:   "Vede tato cesta do Olomouce?",
    english: "Does this road go to Olomouc?",
    spanish: "¿Va este camino a Olomouc?",
    german:  "Führt diese Straße nach Olmütz?"
  },
  {
    czech:   "Kde to je?",
    english: "Where is it?",
    spanish: "¿Dónde está?",
    german:  "Wo ist es?"
  },
  {
    czech:   "Byl jsi v Londýně?",
    english: "Have you been to London?",
    spanish: "¿Has estado en Londres?",
    german:  "Warst du in London?"
  },
  {
    czech:   "Kdy přijedeš?",
    english: "When do you arrive?",
    spanish: "¿Cuándo llegas?",
    german:  "Wann kommst du an?"
  },
  {
    czech:   "Kdy odjíždíš?",
    english: "When do you leave?",
    spanish: "¿Cuándo te vas?",
    german:  "Wann fährst du ab?"
  },
  {
    czech:   "Odkud jsi?",
    english: "Where are you from?",
    spanish: "¿De dónde eres?",
    german:  "Woher kommst du?"
  },
  {
    czech:   "Kam jedeš?",
    english: "Where are you going?",
    spanish: "¿A dónde vas?",
    german:  "Wohin gehst du?"
  },
  {
    czech:   "Kam bys chtěl jet?",
    english: "Where would you like to go?",
    spanish: "¿A dónde te gustaría ir?",
    german:  "Wohin möchtest du gehen?"
  },
  {
    czech:   "V kolik hodin?",
    english: "At what time?",
    spanish: "¿A qué hora?",
    german:  "Um wie viel Uhr?"
  },
  {
    czech:   "Následuj mě.",
    english: "Follow me.",
    spanish: "Sígueme.",
    german:  "Folge mir."
  },
  {
    czech:   "Odtud tam.",
    english: "From here to there.",
    spanish: "De aquí hasta allí.",
    german:  "Von hier bis dort."
  },
  {
    czech:   "Jděte rovně.",
    english: "Go straight ahead.",
    spanish: "Siga recto.",
    german:  "Gehen Sie geradeaus."
  },
  {
    czech:   "Touto cestou.",
    english: "That way.",
    spanish: "Por este camino.",
    german:  "Diesen Weg entlang."
  },
  {
    czech:   "Zahni doleva.",
    english: "Turn (to the) left.",
    spanish: "Gire a la izquierda.",
    german:  "Biegen Sie links ab."
  },
  {
    czech:   "Zahni doprava.",
    english: "Turn (to the) right.",
    spanish: "Gire a la derecha.",
    german:  "Biegen Sie rechts ab."
  },
  {
    czech:   "Zde / tady to je.",
    english: "Here it is.",
    spanish: "Aquí está.",
    german:  "Hier ist es."
  },
  {
    czech:   "Okolo / asi 100 kilometrů.",
    english: "About 100 kilometres.",
    spanish: "Alrededor de 100 kilómetros.",
    german:  "Ungefähr 100 Kilometer."
  },
  {
    czech:   "Vlevo / Nalevo.",
    english: "On the left.",
    spanish: "A la izquierda.",
    german:  "Links."
  },
  {
    czech:   "Vpravo / Napravo.",
    english: "On the right.",
    spanish: "A la derecha.",
    german:  "Rechts."
  },
  {
    czech:   "Naproti obchodu.",
    english: "Across from the shop.",
    spanish: "Enfrente de la tienda.",
    german:  "Gegenüber vom Geschäft."
  },
  {
    czech:   "Jednosměrnou jízdenku.",
    english: "A one way ticket.",
    spanish: "Un billete de ida.",
    german:  "Ein Einzelfahrschein."
  },
  {
    czech:   "Zpáteční jízdenku.",
    english: "A round trip ticket.",
    spanish: "Un billete de ida y vuelta.",
    german:  "Eine Rückfahrkarte."
  },
  {
    czech:   "Zpáteční jízdenku do Paříže, prosím.",
    english: "A return ticket to Paris please.",
    spanish: "Un billete de ida y vuelta a París, por favor.",
    german:  "Eine Rückfahrkarte nach Paris bitte."
  },
  {
    czech:   "Jednu jízdenku do Londýna prosím.",
    english: "One ticket to London please.",
    spanish: "Un billete a Londres, por favor.",
    german:  "Ein Ticket nach London bitte."
  },
  {
    czech:   "Prosím vezměte mě na vlakové nádraží.",
    english: "Please take me to the train station.",
    spanish: "Por favor lléveme a la estación de tren.",
    german:  "Bitte bringen Sie mich zum Bahnhof."
  },
  {
    czech:   "Chtěl bych pokoj pro jednoho.",
    english: "I would like a single room.",
    spanish: "Quisiera una habitación individual.",
    german:  "Ich möchte ein Einzelzimmer."
  },
  {
    czech:   "Chtěl bych si objednat jídlo.",
    english: "I would like to order a meal.",
    spanish: "Quisiera pedir una comida.",
    german:  "Ich möchte eine Mahlzeit bestellen."
  }
];
