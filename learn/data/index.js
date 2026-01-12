// data/index.js
import { numbersQuestions } from "./numbers.js";
import { verbConjugationQuestions } from "./verbConjugationData.js";

export function getQuestions(topic, level) {
  const allQuestions = {
    numbers: numbersQuestions,
    verbs: verbConjugationQuestions // This MUST be "verbs"





  };

  if (allQuestions[topic]) {
    // This looks for allQuestions["verbs"]["A1"] or ["verbs"]["A2"]
    return allQuestions[topic][level] || [];
  }
  return [];
}