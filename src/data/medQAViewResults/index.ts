import medQAGPT35Results from "./MedQA_GPT35_3shot_200.json"
import medQAMeerkatResults from "./MedQA_Meerkat8B_3shot_200_postprocessed.json"
import { MedQAPredictionIndex, MedQAViewResult } from "../../types";
import { preprocessText } from "../../utils";


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


const medQAGPT35ViewResults = medQAGPT35Results.map(convertMedQAResultToView);
const medQAMeerkatViewResults = medQAMeerkatResults.map(convertMedQAResultToView);


export { medQAGPT35ViewResults, medQAMeerkatViewResults };