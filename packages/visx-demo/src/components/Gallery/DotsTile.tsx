import React from 'react';
import type { DotsProps } from '../../examples/visx-dots/example';
import Dots from '../../examples/visx-dots/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-dots/package.json';

const tileStyles = { background: '#fd6e7f' };
const detailsStyles = { color: '#f6c431' };
const exampleProps = { showControls: false };

export default function DotsTile() {
  return (
    <GalleryTile<DotsProps>
      title="Dots"
      description="<Shape.Circle />"
      exampleProps={exampleProps}
      exampleRenderer={Dots}
      exampleUrl="/dots"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
