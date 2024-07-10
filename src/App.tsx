import './App.css';
import ResultTable from './components/ResultTable';
import MedQARowInfo from './components/MedQARowInfo';
import medQAViewResults from './data/medQAViewResults';

function App() {

  return (
    <>
      <ResultTable results={medQAViewResults} RowInfo={MedQARowInfo} />
    </>
  )
}

export default App
