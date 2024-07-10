import { ViewResult } from "./ResultTable";

export type MedQAPredictionIndex = "A" | "B" | "C" | "D" | "E" | string;
export type MedQAViewResult = ViewResult & {
  id: number,
  display: string,
  correctness: boolean,

  Q: string[]
  A0: MedQAPredictionIndex
  Am: MedQAPredictionIndex
  As: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  reasoning: string[]
};