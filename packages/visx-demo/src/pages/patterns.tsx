import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Patterns from '../examples/visx-pattern/example';
import packageJson from '../examples/visx-pattern/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-pattern');

type PatternsPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<PatternsPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function PatternsPage({ exampleSource, highlightedCodeHtml }: PatternsPageProps) {
  return (
    <Show
      component={Patterns}
      title="Patterns"
      margin={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default PatternsPage;
