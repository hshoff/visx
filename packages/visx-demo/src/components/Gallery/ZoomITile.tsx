import React from 'react';
import type { ZoomIProps } from '../../examples/visx-zoom-i/example';
import ZoomI from '../../examples/visx-zoom-i/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-zoom-i/package.json';

const tileStyles = { background: '#0a0a0a' };
const detailsStyles = { color: '#ccc' };

export default function ZoomITile() {
  return (
    <GalleryTile<ZoomIProps>
      title="Zoom"
      description="<Zoom />"
      exampleRenderer={ZoomI}
      exampleUrl="/zoom-i"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
