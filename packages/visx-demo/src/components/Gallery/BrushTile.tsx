import React from 'react';
import type { BrushProps } from '../../examples/visx-brush/example';
import Brush, { background, accentColor } from '../../examples/visx-brush/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-brush/package.json';

const tileStyles = { border: `1px solid ${accentColor}` };
const detailsStyles = { color: background };
const exampleProps = { compact: true, margin: { top: 10, left: 50, bottom: 60, right: 20 } };

export default function BrushTile() {
  return (
    <GalleryTile<BrushProps>
      title="Brush"
      description="<Brush />"
      exampleProps={exampleProps}
      exampleRenderer={Brush}
      exampleUrl="/brush"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
