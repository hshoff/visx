import { agChartsCase } from './AgChartsChart';
import { baseUiChartsCase } from './BaseUiCharts';
import { echartsCanvasCase, echartsSvgCase } from './EChartsChart';
import { muiXCase } from './MuiXChart';
import { rechartsCase } from './RechartsChart';
import { visxShapeCase } from './VisxShapeChart';
import { visxXYChartCase } from './VisxXYChart';
import type { BenchmarkCase } from './types';

/**
 * Public libraries from Colm Tuite's benchmark, plus visx.
 * Base UI Charts is omitted — the package is not published yet. Add it here when available.
 */
export const benchmarkCases: BenchmarkCase[] = [
  ...(baseUiChartsCase ? [baseUiChartsCase] : []),
  echartsCanvasCase,
  echartsSvgCase,
  muiXCase,
  agChartsCase,
  rechartsCase,
  visxXYChartCase,
  visxShapeCase,
];

export type { BenchmarkCase, ChartRenderer } from './types';
