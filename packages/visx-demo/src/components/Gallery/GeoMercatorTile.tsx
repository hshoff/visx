import React from 'react';
import type { GeoMercatorProps } from '../../examples/visx-geo-mercator/example';
import GeoMercator, { background } from '../../examples/visx-geo-mercator/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-geo-mercator/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#f63a48' };

export default function GeoMercatorTile() {
  return (
    <GalleryTile<GeoMercatorProps>
      title="Mercator"
      description="<Geo.Mercator />"
      exampleRenderer={GeoMercator}
      exampleUrl="/geo-mercator"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
