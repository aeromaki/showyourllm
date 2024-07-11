import medMCQAResults from "./medmcqa_result.json"
import { MedMCQAPredictionIndex, MedMCQAViewResult } from "../../types";
import { preprocessText } from "../../utils";


type MedMCQAResult = {
  question: string
  exp: string | null

  cop: number

  opa: string
  opb: string
  opc: string
  opd: string

  subject_name: string
  topic_name: string | null
  id: string,
  choice_type: string,
  reasoning: string
  "model chosen": string
  correctness: boolean
}

function convertRawPredToIndex(modelChosen: string): MedMCQAPredictionIndex {
  return modelChosen[0];
}

function convertMedMCQAResultToView(res: MedMCQAResult, i: number): MedMCQAViewResult {
  return {
    id: i,
    display: res.question,
    correctness: res.correctness,

    Q: res.question,
    A0: ["A", "B", "C", "D"][res.cop - 1],
    Am: convertRawPredToIndex(res["model chosen"]),
    As: {
      "A": res.opa,
      "B": res.opb,
      "C": res.opc,
      "D": res.opd,
    },
    reasoning: preprocessText(res.reasoning),
    subject: res.subject_name
  }
}

const medMCQAViewResults = medMCQAResults.map(convertMedMCQAResultToView);
export default medMCQAViewResults;