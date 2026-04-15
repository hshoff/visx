import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import GeoAlbersUsa from '../examples/visx-geo-albers-usa/example';
import packageJson from '../examples/visx-geo-albers-usa/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-geo-albers-usa');

type GeoAlbersUsaPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<GeoAlbersUsaPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function GeoAlbersUsaPage({ exampleSource, highlightedCodeHtml }: GeoAlbersUsaPageProps) {
  return (
    <Show
      events
      component={GeoAlbersUsa}
      title="Geo AlbersUsa"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default GeoAlbersUsaPage;
