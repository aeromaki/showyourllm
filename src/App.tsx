import { useEffect, useState, useRef } from 'react'
import './App.css'

import { loadMedQAViewResults, MedQAViewResult } from './data/data'

type SetRow = React.Dispatch<React.SetStateAction<number | undefined>>;

function MedQARow({ res, row, setRow }: {
  res: MedQAViewResult,
  row: number | undefined,
  setRow: SetRow
}) {
  const isSelected = res.id == row;
  const rowStyle = isSelected ? {
    borderColor: "lightgray",
    backgroundColor: res.correctness ? "green" : "red",
    color: "white"
  } : undefined;
  const borderRightStyle = isSelected ? { borderColor: "lightgray" } : undefined;
  const correctnessColor = (() => {
    let color;
    switch (true) {
      case isSelected:
        color = "white";
        break;
      case res.correctness && !isSelected:
        color = "black";
        break;
      default:
        color = "red";
        break;
    }
    return color;
  })();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [row]);

  return (
    <div
      ref={ref}
      className='result flex-row prevent-select'
      style={rowStyle}
      onClick={() => setRow(res.id)}
    >
      <div
        className='result-index'
        style={borderRightStyle}
      >{res.id}</div>
      <div
        className='result-correctness' style={{
          color: correctnessColor,
          borderColor: borderRightStyle?.borderColor
        }}>
        {res.correctness ? 'T' : 'F'}
      </div>
      <div className='result-q' title="">{res.Q}</div>
    </div>
  )
}

type Row = number | undefined;

function MedQAContainer({ results, row, setRow }: {
  results: MedQAViewResult[],
  row: number | undefined,
  setRow: SetRow
}) {
  const [curKey, setCurKey] = useState<string | undefined>();
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (true && curKey == undefined) {
        setCurKey(e.key);

        if (["ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();

          const scrollDown = (r: Row) => {
            const canScroll = (r != undefined) && (r < results.length - 1);
            return canScroll ? (r + 1) : r;
          };

          const scrollUp = (r: Row) => {
            const canScroll = (r != undefined) && (r > 0);
            return canScroll ? (r - 1) : r;
          }

          setRow(e.key == "ArrowDown" ? scrollDown : scrollUp);
        };
      }
    };
    const keyUpHandler = () => {
      setCurKey(undefined);
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <div className='result-container'>
      {results.map((res) => <MedQARow key={res.id} res={res} row={row} setRow={setRow} />)}
    </div>
  )
}

function InfoContainer({ row }: { row: MedQAViewResult | undefined }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [row]);

  return (
    <div ref={ref} className='result-container'>
      {row != undefined ?
        <Info row={row} /> :
        <>select row</>
      }
    </div>
  )
}

function InfoText({ text }: { text: string[] }) {
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

function InfoOptions({ options }: {
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

function Info({ row }: { row: MedQAViewResult }) {
  return (
    <div className='info'>
      <h3>Question</h3>
      <InfoText text={row.Q} />

      <h3>Options</h3>
      <InfoOptions options={row.As} />

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
      <InfoText text={row.reasoning} />
    </div>
  )
}

function App() {
  const results = loadMedQAViewResults();

  const [row, setRow] = useState<number | undefined>();

  return (
    <div className='flex-row'>
      <MedQAContainer results={results} row={row} setRow={setRow} />
      <InfoContainer row={row != undefined ? results[row] : undefined} />
    </div>
  )
}

export default App
