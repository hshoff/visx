import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveLinear } from '@visx/curve';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { useMemo } from 'react';
import type { ChartRenderer } from './types';
import { CHART_HEIGHT, CHART_WIDTH, lineData } from './types';

const margin = { top: 16, right: 16, bottom: 32, left: 48 };

const VisxShapeLineChart: ChartRenderer = () => {
  const innerWidth = CHART_WIDTH - margin.left - margin.right;
  const innerHeight = CHART_HEIGHT - margin.top - margin.bottom;

  const yExtent = useMemo(() => {
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (const point of lineData) {
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
    return [minY, maxY] as const;
  }, []);

  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: [lineData[0].x, lineData[lineData.length - 1].x],
        range: [0, innerWidth],
      }),
    [innerWidth],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: yExtent,
        range: [innerHeight, 0],
        nice: true,
      }),
    [innerHeight, yExtent],
  );

  return (
    <svg width={CHART_WIDTH} height={CHART_HEIGHT}>
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={lineData}
          x={(d) => xScale(d.x) ?? 0}
          y={(d) => yScale(d.y) ?? 0}
          curve={curveLinear}
          stroke="#3b82f6"
          strokeWidth={2}
        />
        <AxisBottom top={innerHeight} scale={xScale} numTicks={4} tickLength={0} />
        <AxisLeft scale={yScale} numTicks={4} tickLength={0} />
      </Group>
    </svg>
  );
};

export const visxShapeCase = {
  id: 'visx-shape',
  name: 'visx shape (LinePath)',
  render: VisxShapeLineChart,
};
