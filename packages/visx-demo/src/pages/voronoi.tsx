import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import VoronoiChart from '../examples/visx-voronoi/example';
import packageJson from '../examples/visx-voronoi/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-voronoi');

type VoronoiPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<VoronoiPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function VoronoiPage({ exampleSource, highlightedCodeHtml }: VoronoiPageProps) {
  return (
    <Show
      events
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      component={VoronoiChart}
      title="Voronoi"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default VoronoiPage;
