// data.js
export const gameState = {
    isLoggedIn: false,
    language: "en",
    // Data for Multiple Choice & Match Games
    data: [
        { cs: "bydlím", en: "I live", synonym: "", type: "verb", person: "já" },
        { cs: "bydlíš", en: "You live", synonym: "", type: "verb", person: "ty" },
        { cs: "bydlí", en: "He/She lives", synonym: "", type: "verb", person: "on/ona" },
        { cs: "mám ráda", en: "I like (fem.)", synonym: "mám rád", type: "verb", person: "já" }
    ],
    // Data for Fill in the Gap / Multiple Choice
    questions: [
        { 
            text: "Já {{gap}} v Praze.", 
            answers: ["bydlím"], 
            infinitiv: "bydlet", 
            cs: "bydlím", 
            en: "I live in Prague" 
        },
        { 
            text: "Ty {{gap}} hezky.", 
            answers: ["zpíváš"], 
            infinitiv: "zpívat", 
            cs: "zpíváš", 
            en: "You sing nicely" 
        }
    ]
};
