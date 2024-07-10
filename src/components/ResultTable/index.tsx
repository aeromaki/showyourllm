// import styles from './style.module.css';
import { useState } from "react";
import RowContainer from "./RowContainer";
import InfoContainer from "./InfoContainer";
import { Index, ViewResult, RowInfo } from "../../types";

export default function ResultTable<T>({ results, RowInfo }: {
  results: (ViewResult & T)[],
  RowInfo: RowInfo<T>
}) {
  const [index, setIndex] = useState<Index>();

  return (
    <div className='flex-col'>
      asdf
      <div className='flex-row'>
        <RowContainer results={results} index={index} setIndex={setIndex} />
        <InfoContainer row={index != undefined ? results[index] : undefined} RowInfo={RowInfo} />
      </div>
    </div>
  )
}