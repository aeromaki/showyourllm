import './style.css';
import { useEffect, useRef } from "react";
import { ViewResult, RowInfo } from "../../../types";

export default function InfoContainer<T>({ row, RowInfo }: {
  row: (ViewResult & T) | undefined,
  RowInfo: RowInfo<T>
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [row]);

  return (
    <div ref={ref} className='info-container container'>
      {row != undefined ?
        <RowInfo row={row} /> :
        <>select row</>
      }
    </div>
  )
}