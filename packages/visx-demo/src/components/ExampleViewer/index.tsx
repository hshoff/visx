import React from 'react';
import type { ShowProvidedProps } from '../../types';
import ExampleViewerClient from './ExampleViewerClient';

type Component = React.FC<ShowProvidedProps> | React.ComponentClass<ShowProvidedProps>;

export type ExampleViewerProps = {
  component: Component;
  source: string;
  highlightedCodeHtml: string;
  shadow?: boolean;
  events?: boolean;
  margin?: ShowProvidedProps['margin'];
  /** Passed to the preview container for gallery-style class names (e.g. title-based) */
  chartClassName?: string;
};

/**
 * Preview (inline example) + static Shiki-highlighted code with a client-only copy button.
 * Pages should load `source` and `highlightedCodeHtml` in getStaticProps (build-time fs + highlightExampleCode).
 */
export default function ExampleViewer(props: ExampleViewerProps) {
  return <ExampleViewerClient {...props} />;
}

export { highlightExampleCode } from './highlightExampleCode';
