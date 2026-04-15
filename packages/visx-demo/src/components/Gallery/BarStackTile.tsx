import React from 'react';
import type { BarStackProps } from '../../examples/visx-barstack/example';
import BarStack, { background, purple3 } from '../../examples/visx-barstack/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-barstack/package.json';

const tileStyles = { background };
const detailsStyles = { color: purple3, zIndex: 1 };

export default function BarStackTile() {
  return (
    <GalleryTile<BarStackProps>
      title="Bar Stack"
      description="<Shape.BarStack />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarStack}
      exampleUrl="/barstack"
      tileStyles={tileStyles}
    />
  );
}
