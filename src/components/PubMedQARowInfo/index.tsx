import styles from './style.module.css';

import { RowInfo, PubMedQAViewResult } from "../../types";


function PubMedQARowInfoText({ text }: { text: string }) {
  return (
    <div className={styles['info-text']}>
      <p>{text}</p>
    </div>
  );
}

function PubMedQARowInfoOptions() {
  const idxs = [["A", "yes"], ["B", "no"], ["C", "maybe"]];
  return (
    <table className={styles['info-options']}>
      <tbody>
        <>{
          idxs.map(i => (
            <tr key={i[0]}>
              <th>{i[0]}.</th>
              <th>{i[1]}</th>
            </tr>
          ))
        }</>
      </tbody>
    </table>
  );
}

const PubMedQARowInfo: RowInfo<PubMedQAViewResult> = function ({ row }: { row: PubMedQAViewResult }) {
  return (
    <div className={styles['info']}>
      <h3>Question</h3>
      <PubMedQARowInfoText text={row.Q} />

      <h3>Options</h3>
      <PubMedQARowInfoOptions />

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
      <PubMedQARowInfoText text={row.reasoning} />
    </div>
  );
};

export default PubMedQARowInfo;
