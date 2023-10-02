import Plot from 'react-plotly.js';
import { CONFIG, getChartData } from './algorithm';

function App() {
  const { xAxis, yAxis } = getChartData();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Plot
        data={[
          {
            x: xAxis,
            y: yAxis,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'red' },
            name: 'g(x)',
          },
        ]}
        layout={{
          width: 1650,
          height: 850,
          yaxis: { range: [CONFIG.Y_DISPAY_START, CONFIG.Y_DISPAY_END] },
        }}
      />
    </div>
  );
}

export default App;
