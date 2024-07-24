import styles from './styles.module.css';

import { useEffect, useState } from 'react';
import { loadMedQAGPT35ViewResults, loadMedQAMeerkatViewResults } from "../../data/medQAViewResults";
import MedQARowInfo from "../MedQARowInfo";

import ResultTable from "./ResultTable";
import { ViewResult, RowInfo } from '../../types';

export default function ResultBoard() {
    const [b, setB] = useState<0 | 1>(0);

    const [resultss, setResultss] = useState<[ViewResult[], RowInfo<ViewResult & any>][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setResultss([
                [await loadMedQAGPT35ViewResults(), MedQARowInfo],
                [await loadMedQAMeerkatViewResults(), MedQARowInfo]
            ]);
        };
        fetchData();
    }, [])

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
            {
                resultss.length > 0 ?
                    <ResultTable results={resultss[b][0]} RowInfo={resultss[b][1]} /> : <></>
            }
        </div>
    );
}