import React from 'react';
import Wordcloud from '../../examples/visx-wordcloud/example';
import type { WidthAndHeight } from '../../types';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-wordcloud/package.json';

const tileStyles = { background: '#e4e3d8' };
const detailsStyles = { color: '#111' };
const renderer = (size: WidthAndHeight) => <Wordcloud width={size.width} height={size.height} />;

export default function WordcloudTile() {
  return (
    <GalleryTile
      title="Wordcloud"
      description="<Wordcloud />"
      exampleRenderer={renderer}
      exampleUrl="/wordcloud"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
