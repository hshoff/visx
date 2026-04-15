import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Axis from '../examples/visx-axis/example';
import packageJson from '../examples/visx-axis/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-axis');

type AxisPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<AxisPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function AxisPage({ exampleSource, highlightedCodeHtml }: AxisPageProps) {
  return (
    <Show
      component={Axis}
      title="Axis"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default AxisPage;
