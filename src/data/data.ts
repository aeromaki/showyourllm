import medQAResults_ from "./medqa_result.json"
// import pubMedQAResults_ from "./pubmedqa_result.json"

type MedQAPredictionIndex = "A" | "B" | "C" | "D" | "E" | string;
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

export type MedQAViewResult = {
  id: number,
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
  correctness: boolean
}

function preprocessText(text: string): string[] {
  const lines = text.replace(
    /[.][ ][A-Z]/g,
    str => `.\n${str[str.length - 1]}`
  ).split('\n');

  const lastLine = lines[lines.length - 1];
  const end = lastLine.search(/[?]/);
  if (end > 0) {
    lines[lines.length - 1] = lastLine.slice(0, end + 1);
  }

  return lines;
}

function convertRawPredToIndex(modelChosen: string): MedQAPredictionIndex {
  return modelChosen[0];
}

function convertMedQAResultToView(res: MedQAResult, i: number): MedQAViewResult {
  return {
    id: i,
    Q: preprocessText(res.question),
    A0: res.answer_idx,
    Am: convertRawPredToIndex(res["model chosen"]),
    As: res.options,
    reasoning: preprocessText(res.reasoning),
    correctness: res.correctness
  }
}

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

const medQAResults: MedQAResult[] = medQAResults_;

export function loadMedQAViewResults(): MedQAViewResult[] {
  return medQAResults.map(convertMedQAResultToView);
}
//export const pubMedQAResults: PubMedQAResult[] = pubMedQAResults_;