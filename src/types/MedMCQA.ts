import { ViewResult } from "./ResultTable";

export type MedMCQAPredictionIndex = "A" | "B" | "C" | "D" | string;
export type MedMCQAViewResult = ViewResult & {
  id: number,
  display: string,
  correctness: boolean,

  Q: string
  A0: MedMCQAPredictionIndex
  Am: MedMCQAPredictionIndex
  As: {
    A: string
    B: string
    C: string
    D: string
  }
  reasoning: string[]
  subject: string
};