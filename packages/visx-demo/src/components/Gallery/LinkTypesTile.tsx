import React from 'react';
import type { LinkTypesProps } from '../../examples/visx-linktypes/example';
import LinkTypes from '../../examples/visx-linktypes/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-linktypes/package.json';

const tileStyles = { background: '#272b4d' };
const detailsStyles = { color: '#269688' };

export default function LinkTypesTile() {
  return (
    <GalleryTile<LinkTypesProps>
      title="Link Types"
      description="<Shape.Link* />"
      exampleRenderer={LinkTypes}
      exampleUrl="/linktypes"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
