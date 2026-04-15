import React from 'react';
import type { SplitLinePathExampleProps } from '../../examples/visx-shape-splitlinepath/example';
import SplitLinePathExample, {
  backgroundLight,
} from '../../examples/visx-shape-splitlinepath/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-shape-splitlinepath/package.json';

const tileStyles = { background: backgroundLight };
const detailsStyles = { color: 'white' };

export default function SplitLinePathTile() {
  return (
    <GalleryTile<SplitLinePathExampleProps>
      title="SplitLinePath"
      description="<Shape.SplitLinePath />"
      exampleRenderer={SplitLinePathExample}
      exampleUrl="/splitlinepath"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
