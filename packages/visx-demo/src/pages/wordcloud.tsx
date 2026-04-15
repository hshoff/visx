import React from 'react';
import path from 'path';
import type { GetStaticProps } from 'next';
import { highlightExampleCode } from '../components/ExampleViewer';
import { loadExampleSourceBundle } from '../utils/loadExampleSourceBundle';
import Wordcloud from '../examples/visx-wordcloud/example';
import packageJson from '../examples/visx-wordcloud/package.json';
import Show from '../components/Show';

const EXAMPLE_DIR = path.join(process.cwd(), 'src/examples/visx-wordcloud');

type WordcloudPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<WordcloudPageProps> = async () => {
  const exampleSource = loadExampleSourceBundle(EXAMPLE_DIR);
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};

import type { WidthAndHeight } from '../types';

const component = ({ width, height }: WidthAndHeight) => (
  <Wordcloud width={width} height={height} showControls />
);

function WordcloudPage({ exampleSource, highlightedCodeHtml }: WordcloudPageProps) {
  return (
    <Show
      component={component}
      title="Wordcloud"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}
export default WordcloudPage;
