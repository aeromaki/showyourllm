import './style.css';
import { MedQAViewResult } from "./types";
import { RowInfo } from "../types";


function MedQARowInfoText({ text }: { text: string[] }) {
  return (
    <div className='info-text'>
      {text.map((l, i) =>
        <p key={i} style={{
          textDecoration:
            l[l.length - 1] == "?" ? "underline" : "none"
        }}>
          {l}
        </p>
      )}
    </div>
  )
}

function MedQARowInfoOptions({ options }: {
  options: {
    A: string,
    B: string,
    C: string,
    D: string,
    E: string
  }
}) {
  const idxs: ("A" | "B" | "C" | "D" | "E")[]
    = ["A", "B", "C", "D", "E"];
  return (
    <table className='info-options'>
      <tbody>
        <>{
          idxs.map(i => (
            <tr key={i}>
              <th>{i}.</th>
              <th>{options[i]}</th>
            </tr>
          ))
        }</>
      </tbody>
    </table>
  )
}

const MedQARowInfo: RowInfo<MedQAViewResult> = function ({ row }: { row: MedQAViewResult }) {
  return (
    <div className='info'>
      <h3>Question</h3>
      <MedQARowInfoText text={row.Q} />

      <h3>Options</h3>
      <MedQARowInfoOptions options={row.As} />

      <table className='label-and-prediction'>
        <tbody>
          <tr>
            <th className='minitable-th'>
              <h3>Label</h3>
              <p>{row.A0}</p>
            </th>
            <th className='minitable-th'>
              <h3>Prediction</h3>
              <p style={{
                color: row.A0 == row.Am ? "green" : "red"
              }}>{row.Am}</p>
            </th>
          </tr>
        </tbody>
      </table>

      <h3>Reasoning</h3>
      <MedQARowInfoText text={row.reasoning} />
    </div>
  )
};

export default MedQARowInfo;
