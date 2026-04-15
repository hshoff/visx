import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import BarStack from '../examples/visx-barstack/example';
import packageJson from '../examples/visx-barstack/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-barstack');

type BarstackPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<BarstackPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function BarStackPage({ exampleSource, highlightedCodeHtml }: BarstackPageProps) {
  return (
    <Show
      events
      margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
      component={BarStack}
      title="Bar Stack"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default BarStackPage;
