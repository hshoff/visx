import React from 'react';
import type { TreeProps } from '../../examples/visx-tree/example';
import Tree, { background } from '../../examples/visx-tree/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-tree/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#269688' };
const exampleProps = { margin: { top: 10, left: 30, right: 40, bottom: 76 } };

export default function TreesTile() {
  return (
    <GalleryTile<TreeProps>
      title="Trees"
      description="<Hierarchy.Tree /> + <Shape.LinkHorizontal />"
      exampleProps={exampleProps}
      exampleRenderer={Tree}
      exampleUrl="/trees"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
