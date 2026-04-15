import React from 'react';
import type { XYChartProps } from '../../examples/visx-xychart/example';
import XYChart from '../../examples/visx-xychart/example';
import GalleryTile from '../GalleryTile';

function XYChartWrapper(props) {
  if (typeof window === 'undefined') return null;
  return <XYChart {...props} />;
}

export { default as packageJson } from '../../examples/visx-xychart/package.json';

const tileStyles = { background: '#222' };

export default function XYChartITile() {
  return (
    <GalleryTile<XYChartProps>
      title="XYChart"
      description="<XYChart />"
      exampleRenderer={XYChartWrapper}
      exampleUrl="/xychart"
      tileStyles={tileStyles}
      detailsHeight={0}
    />
  );
}
