import pubMedQAResults from "./pubmedqa_result.json"
import { PubMedQAPrediction, PubMedQAViewResult } from "../../types";


type PubMedQAResult = {
  pmid: string
  QUESTION: string
  CONTEXTS: string[]
  LABELS: string[]
  MESHES: string[]
  YEAR: string | null,
  reasoning_required_pred: PubMedQAPrediction
  reasoning_free_pred: PubMedQAPrediction
  final_decision: PubMedQAPrediction
  LONG_ANSWER: string
  reasoning: string
  "model chosen": string
  correctness: boolean
};

function preprocessPrediction(am: string): PubMedQAPrediction {
  for (const i of ["yes", "no", "maybe"]) {
    if (am.includes(i)) return i;
  }
  return "maybe";
}

function convertPubMedQAResultToView(res: PubMedQAResult, i: number): PubMedQAViewResult {
  return {
    id: i,
    display: res.QUESTION,
    correctness: res.correctness,

    Q: res.QUESTION,
    A0: res.final_decision,
    Am: preprocessPrediction(res["model chosen"]),

    contexts: res.CONTEXTS,
    labels: res.LABELS,
    reasoning: res.reasoning
  }
};

const pubMedQAViewResults = pubMedQAResults.map(convertPubMedQAResultToView);
export default pubMedQAViewResults;