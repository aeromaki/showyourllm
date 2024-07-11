import styles from './ResultTable.module.css';

import { useEffect, useState } from "react";
import RowContainer from "./RowContainer";
import InfoContainer from "./InfoContainer";
import { Index, ViewResult, RowInfo } from "../../types";


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

  return (
    <div className={styles['row-filter']}>
      <button onClick={showTrueOnly}>T</button>
      <button onClick={showFalseOnly}>F</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function ResultTable<T extends ViewResult>({ results, RowInfo }: {
  results: T[],
  RowInfo: RowInfo<T>
}) {
  const [rows, setRows] = useState<T[]>(results);
  const [conv, setConv] = useState<Map<number, number> | undefined>();
  const [index, setIndex] = useState<Index>();
  const [row, setRow] = useState<T | undefined>();

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

  return (
    <div className='flex-col'>
      <RowFilter
        results={results}
        setRows={setRows}
        setConv={setConv}
      />
      <div className={`${styles['row-and-info']} flex-row`}>
        <RowContainer rows={rows} index={index} setIndex={setIndex} />
        <InfoContainer row={row} RowInfo={RowInfo} />
      </div>
    </div>
  );
}