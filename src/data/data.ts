// import pubMedQAResults_ from "./pubmedqa_result.json"


/*
type PubMedQAPrediction = "yes" | "no" | "maybe" | string;
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
}

type PubMedQAViewResult = {
  Q: string
  contexts: string[]
  labels: string[]
  meshes
  A0: MedQAPredictionIndex
  As: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  reasoning: string
  correctness: boolean
}

function convertPubMedQAResultToView(res: PubMedQAResult): PubMedQAViewResult {
  return {
    Q: res.question,
    A0: res.answer_idx,
    As: res.options,
    reasoning: res.reasoning,
    correctness: res.correctness
  }
}
*/

//export const pubMedQAResults: PubMedQAResult[] = pubMedQAResults_;