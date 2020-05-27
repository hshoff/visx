import React from 'react';
import Threshold, { ThresholdProps, background } from '../../sandboxes/vx-threshold/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { background };
const detailsStyles = { color: '#111' };
const exampleProps = { margin: { top: 40, left: 40, right: 20, bottom: 30 } };

export default function ThresholdTile() {
  return (
    <GalleryTile<ThresholdProps>
      title="Dots"
      description="<Threshold />"
      exampleProps={exampleProps}
      exampleRenderer={Threshold}
      exampleUrl="/threshold"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
