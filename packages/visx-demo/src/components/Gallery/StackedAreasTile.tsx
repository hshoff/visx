import React from 'react';
import type { StackedAreasProps } from '../../examples/visx-stacked-areas/example';
import StackedAreas, { background } from '../../examples/visx-stacked-areas/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-stacked-areas/package.json';

const tileStyles = { background };
const detailsStyles = { color: 'rgba(251, 224, 137, 1.000)' };

export default function StackedAreasTile() {
  return (
    <GalleryTile<StackedAreasProps>
      title="Stacked Areas"
      description="<Shape.AreaStack />"
      detailsStyles={detailsStyles}
      exampleRenderer={StackedAreas}
      exampleUrl="/stacked-areas"
      tileStyles={tileStyles}
    />
  );
}
