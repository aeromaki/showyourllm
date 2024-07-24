import styles from './styles.module.css';

import { useState } from 'react';
import { medQAGPT35ViewResults, medQAMeerkatViewResults } from "../../data/medQAViewResults";
import MedQARowInfo from "../MedQARowInfo";

import ResultTable from "./ResultTable";
import { ViewResult, RowInfo } from '../../types';

const resultss: [ViewResult[], RowInfo<ViewResult & any>][] = [
    [medQAGPT35ViewResults, MedQARowInfo],
    [medQAMeerkatViewResults, MedQARowInfo]
];

export default function ResultBoard() {
    const [b, setB] = useState<0 | 1>(0);

    const bStyle = (b: boolean) => b ? {
        backgroundColor: "white",
    } : undefined;

    return (
        <div className={styles['result-board']}>
            <div className={`${styles['button-bar']} flex-row`}>
                <button style={bStyle(b == 0)} onClick={() => {
                    setB(0);
                }}>GPT-3.5</button>
                <button style={bStyle(b == 1)} onClick={() => {
                    setB(1);
                }}>Meerkat</button>
            </div>
            <ResultTable results={resultss[b][0]} RowInfo={resultss[b][1]} />
        </div>
    );
}