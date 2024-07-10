import _styles0 from '../ResultTable.module.css';
import _styles1 from './style.module.css';
const styles = { ..._styles0, ..._styles1 };

import { useState, useEffect, useRef } from 'react';
import { Index, SetIndex, ViewResult } from '../../../types'

function Row({ row, index, setIndex }: {
  row: ViewResult,
  index: Index,
  setIndex: SetIndex
}) {
  const isSelected = row.id == index;
  const rowStyle = isSelected ? {
    borderColor: "lightgray",
    backgroundColor: row.correctness ? "green" : "red",
    color: "white"
  } : undefined;
  const borderRightStyle = isSelected ? { borderColor: "lightgray" } : undefined;
  const correctnessColor = (() => {
    let color;
    switch (true) {
      case isSelected:
        color = "white";
        break;
      case row.correctness && !isSelected:
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
  }, [index]);

  return (
    <div
      ref={ref}
      className={`${styles.row} flex-row prevent-select`}
      style={rowStyle}
      onClick={() => setIndex(row.id)}
    >
      <div
        className={styles['row-index']}
        style={borderRightStyle}
      >{row.id}</div>
      <div
        className={styles['row-correctness']} style={{
          color: correctnessColor,
          borderColor: borderRightStyle?.borderColor
        }}>
        {row.correctness ? 'T' : 'F'}
      </div>
      <div className={styles['row-q']}>{row.display}</div>
    </div>
  )
}

export default function RowContainer<T>({ results, index, setIndex }: {
  results: (ViewResult & T)[],
  index: Index,
  setIndex: SetIndex
}) {
  const [curKey, setCurKey] = useState<string | undefined>();
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (true && curKey == undefined) {
        setCurKey(e.key);

        if (["ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();

          const scrollDown = (i: Index) => {
            const canScroll = (i != undefined) && (i < results.length - 1);
            return canScroll ? (i + 1) : i;
          };

          const scrollUp = (i: Index) => {
            const canScroll = (i != undefined) && (i > 0);
            return canScroll ? (i - 1) : i;
          }

          setIndex(e.key == "ArrowDown" ? scrollDown : scrollUp);
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
    <div className={`${styles['row-container']} ${styles.container}`}>
      {results.map((row) => <Row
        key={row.id}
        row={row}
        index={index}
        setIndex={setIndex}
      />)}
    </div>
  )
}