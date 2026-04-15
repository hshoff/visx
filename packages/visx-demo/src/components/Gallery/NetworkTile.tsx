import React from 'react';
import type { NetworkProps } from '../../examples/visx-network/example';
import Network, { background } from '../../examples/visx-network/example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../examples/visx-network/package.json';

const tileStyles = { background };

export default function NetworkTile() {
  return (
    <GalleryTile<NetworkProps>
      title="Network"
      description="<Network.Graph />"
      exampleRenderer={Network}
      exampleUrl="/network"
      tileStyles={tileStyles}
    />
  );
}
