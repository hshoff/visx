import React from 'react';
import type { AreaProps } from '../../examples/visx-area/example';
import Area, { accentColor, background } from '../../examples/visx-area/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-area/package.json';

const tileStyles = { background };
const detailsStyles = { color: accentColor };

export default function AreaTile() {
  return (
    <GalleryTile<AreaProps>
      title="AreaClosed"
      description="<Shape.AreaClosed />"
      exampleRenderer={Area}
      exampleUrl="/areas"
      detailsStyles={detailsStyles}
      tileStyles={tileStyles}
    />
  );
}
