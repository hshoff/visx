import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import BarGroup from '../examples/visx-bargroup/example';
import packageJson from '../examples/visx-bargroup/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-bargroup');

type BargroupPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<BargroupPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function BarGroupPage({ exampleSource, highlightedCodeHtml }: BargroupPageProps) {
  return (
    <Show
      events
      margin={{ top: 80, right: 0, bottom: 80, left: 0 }}
      component={BarGroup}
      title="Bar Group"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default BarGroupPage;
