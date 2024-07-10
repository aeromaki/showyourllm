import medQAResults from "./medqa_result.json"
import { MedQAPredictionIndex, MedQAViewResult } from "../types";
import { preprocessText } from "../../../utils";

type MedQAResult = {
  question: string
  answer: string
  options: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  meta_info: string
  answer_idx: MedQAPredictionIndex
  reasoning: string
  "model chosen": string
  correctness: boolean
}

function convertRawPredToIndex(modelChosen: string): MedQAPredictionIndex {
  return modelChosen[0];
}

function convertMedQAResultToView(res: MedQAResult, i: number): MedQAViewResult {
  return {
    id: i,
    display: res.question,
    correctness: res.correctness,

    Q: preprocessText(res.question),
    A0: res.answer_idx,
    Am: convertRawPredToIndex(res["model chosen"]),
    As: res.options,
    reasoning: preprocessText(res.reasoning),
  }
}

const medQAViewResults = medQAResults.map(convertMedQAResultToView);
export default medQAViewResults;