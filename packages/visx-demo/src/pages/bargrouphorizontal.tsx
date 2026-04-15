import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import BarGroupHorizontal from '../examples/visx-bargroup-horizontal/example';
import packageJson from '../examples/visx-bargroup-horizontal/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-bargroup-horizontal');

type BargrouphorizontalPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<BargrouphorizontalPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function BarGroupHorizontalPage({ exampleSource, highlightedCodeHtml }: BargrouphorizontalPageProps) {
  return (
    <Show
      events
      margin={{ top: 45, left: 60, right: 20, bottom: 45 }}
      component={BarGroupHorizontal}
      title="Bar Group Horizontal"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default BarGroupHorizontalPage;
