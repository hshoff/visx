import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Threshold from '../examples/visx-threshold/example';
import packageJson from '../examples/visx-threshold/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-threshold');

type ThresholdPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<ThresholdPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function Description({ width }: { width: number }) {
  return (
    <div style={{ width, fontSize: 14, lineHeight: '1.5em' }}>
      The temperature in New York compared to San Francisco; days when New York was warmer are
      green, and colder days are violet. Based on Mike Bostock's{' '}
      <a href="https://bl.ocks.org/mbostock/3894205" target="_blank" rel="noopener noreferrer">
        Difference Chart
      </a>
      .
    </div>
  );
}

function ThresholdPage({ exampleSource, highlightedCodeHtml }: ThresholdPageProps) {
  return (
    <Show
      component={Threshold}
      title="Threshold"
      description={Description}
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default ThresholdPage;
