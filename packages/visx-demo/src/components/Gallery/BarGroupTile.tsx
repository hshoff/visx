import React from 'react';
import type { BarGroupProps } from '../../examples/visx-bargroup/example';
import BarGroup, { background, green } from '../../examples/visx-bargroup/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-bargroup/package.json';

const tileStyles = { background };
const detailsStyles = { color: green };

export default function BarGroupTile() {
  return (
    <GalleryTile<BarGroupProps>
      title="Bar Group"
      description="<Shape.BarGroup />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarGroup}
      exampleUrl="/bargroup"
      tileStyles={tileStyles}
    />
  );
}
