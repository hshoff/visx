import React from 'react';
import type { PackProps } from '../../examples/visx-pack/example';
import Pack from '../../examples/visx-pack/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-pack/package.json';

const tileStyles = { background: 'white', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px' };
const detailsStyles = { color: '#fd6c6f' };

export default function PackTile() {
  return (
    <GalleryTile<PackProps>
      title="Pack"
      description="<Hierarchy.Pack />"
      exampleRenderer={Pack}
      exampleUrl="/pack"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
