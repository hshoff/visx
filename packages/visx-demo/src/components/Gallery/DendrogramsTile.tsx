import React from 'react';
import type { DendrogramProps } from '../../examples/visx-dendrogram/example';
import Dendrogram, { background, green } from '../../examples/visx-dendrogram/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-dendrogram/package.json';

const tileStyles = { background };
const detailsStyles = { color: green };
const exampleProps = { margin: { top: 40, left: 0, right: 0, bottom: 90 } };

export default function DendrogramsTile() {
  return (
    <GalleryTile<DendrogramProps>
      title="Dendrograms"
      description="<Hierarchy.Cluster /> + <Shape.LinkVertical />"
      exampleProps={exampleProps}
      exampleRenderer={Dendrogram}
      exampleUrl="/dendrograms"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
