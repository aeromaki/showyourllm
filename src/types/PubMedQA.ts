import { ViewResult } from "./ResultTable";

export type PubMedQAPrediction = "yes" | "no" | "maybe" | string;
export type PubMedQAViewResult = ViewResult & {
  id: number
  display: string
  correctness: boolean

  Q: string
  A0: PubMedQAPrediction
  Am: PubMedQAPrediction

  contexts: string[]
  labels: string[]
  reasoning: string[]
};