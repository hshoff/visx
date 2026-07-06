import { LineChart } from '@mui/x-charts/LineChart';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, xValues, yValues } from './types';

const MuiXLineChart: ChartRenderer = () => (
  <LineChart
    xAxis={[{ data: xValues, scaleType: 'linear', domainLimit: 'nice' }]}
    series={[{ data: yValues, showMark: false }]}
    width={CHART_WIDTH}
    height={CHART_HEIGHT}
    skipAnimation
    margin={{ left: 48, right: 16, top: 16, bottom: 32 }}
  />
);

export const muiXCase = {
  id: 'mui-x',
  name: 'MUI X SVG',
  render: MuiXLineChart,
};
