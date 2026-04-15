import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import DelaunayTriangulation from '../examples/visx-delaunay-triangulation/example';
import packageJson from '../examples/visx-delaunay-triangulation/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-delaunay-triangulation');

type DelaunayTriangulationPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<DelaunayTriangulationPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function DelaunayTriangulationPage({ exampleSource, highlightedCodeHtml }: DelaunayTriangulationPageProps) {
  return (
    <Show
      events
      margin={{
        top: 16,
        left: 16,
        right: 16,
        bottom: 16,
      }}
      component={DelaunayTriangulation}
      title="Delaunay Triangulation"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default DelaunayTriangulationPage;
