import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Sankey from '../examples/visx-sankey/example';
import packageJson from '../examples/visx-sankey/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-sankey');

type SankeyPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<SankeyPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function SankeyPage({ exampleSource, highlightedCodeHtml }: SankeyPageProps) {
  return (
    <Show
      component={Sankey}
      title="Sankey"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default SankeyPage;
