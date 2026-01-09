import { numbersQuestions } from "./numbers.js";

export function getQuestions(topic, level) {
  if (topic === "numbers") {
    return numbersQuestions[level] || [];
  }

  return [];
}
