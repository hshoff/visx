import { Line, LineChart, XAxis, YAxis } from 'recharts';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, lineData } from './types';

const RechartsLine: ChartRenderer = () => (
  <LineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={lineData}>
    <XAxis dataKey="x" tick={false} axisLine={false} />
    <YAxis tick={false} axisLine={false} width={48} />
    <Line
      type="linear"
      dataKey="y"
      dot={false}
      isAnimationActive={false}
      strokeWidth={2}
    />
  </LineChart>
);

export const rechartsCase = {
  id: 'recharts',
  name: 'Recharts',
  render: RechartsLine,
};
