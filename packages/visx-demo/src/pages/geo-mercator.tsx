import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import GeoMercator from '../examples/visx-geo-mercator/example';
import packageJson from '../examples/visx-geo-mercator/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-geo-mercator');

type GeoMercatorPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<GeoMercatorPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function GeoMercatorPage({ exampleSource, highlightedCodeHtml }: GeoMercatorPageProps) {
  return (
    <Show
      events
      component={GeoMercator}
      title="Geo Mercator"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default GeoMercatorPage;
