import styles from './styles.module.css';

import { RowInfo, MedQAViewResult } from "../../types";
import { SetStateAction, useEffect, useState } from 'react';


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

function MedQARowLabel({ rad, setRad }: {
  rad: boolean[],
  setRad: React.Dispatch<SetStateAction<boolean[]>>,
  //text: string,
  //setText: React.Dispatch<SetStateAction<string>>
}) {
  return (
    <>
      <table className={styles['info-options']}>
        <tbody style={{ color: 'black', fontSize: '15px' }}>
          <tr>
            <th><input type='radio' checked={rad[0]} readOnly={true} onClick={() => {
              setRad(r => [!r[0], r[1], r[2], r[3]]);
            }} /></th>
            <th>1. Incorrect knowledge</th>
          </tr>
          <tr>
            <th><input type='radio' checked={rad[1]} readOnly={true} onClick={() => {
              setRad(r => [r[0], !r[1], r[2], r[3]]);
            }} /></th>
            <th>2. Incorrect linking of knowledge/information</th>
          </tr>
          <tr>
            <th><input type='radio' checked={rad[2]} readOnly={true} onClick={() => {
              setRad(r => [r[0], r[1], !r[2], r[3]]);
            }} /></th>
            <th>3. Some information in the question was ignored</th>
          </tr>
          <tr>
            <th><input type='radio' checked={rad[3]} readOnly={true} onClick={() => {
              setRad(r => [r[0], r[1], r[2], !r[3]]);
            }} /></th>
            <th>4. else</th>
          </tr>
        </tbody>
      </table>
      {/*
      <textarea onChange={e => setText(e.target.value)} />
      */}
    </>
  )
}

const MedQARowInfo: RowInfo<MedQAViewResult> = function ({ row, initRad, save }: {
  row: MedQAViewResult,
  initRad: boolean[] | null,
  save: (id: number, rad: boolean[]) => void
}) {

  const [rad, setRad] = useState<boolean[]>([false, false, false, false]);
  // const [text, setText] = useState("");

  useEffect(() => {
    setRad(initRad ? initRad : [false, false, false, false]);
  }, [row, initRad]);

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
                }}>{row.Am ?? "parse failed"}</p>
              </th>
            </tr>
          </tbody>
        </table>

        <h3>Reasoning</h3>
        <MedQARowInfoText text={row.reasoning} />

        {
          !row.correctness ?
            <>
              <h3>Why wrong?</h3>
              <MedQARowLabel rad={rad} setRad={setRad} /> {/* text={text} setText={setText} /> */}
              <button style={{ marginTop: '30px' }} onClick={() => {
                if (rad.reduce((a, b) => a || b)) {
                  save(row.id, rad);
                } else {
                  alert("select at least one!");
                }
              }}>save</button>
            </> : <></>
        }
      </div>
    );
  }
  catch {
    return (<></>);
  }
};

export default MedQARowInfo;
