import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Dendrograms from '../examples/visx-dendrogram/example';
import packageJson from '../examples/visx-dendrogram/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-dendrogram');

type DendrogramsPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<DendrogramsPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function DendrogramsPage({ exampleSource, highlightedCodeHtml }: DendrogramsPageProps) {
  return (
    <Show
      events
      title="Dendrograms"
      component={Dendrograms}
      margin={{
        top: 80,
        left: 10,
        right: 10,
        bottom: 80,
      }}
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default DendrogramsPage;
