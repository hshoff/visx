import fs from 'fs';
import path from 'path';
import React from 'react';
import type { GetStaticProps } from 'next';
import Area from '../sandboxes/visx-area/Example';
import packageJson from '../sandboxes/visx-area/package.json';
import Show from '../components/Show';
import { highlightExampleCode } from '../components/ExampleViewer';

const EXAMPLE_FILE = path.join(process.cwd(), 'src/sandboxes/visx-area/Example.tsx');

type AreasPageProps = {
  exampleSource: string;
  highlightedCodeHtml: string;
};

export const getStaticProps: GetStaticProps<AreasPageProps> = async () => {
  const exampleSource = fs.readFileSync(EXAMPLE_FILE, 'utf8');
  const highlightedCodeHtml = await highlightExampleCode(exampleSource);
  return { props: { exampleSource, highlightedCodeHtml } };
};

function AreasPage({ exampleSource, highlightedCodeHtml }: AreasPageProps) {
  return (
    <Show
      component={Area}
      title="Areas"
      codeSandboxDirectoryName="visx-area"
      packageJson={packageJson}
      exampleSource={exampleSource}
      highlightedCodeHtml={highlightedCodeHtml}
    />
  );
}

export default AreasPage;
