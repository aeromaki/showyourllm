import { MedQAPredictionIndex, MedQAViewResult } from "../types";
import { preprocessText } from "../utils";


interface MedQAResult {
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  output: string
  prediction: MedQAPredictionIndex | null
  label: MedQAPredictionIndex
}


function convertMedQAResultToView(res: MedQAResult, i: number): MedQAViewResult {
  return {
    id: i,
    display: res.question,
    correctness: res.prediction == res.label,

    Q: preprocessText(res.question),
    A0: res.label,
    Am: res.prediction,
    As: res.options,
    reasoning: preprocessText(res.output),
  }
}

async function loadMedQAViewResults(src: string): Promise<MedQAViewResult[]> {
  return await fetch(src)
    .then(res => res.json())
    .then(res => res.data.map(convertMedQAResultToView))
    .catch(err => console.log(err));
}

export async function loadMedQAGPT35ViewResults(): Promise<MedQAViewResult[]> {
  return await loadMedQAViewResults("json/MedQA_GPT35.json");
}

export async function loadMedQAMeerkatViewResults(): Promise<MedQAViewResult[]> {
  return await loadMedQAViewResults("json/MedQA_Meerkat8B.json");
}