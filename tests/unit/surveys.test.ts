import { describe, it, expect } from "vitest";
import { validateAnswers, visibleQuestions, studyInput, type SurveyQuestion } from "../../src/lib/validation";
const questions: SurveyQuestion[] = [{
  id: "interest",
  type: "single",
  label: "Interest?",
  options: ["Tech", "Sport"],
  required: true
}, {
  id: "detail",
  type: "single",
  label: "What tech?",
  options: ["Web", "Robotics"],
  required: true,
  showIf: {
    questionId: "interest",
    equals: "Tech"
  }
}, {
  id: "rating",
  type: "scale",
  label: "Rating?",
  options: [],
  required: false
}];
describe("branching questionnaire validation", () => {
  it("requires visible answers and discards hidden or unknown fields", () => {
    expect(validateAnswers(questions, {
      interest: "Sport",
      detail: "Web",
      privateName: "Never store this"
    })).toEqual({
      interest: "Sport"
    });
  });
  it("requires a branch when it is visible", () => expect(() => validateAnswers(questions, {
    interest: "Tech"
  })).toThrow());
  it("rejects forged options and out-of-range scale values", () => {
    expect(() => validateAnswers(questions, {
      interest: "Hacked"
    })).toThrow();
    expect(() => validateAnswers(questions, {
      interest: "Sport",
      rating: 6
    })).toThrow();
  });
  it("does not display irrelevant questions", () => expect(visibleQuestions(questions, {
    interest: "Sport"
  }).map(q => q.id)).toEqual(["interest", "rating"]));
  it("rejects an empty required multiple answer", () => expect(() => validateAnswers([{
    id: "m",
    type: "multiple",
    label: "Pick",
    options: ["A", "B"],
    required: true
  }], {
    m: []
  })).toThrow());
  it("never accepts evidence as a normal study category", () => expect(studyInput.safeParse({
    category: "evidence"
  }).success).toBe(false));
});
