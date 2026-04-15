import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import LinkTypes from '../examples/visx-linktypes/example';
import packageJson from '../examples/visx-linktypes/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-linktypes');

type LinktypesPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<LinktypesPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};


function LinkTypesPage({ exampleSource, highlightedCodeHtml }: LinktypesPageProps) {
  return (
    <Show
      events
      title="Link Types"
      component={LinkTypes}
      margin={{
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
      }}
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default LinkTypesPage;
