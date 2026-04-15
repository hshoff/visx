import React from 'react';
import type { RadarProps } from '../../examples/visx-radar/example';
import Radar, { background, pumpkin } from '../../examples/visx-radar/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-radar/package.json';

const tileStyles = { background };
const detailsStyles = { color: pumpkin };

export default function RadarTile() {
  return (
    <GalleryTile<RadarProps>
      title="Radar"
      description="<Shape.Line /> + <Shape.LineRadial />"
      exampleRenderer={Radar}
      exampleUrl="/radar"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
