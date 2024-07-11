import styles from './style.module.css';

import { RowInfo, MedQAViewResult } from "../../types";


function MedQARowInfoText({ text }: { text: string[] }) {
  try {
    return (
      <div className={styles['info-text']}>
        {text.map((l, i) =>
          <p key={i} style={{
            textDecoration:
              l[l.length - 1] == "?" ? "underline" : "none"
          }}>
            {l}
          </p>
        )}
      </div>
    );
  }
  catch {
    return (<></>);
  }
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

  try {
    return (
      <table className={styles['info-options']}>
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
    );
  }
  catch {
    return (<></>);
  }
}

const MedQARowInfo: RowInfo<MedQAViewResult> = function ({ row }: { row: MedQAViewResult }) {
  try {
    return (
      <div className={styles['info']}>
        <h3>Question</h3>
        <MedQARowInfoText text={row.Q} />

        <h3>Options</h3>
        <MedQARowInfoOptions options={row.As} />

        <table className={styles['label-and-prediction']}>
          <tbody>
            <tr>
              <th className={styles['minitable-th']}>
                <h3>Label</h3>
                <p>{row.A0}</p>
              </th>
              <th className={styles['minitable-th']}>
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
    );
  }
  catch {
    return (<></>);
  }
};

export default MedQARowInfo;
