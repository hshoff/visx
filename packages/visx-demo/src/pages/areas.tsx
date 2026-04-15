import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import Area from '../examples/visx-area/example';
import packageJson from '../examples/visx-area/package.json';
import Show from '../components/Show';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-area');

type AreasPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<AreasPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};

function AreasPage({ exampleSource, highlightedCodeHtml }: AreasPageProps) {
  return (
    <Show
      component={Area}
      title="Areas"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}

export default AreasPage;
