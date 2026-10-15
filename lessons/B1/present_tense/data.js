// data.js
export const gameState = {
    isLoggedIn: false,
    language: "en",

    // Comprehensive Dictionary with Infinitives AND Full Conjugations across all 6 persons
    data: [
        // --- 1. rozmyslet se / rozhodnout se (To decide) ---
        { cs: "rozhodnout se", en: "to decide", synonym: "", type: "verb", person: "infinitive" },
        { cs: "rozhoduji se", en: "I decide", synonym: "rozhoduju se", type: "verb", person: "já" },
        { cs: "rozhoduješ se", en: "You decide", synonym: "", type: "verb", person: "ty" },
        { cs: "rozhoduje se", en: "He/She decides", synonym: "", type: "verb", person: "on/ona" },
        { cs: "rozhodujeme se", en: "We decide", synonym: "", type: "verb", person: "my" },
        { cs: "rozhodujete se", en: "You (pl.) decide", synonym: "", type: "verb", person: "vy" },
        { cs: "rozhodují se", en: "They decide", synonym: "rozhodujou se", type: "verb", person: "oni" },

        // --- 2. stěžovat si (To complain) ---
        { cs: "stěžovat si", en: "to complain", synonym: "", type: "verb", person: "infinitive" },
        { cs: "stěžuji si", en: "I complain", synonym: "stěžuju si", type: "verb", person: "já" },
        { cs: "stěžuješ si", en: "You complain", synonym: "", type: "verb", person: "ty" },
        { cs: "stěžuje si", en: "He/She complains", synonym: "", type: "verb", person: "on/ona" },
        { cs: "stěžujeme si", en: "We complain", synonym: "", type: "verb", person: "my" },
        { cs: "stěžujete si", en: "You (pl.) complain", synonym: "", type: "verb", person: "vy" },
        { cs: "stěžují si", en: "They complain", synonym: "stěžujou si", type: "verb", person: "oni" },

        // --- 3. předpokládat (To assume) ---
        { cs: "předpokládat", en: "to assume", synonym: "", type: "verb", person: "infinitive" },
        { cs: "předpokládám", en: "I assume", synonym: "", type: "verb", person: "já" },
        { cs: "předpokládáš", en: "You assume", synonym: "", type: "verb", person: "ty" },
        { cs: "předpokládá", en: "He/She assumes", synonym: "", type: "verb", person: "on/ona" },
        { cs: "předpokládáme", en: "We assume", synonym: "", type: "verb", person: "my" },
        { cs: "předpokládáte", en: "You (pl.) assume", synonym: "", type: "verb", person: "vy" },
        { cs: "předpokládají", en: "They assume", synonym: "", type: "verb", person: "oni" },

        // --- 4. doporučovat (To recommend) ---
        { cs: "doporučovat", en: "to recommend", synonym: "", type: "verb", person: "infinitive" },
        { cs: "doporučuji", en: "I recommend", synonym: "doporučuju", type: "verb", person: "já" },
        { cs: "doporučuješ", en: "You recommend", synonym: "", type: "verb", person: "ty" },
        { cs: "doporučuje", en: "He/She recommends", synonym: "", type: "verb", person: "on/ona" },
        { cs: "doporučujeme", en: "We recommend", synonym: "", type: "verb", person: "my" },
        { cs: "doporučujete", en: "You (pl.) recommend", synonym: "", type: "verb", person: "vy" },
        { cs: "doporučují", en: "They recommend", synonym: "doporučujou", type: "verb", person: "oni" },

        // --- 5. vyřizovat (To handle / settle) ---
        { cs: "vyřizovat", en: "to handle / settle", synonym: "", type: "verb", person: "infinitive" },
        { cs: "vyřizuji", en: "I handle", synonym: "vyřizuju", type: "verb", person: "já" },
        { cs: "vyřizuješ", en: "You handle", synonym: "", type: "verb", person: "ty" },
        { cs: "vyřizuje", en: "He/She handles", synonym: "", type: "verb", person: "on/ona" },
        { cs: "vyřizujeme", en: "We handle", synonym: "", type: "verb", person: "my" },
        { cs: "vyřizujete", en: "You (pl.) handle", synonym: "", type: "verb", person: "vy" },
        { cs: "vyřizují", en: "They handle", synonym: "vyřizujou", type: "verb", person: "oni" },

        // --- 6. spoléhat na (To rely on) ---
        { cs: "spoléhat na", en: "to rely on", synonym: "", type: "verb", person: "infinitive" },
        { cs: "spoléhám", en: "I rely", synonym: "", type: "verb", person: "já" },
        { cs: "spoléháš", en: "You rely", synonym: "", type: "verb", person: "ty" },
        { cs: "spoléhá", en: "He/She relies", synonym: "", type: "verb", person: "on/ona" },
        { cs: "spoléháme", en: "We rely", synonym: "", type: "verb", person: "my" },
        { cs: "spoléháte", en: "You (pl.) rely", synonym: "", type: "verb", person: "vy" },
        { cs: "spoléhají", en: "They rely", synonym: "", type: "verb", person: "oni" },

        // --- 7. zúčastnit se (To take part in) ---
        { cs: "zúčastnit se", en: "to take part in", synonym: "", type: "verb", person: "infinitive" },
        { cs: "zúčastním se", en: "I take part", synonym: "", type: "verb", person: "já" },
        { cs: "zúčastníš se", en: "You take part", synonym: "", type: "verb", person: "ty" },
        { cs: "zúčastní se", en: "He/She takes part", synonym: "", type: "verb", person: "on/ona" },
        { cs: "zúčastníme se", en: "We take part", synonym: "", type: "verb", person: "my" },
        { cs: "zúčastníte se", en: "You (pl.) take part", synonym: "", type: "verb", person: "vy" },
        { cs: "zúčastní se", en: "They take part", synonym: "zúčastní se (oni)", type: "verb", person: "oni" },

        // --- 8. nesouhlasit (To disagree) ---
        { cs: "nesouhlasit", en: "to disagree", synonym: "", type: "verb", person: "infinitive" },
        { cs: "nesouhlasím", en: "I disagree", synonym: "", type: "verb", person: "já" },
        { cs: "nesouhlasíš", en: "You disagree", synonym: "", type: "verb", person: "ty" },
        { cs: "nesouhlasí", en: "He/She disagrees", synonym: "", type: "verb", person: "on/ona" },
        { cs: "nesouhlasíme", en: "We disagree", synonym: "", type: "verb", person: "my" },
        { cs: "nesouhlasíte", en: "You (pl.) disagree", synonym: "", type: "verb", person: "vy" },
        { cs: "nesouhlasí", en: "They disagree", synonym: "nesouhlasí (oni)", type: "verb", person: "oni" }
    ],

    // Questions remain the same 100 present tense sentences...
    questions: [
        /* ... 100 questions ... */
    ]
};