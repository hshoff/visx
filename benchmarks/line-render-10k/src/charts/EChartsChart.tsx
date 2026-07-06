import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart as EChartsLineChart } from 'echarts/charts';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, xValues, yValues } from './types';

echarts.use([GridComponent, EChartsLineChart, CanvasRenderer, SVGRenderer]);

const chartOption = {
  animation: false,
  grid: { left: 48, right: 16, top: 16, bottom: 32 },
  xAxis: {
    type: 'category' as const,
    data: xValues,
    boundaryGap: false,
    axisLabel: { show: false },
  },
  yAxis: {
    type: 'value' as const,
    axisLabel: { show: false },
  },
  series: [
    {
      type: 'line' as const,
      data: yValues,
      showSymbol: false,
      animation: false,
    },
  ],
};

function createEChartsRenderer(renderer: 'canvas' | 'svg'): ChartRenderer {
  return function EChartsChart() {
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={chartOption}
        style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}
        opts={{ renderer, width: CHART_WIDTH, height: CHART_HEIGHT }}
        notMerge
        lazyUpdate
      />
    );
  };
}

export const echartsCanvasCase = {
  id: 'echarts-canvas',
  name: 'ECharts Canvas',
  render: createEChartsRenderer('canvas'),
};

export const echartsSvgCase = {
  id: 'echarts-svg',
  name: 'ECharts SVG',
  render: createEChartsRenderer('svg'),
};
