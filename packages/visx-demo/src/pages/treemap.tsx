import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Treemap from '../examples/visx-treemap/example';
import packageJson from '../examples/visx-treemap/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-treemap');

type TreemapPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<TreemapPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function TreemapPage({ exampleSource, highlightedCodeHtml }: TreemapPageProps) {
  return (
    <Show
      component={Treemap}
      title="Treemap"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default TreemapPage;
