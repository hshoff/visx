import { AgCharts } from 'ag-charts-react';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, lineData } from './types';

const AgChartsLine: ChartRenderer = () => (
  <AgCharts
    options={{
      data: lineData,
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      animation: { enabled: false },
      axes: [
        { type: 'number', position: 'bottom', label: { enabled: false } },
        { type: 'number', position: 'left', label: { enabled: false } },
      ],
      series: [
        {
          type: 'line',
          xKey: 'x',
          yKey: 'y',
          marker: { enabled: false },
        },
      ],
      legend: { enabled: false },
      padding: { top: 16, right: 16, bottom: 32, left: 48 },
    }}
  />
);

export const agChartsCase = {
  id: 'ag-charts',
  name: 'AG Charts',
  render: AgChartsLine,
};
