import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import BarStackHorizontal from '../examples/visx-barstack-horizontal/example';
import packageJson from '../examples/visx-barstack-horizontal/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-barstack-horizontal');

type BarstackhorizontalPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<BarstackhorizontalPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function BarStackHorizontalPage({ exampleSource, highlightedCodeHtml }: BarstackhorizontalPageProps) {
  return (
    <Show
      events
      margin={{
        top: 80,
        left: 80,
        right: 40,
        bottom: 100,
      }}
      component={BarStackHorizontal}
      title="Bar Stack Horizontal"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default BarStackHorizontalPage;
