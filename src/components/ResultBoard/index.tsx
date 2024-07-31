import styles from './styles.module.css';

import { useEffect, useState, useRef } from 'react';
import { loadMedQAGPT35ViewResults, loadMedQAMeerkatViewResults } from "../../data/medQAViewResults";
import MedQARowInfo from "../MedQARowInfo";

import ResultTable from "./ResultTable";
import { ViewResult, RowInfo } from '../../types';

export default function ResultBoard() {
    const [b, setB] = useState<0 | 1>(0);

    const [resultss, setResultss] = useState<[ViewResult[], RowInfo<ViewResult & any>][]>([]);

    const L = 200;
    const [res, setRes] = useState<(boolean[] | null)[]>(Array(L).map(_ => null));
    const [res1, setRes1] = useState<(boolean[] | null)[]>(Array(L).map(_ => null));
    const rr = [res, res1];
    const rr2 = [setRes, setRes1];

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

    const saveProgress = () => {
        const json = JSON.stringify({
            gpt: res,
            meerkat: res1
        });
        const blob = new Blob([json], { type: "text/plain" });

        const element = document.createElement("a");
        element.href = window.URL.createObjectURL(blob);
        element.download = "progress.json";
        document.body.appendChild(element);
        element.click();
    };

    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<FileList | null>(null);
    useEffect(() => {
        if (file) {
            file[0].text().then(res => {
                const prog = JSON.parse(res);
                setRes(prog.gpt);
                setRes1(prog.meerkat);
            }).catch(_ => {
                alert("something went wrong!");
            });
        }
    }, [file]);

    const loadProgress = () => {
        fileRef.current?.click();
    };

    return (
        <div className={styles['result-board']}>
            <div className={`${styles['button-bar']} flex-row`}>
                <button style={bStyle(b == 0)} onClick={() => {
                    setB(0);
                }}>GPT-3.5</button>
                <button style={bStyle(b == 1)} onClick={() => {
                    setB(1);
                }}>Meerkat</button>
                <button onClick={() => saveProgress()}>Save Progress</button>
                <button onClick={() => loadProgress()}>Load Progress</button>
                <input ref={fileRef} type="file" onChange={e => setFile(e.target.files)} style={{ display: 'none', visibility: 'hidden' }} />
            </div>
            {
                resultss.length > 0 ?
                    <ResultTable results={resultss[b][0]} RowInfo={resultss[b][1]} res={rr[b]} setRes={rr2[b]} /> : <></>
            }
        </div>
    );
}