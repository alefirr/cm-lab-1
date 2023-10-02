import { getChartData } from '../algorithm';
import './Chart.css';

function App() {
  const { xAxis, yAxis } = getChartData();

  return (
    <div className="App">
      {xAxis.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
      ==============================================
      <br />
      ==============================================
      <br />
      {yAxis.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
}

export default App;
