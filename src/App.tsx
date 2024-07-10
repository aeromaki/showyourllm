import './App.css';
import ResultTable from './components/Containers/ResultTable';
import MedQARowInfo from './components/MedQA/MedQARowInfo';
import medQAViewResults from './components/MedQA/data/medQAViewResults';

function App() {

  return (
    <>
      <ResultTable results={medQAViewResults} RowInfo={MedQARowInfo} />
    </>
  )
}

export default App
