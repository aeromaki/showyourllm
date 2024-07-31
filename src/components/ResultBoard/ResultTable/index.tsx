import styles from './ResultTable.module.css';

import { SetStateAction, useEffect, useState } from "react";
import RowContainer from "./RowContainer";
import InfoContainer from "./InfoContainer";
import { Index, ViewResult, RowInfo } from "../../../types";


function RowFilter<T extends ViewResult>({ results, setRows, setConv }: {
  results: T[],
  setRows: React.Dispatch<React.SetStateAction<T[]>>,
  setConv: React.Dispatch<React.SetStateAction<Map<number, number> | undefined>>
}) {
  const createOnClick = (f?: (row: T) => boolean) => () => {
    if (f == undefined) {
      setRows(results);
      setConv(undefined);
    }
    else {
      const filtered = results.filter(f);
      const newConv = new Map<number, number>();
      for (const [i, row] of filtered.entries()) {
        newConv.set(row.id, i);
      }
      setConv(newConv);
      setRows(filtered);
    }
  };
  const showTrueOnly = createOnClick((row: T) => row.correctness);
  const showFalseOnly = createOnClick((row: T) => !row.correctness);
  const reset = createOnClick();

  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const bStyle1 = (b: boolean) => b ? {
    backgroundColor: "green",
    color: "white"
  } : undefined;
  const bStyle2 = (b: boolean) => b ? {
    backgroundColor: "red",
    color: "white"
  } : undefined;

  const reset0 = () => {
    reset();
    setB1(false);
    setB2(false);
  };
  useEffect(reset0, [results]);

  return (
    <div className={`${styles['row-filter']} flex-row`}>
      <button style={bStyle1(b1)} onClick={() => {
        showTrueOnly();
        setB1(true);
        setB2(false);
      }}>T</button>
      <button style={bStyle2(b2)} onClick={() => {
        showFalseOnly();
        setB1(false);
        setB2(true);
      }}>F</button>
      <button onClick={() => reset0()}>Reset</button>
    </div>
  );
}

export default function ResultTable<T extends ViewResult>({ results, RowInfo, res, setRes, store }: {
  results: T[],
  RowInfo: RowInfo<T>,
  res: (boolean[] | null)[],
  setRes: React.Dispatch<SetStateAction<(boolean[] | null)[]>>,
  store: () => void
}) {
  const [rows, setRows] = useState<T[]>(results);
  const [conv, setConv] = useState<Map<number, number> | undefined>();
  const [index, setIndex] = useState<Index>();
  const [row, setRow] = useState<T | undefined>();

  useEffect(() => {
    setRows(results);
    setConv(undefined);
    setIndex(undefined);
    setRow(undefined);
  }, [results, RowInfo]);

  const getRow = (i: Index) => {
    if (i == undefined) {
      return undefined;
    }
    if (conv == undefined) {
      return rows[i];
    }

    const newI = conv.get(i);
    if (newI == undefined) {
      if (row?.correctness == rows[0].correctness) {
        if (i > row.id) {
          const newII = (conv.get(row.id) ?? rows.length) + 1;
          if (newII < rows.length) return rows[newII];
          else return rows[newII - 1];
        }
        else {
          const newII = (conv.get(row.id) ?? 0) - 1;
          if (newII >= 0) return rows[newII];
          else return rows[newII + 1];
        }
      }
      else {
        return undefined;
      }
    }

    return rows[newI];
  };

  useEffect(() => {
    const newRow = getRow(index);
    setIndex(newRow?.id);
    setRow(newRow);
  }, [index, conv]);

  const save = (id: number, rad: boolean[]) => {
    setRes(s => {
      let ss = s;
      ss[id] = rad;
      return ss;
    });
    store();
  }

  return (
    <div className={`${styles['result-table']} flex-col`}>
      <RowFilter
        results={results}
        setRows={setRows}
        setConv={setConv}
      />
      <div className={styles['row-and-info']}>
        <RowContainer rows={rows} res={res} index={index} setIndex={setIndex} />
        <InfoContainer row={row} initRad={row ? res[row.id] : null} save={save} RowInfo={RowInfo} />
      </div>
    </div>
  );
}