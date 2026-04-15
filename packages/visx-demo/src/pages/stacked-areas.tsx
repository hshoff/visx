import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import StackedAreas from '../examples/visx-stacked-areas/example';
import packageJson from '../examples/visx-stacked-areas/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-stacked-areas');

type StackedAreasPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<StackedAreasPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function StackedAreasPage({ exampleSource, highlightedCodeHtml }: StackedAreasPageProps) {
  return (
    <Show
      component={StackedAreas}
      title="Stacked Areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      }}
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default StackedAreasPage;
