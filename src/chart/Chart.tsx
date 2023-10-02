import { exports } from '../algorithm';
import './Chart.css';

function App() {
  return (
    <div className="App">
      {exports.xAxis.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
      ==============================================
      <br />
      ==============================================
      <br />
      {exports.yAxis.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
}

export default App;
