import _styles0 from '../ResultTable.module.css';
import _styles1 from './styles.module.css';
const styles = { ..._styles0, ..._styles1 };

import { useEffect, useRef } from "react";
import { ViewResult, RowInfo } from "../../../../types";

export default function InfoContainer<T extends ViewResult>({ row, initRad, save, RowInfo }: {
  row: T | undefined,
  initRad: boolean[] | null,
  save: (id: number, rad: boolean[]) => void,
  RowInfo: RowInfo<T>
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [row]);

  return (
    <div ref={ref} className={`${styles["info-container"]} ${styles.container}`}>
      {row != undefined ?
        <RowInfo row={row} initRad={initRad} save={save} /> :
        <>select row</>
      }
    </div>
  );
}