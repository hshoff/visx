import React from 'react';
import type { GlyphProps } from '../../examples/visx-glyph/example';
import Glyph, { primaryColor, secondaryColor } from '../../examples/visx-glyph/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-glyph/package.json';

const tileStyles = { background: secondaryColor };
const detailsStyles = { color: primaryColor };
const exampleProps = { margin: { top: 30, left: 10, right: 10, bottom: 80 } };

export default function GlyphsTile() {
  return (
    <GalleryTile<GlyphProps>
      title="Glyphs"
      description="<Glyph.GlyphDot />"
      exampleProps={exampleProps}
      exampleRenderer={Glyph}
      exampleUrl="/glyphs"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
