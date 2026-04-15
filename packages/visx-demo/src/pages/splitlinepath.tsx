import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import SplitLinePathExample from '../examples/visx-shape-splitlinepath/example';
import packageJson from '../examples/visx-shape-splitlinepath/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-shape-splitlinepath');

type SplitlinepathPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<SplitlinepathPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function SplitLinePathPage({ exampleSource, highlightedCodeHtml }: SplitlinepathPageProps) {
  return (
    <Show
      events
      component={SplitLinePathExample}
      title="SplitLinePath"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default SplitLinePathPage;
