// all games:   ["flashcards", "dragDrop", "mcq", "fillGap", "hangman", "memory", "pexeso", "match", "writeAnswer", "speedClick", "fallingWords", "orderWords", "sentenceBuilder", "guessNumber", "whatDidYouHear"] //



//, "orderWords", "sentenceBuilder", "guessNumber", "whatDidYouHear"

// core/gameMapping.js
// Map topics and levels to available games
export const gameMapping = {
  numbers: {
    A1: ["flashcards", "dragDrop", "mcq", "fillGap", "hangman", "memory", "pexeso", "match", "writeAnswer", "speedClick", "fallingWords"],


    A2: ["mcq", "fillGap", "hangman", "memory", "pexeso", "match", "writeAnswer", "speedClick", "fallingWords", "orderWords", "sentenceBuilder", "guessNumber", "whatDidYouHear"]
  },

  colors: {
    A1: ["mcq", "fillGap", "memory", "match", "writeAnswer"],
    A2: ["mcq", "fillGap", "memory", "match", "writeAnswer"]
  },
  animals: {
    A1: ["mcq", "fillGap", "hangman", "memory", "pexeso", "match", "writeAnswer", "speedClick", "fallingWords", "orderWords", "sentenceBuilder"],
    A2: ["mcq", "fillGap", "hangman", "memory", "pexeso", "match", "writeAnswer", "speedClick", "fallingWords", "orderWords", "sentenceBuilder"]
  }
};
