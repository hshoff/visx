import React from 'react';
import type { AxisProps } from '../../examples/visx-axis/example';
import Axis, { backgroundColor, labelColor } from '../../examples/visx-axis/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-axis/package.json';

const tileStyles = { backgroundColor };
const detailsStyles = { color: labelColor };
const exampleProps = { showControls: false };

export default function AxisTile() {
  return (
    <GalleryTile<AxisProps>
      title="Axes & scales"
      description="<Axis.AxisBottom />"
      detailsStyles={detailsStyles}
      detailsHeight={20}
      exampleProps={exampleProps}
      exampleRenderer={Axis}
      exampleUrl="/axis"
      tileStyles={tileStyles}
    />
  );
}
