import type { LineDatum } from './data';
import { CHART_HEIGHT, CHART_WIDTH, lineData, xValues, yValues } from './data';

import type { ReactElement } from 'react';

export type ChartRenderer = () => ReactElement;

export type BenchmarkCase = {
  id: string;
  name: string;
  render: ChartRenderer;
};

export { CHART_HEIGHT, CHART_WIDTH, lineData, xValues, yValues };
export type { LineDatum };
