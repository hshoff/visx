import React from 'react';
import type { SankeyDemoProps } from '../../examples/visx-sankey/example';
import Sankey, { background, color } from '../../examples/visx-sankey/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-sankey/package.json';

const tileStyles = { background };
const detailsStyles = { color };
const exampleProps = { showControls: false };

export default function SankeyTile() {
  return (
    <GalleryTile<SankeyDemoProps>
      title="Sankey"
      description="<Sankey.Sankey />"
      exampleProps={exampleProps}
      exampleRenderer={Sankey}
      exampleUrl="/sankey"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
