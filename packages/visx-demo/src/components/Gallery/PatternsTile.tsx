import React from 'react';
import type { PatternProps } from '../../examples/visx-pattern/example';
import Patterns from '../../examples/visx-pattern/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-pattern/package.json';

const tileStyles = { background: '#f5f2e3' };
const detailsStyles = { color: '#333' };

export default function PatternsTile() {
  return (
    <GalleryTile<PatternProps>
      title="Patterns"
      description="<Pattern />"
      exampleRenderer={Patterns}
      exampleUrl="/patterns"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
