import styles from './style.module.css';

import { RowInfo, MedMCQAViewResult } from "../../types";


function MedMCQARowInfoText({ text }: { text: string }) {
  return (
    <div className={styles['info-text']}>
      <p>{text}</p>
    </div>
  );
}

function MedMCQARowInfoTextLines({ text }: { text: string[] }) {
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


function MedMCQARowInfoOptions({ options }: {
  options: {
    A: string,
    B: string,
    C: string,
    D: string
  }
}) {
  const idxs: ("A" | "B" | "C" | "D")[]
    = ["A", "B", "C", "D"];

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

const MedMCQARowInfo: RowInfo<MedMCQAViewResult> = function ({ row }: { row: MedMCQAViewResult }) {
  try {
    return (
      <div className={styles['info']}>
        <h3>Question</h3>
        <MedMCQARowInfoText text={row.Q} />

        <h3>Options</h3>
        <MedMCQARowInfoOptions options={row.As} />

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
        <MedMCQARowInfoTextLines text={row.reasoning} />
      </div>
    );
  }
  catch {
    return (<></>);
  }
};

export default MedMCQARowInfo;
