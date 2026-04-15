import React from 'react';
import type { BarStackHorizontalProps } from '../../examples/visx-barstack-horizontal/example';
import BarStackHorizontal, {
  background,
  purple3,
} from '../../examples/visx-barstack-horizontal/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-barstack-horizontal/package.json';

const tileStyles = { background };
const detailsStyles = { color: purple3, zIndex: 1 };

export default function BarStackHorizontalTile() {
  return (
    <GalleryTile<BarStackHorizontalProps>
      title="Bar Stack Horizontal"
      description="<Shape.BarStackHorizontal />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarStackHorizontal}
      exampleUrl="/barstackhorizontal"
      tileStyles={tileStyles}
    />
  );
}
