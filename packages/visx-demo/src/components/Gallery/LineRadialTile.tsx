import React from 'react';
import type { LineRadialProps } from '../../examples/visx-shape-line-radial/example';
import LineRadial, { background, blue } from '../../examples/visx-shape-line-radial/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-shape-line-radial/package.json';

const tileStyles = { background };
const detailsStyles = { color: blue };
const exampleProps = { animate: false };

export default function LineRadialTile() {
  return (
    <GalleryTile<LineRadialProps>
      title="Radial Lines"
      description="<Shape.LineRadial />"
      exampleProps={exampleProps}
      exampleRenderer={LineRadial}
      exampleUrl="/lineradial"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
