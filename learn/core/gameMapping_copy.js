// core/gameMapping.js

/**
 * GLOBAL EXCLUSIONS
 * If these are selected, the entire GameZone (all buttons) will be hidden.
 */
export const globalExclusions = {
    pos: ["phrase"],              // Entire POS category to hide
    lessons: ["00 Užitečná slova"] // Specific lesson name to hide
};
 
/**
 * SPECIFIC GAME EXCLUSIONS
 * By default, all games are SHOWN. 
 * Add a game here only if you want to exclude it from specific topics or lessons.
 */
export const gameMapping = {
    "flashcards": { exclude: { pos: [], lessons: [] } },
    "mcq": { exclude: { pos: [], lessons: [] } },
    "fillGap": { exclude: { pos: [], lessons: [] } },
    "hangman": { exclude: { pos: [], lessons: [] } },
    "orderWords": { exclude: { pos: [], lessons: [] } },
    "dragDrop": { 
    exclude: { 
        pos: [
            "verb", "noun", "adjective", "adj", 
            "pronoun", "adverb", "prefix", 
            "prepostition", "preposition", "Phrase"
        ], 
        lessons: [] 
    } 
},

    "memory": { exclude: { pos: [], lessons: [] } },
    "pexeso": { exclude: { pos: [], lessons: [] } },
    "match": { exclude: { pos: [], lessons: [] } },
    "writeAnswer": { exclude: { pos: [], lessons: [] } },
    "speedClick": { exclude: { pos: [], lessons: [] } },
    "fallingWords": { exclude: { pos: [], lessons: [] } },
    "sentenceBuilder": { exclude: { pos: ["verb", "noun", "adjective", "adj", 
            "pronoun", "adverb", "prefix", 
            "prepostition", "preposition", "Phrase", "number"], lessons: [] } },
    
    // Example: Restricted games (like math or specific audio games)
    "guessNumber": { 
        exclude: { 
            pos: ["verb", "noun", "adjective", "adj", 
            "pronoun", "adverb", "prefix", 
            "prepostition", "preposition", "Phrase", "number"], // Hide for non-number topics
            lessons: [] 
        } 
    },
    "whatDidYouHear": { 
        exclude: { 
            pos: ["verb", "noun", "adjective", "adj", 
            "pronoun", "adverb", "prefix", 
            "prepostition", "preposition", "Phrase", "number"], 
            lessons: ["Basic Vocabulary 1"] // Hide if audio isn't ready for this lesson
        } 
    }
};