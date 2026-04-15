import React from 'react';
import type { StatsPlotProps } from '../../examples/visx-stats/example';
import StatsPlot from '../../examples/visx-stats/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-stats/package.json';

const tileStyles = { background: '#8a88e3' };
const detailsStyles = { color: '#ffffff', zIndex: 1 };

export default function StatsPlotTile() {
  return (
    <GalleryTile<StatsPlotProps>
      title="Stats Plots"
      description="<BoxPlot /> & <ViolinPlot />"
      exampleRenderer={StatsPlot}
      exampleUrl="/statsplot"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
