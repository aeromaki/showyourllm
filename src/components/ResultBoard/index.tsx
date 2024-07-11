import styles from './style.module.css';

import { useState } from 'react';
import medQAViewResults from "../../data/medQAViewResults";
import pubMedQAViewResults from '../../data/pudMedQAViewResults';
import medMCQAViewResults from '../../data/medMCQAViewResults';
import MedQARowInfo from "../MedQARowInfo";
import PubMedQARowInfo from '../PubMedQARowInfo';
import MedMCQARowInfo from '../MedMCQARowInfo';

import ResultTable from "./ResultTable";
import { ViewResult, RowInfo } from '../../types';

const resultss: [ViewResult[], RowInfo<ViewResult & any>][] = [
    [medQAViewResults, MedQARowInfo],
    [pubMedQAViewResults, PubMedQARowInfo],
    [medMCQAViewResults, MedMCQARowInfo]
];

export default function ResultBoard() {
    const [b, setB] = useState<0 | 1 | 2>(0);

    const bStyle = (b: boolean) => b ? {
        backgroundColor: "#EEEEEE",
    } : undefined;

    return (
        <div>
            <div className={`${styles['button-bar']} flex-row`}>
                <button style={bStyle(b == 0)} onClick={() => {
                    setB(0);
                }}>MedQA</button>
                <button style={bStyle(b == 1)} onClick={() => {
                    setB(1);
                }}>PubMedQA</button>
                <button style={bStyle(b == 2)} onClick={() => {
                    setB(2);
                }}>MedMCQA</button>
            </div>
            <ResultTable results={resultss[b][0]} RowInfo={resultss[b][1]} />
        </div>
    );
}