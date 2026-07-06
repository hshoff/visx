import { Axis, LineSeries, XYChart } from '@visx/xychart';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, lineData } from './types';

const accessors = {
  xAccessor: (d: { x: number; y: number }) => d.x,
  yAccessor: (d: { x: number; y: number }) => d.y,
};

const VisxXYLineChart: ChartRenderer = () => (
  <XYChart
    width={CHART_WIDTH}
    height={CHART_HEIGHT}
    xScale={{ type: 'linear' }}
    yScale={{ type: 'linear' }}
    margin={{ top: 16, right: 16, bottom: 32, left: 48 }}
  >
    <Axis orientation="bottom" numTicks={4} tickLength={0} />
    <Axis orientation="left" numTicks={4} tickLength={0} />
    <LineSeries dataKey="line" data={lineData} {...accessors} />
  </XYChart>
);

export const visxXYChartCase = {
  id: 'visx-xychart',
  name: 'visx XYChart',
  render: VisxXYLineChart,
};
