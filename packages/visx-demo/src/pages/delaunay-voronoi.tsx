import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import VoronoiChart from '../examples/visx-delaunay-voronoi/example';
import packageJson from '../examples/visx-delaunay-voronoi/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-delaunay-voronoi');

type DelaunayVoronoiPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<DelaunayVoronoiPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function DelaunayVoronoiPage({ exampleSource, highlightedCodeHtml }: DelaunayVoronoiPageProps) {
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
export default DelaunayVoronoiPage;
