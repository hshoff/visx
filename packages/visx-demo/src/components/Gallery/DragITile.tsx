import React from 'react';
import type { DragIProps } from '../../examples/visx-drag-i/example';
import DragI from '../../examples/visx-drag-i/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-drag-i/package.json';

const tileStyles = { background: '#c4c3cb', borderRadius: 14 };
const detailsStyles = { color: '#6437d6', zIndex: 1 };

export default function DragITile() {
  return (
    <GalleryTile<DragIProps>
      title="Drag i"
      description="<Drag.Drag />"
      exampleRenderer={DragI}
      exampleUrl="/drag-i"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
