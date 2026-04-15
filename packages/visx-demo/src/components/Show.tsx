import React, { useMemo } from 'react';
import cx from 'classnames';
import type { WithScreenSizeProvidedProps } from '@visx/responsive';
import { withScreenSize } from '@visx/responsive';
import Page from './Page';
import Codeblock from './Codeblock';
import ExampleViewer from './ExampleViewer';
import type { MarginShape, ShowProvidedProps, PackageJson } from '../types';
import VisxDocLink from './VisxDocLink';
import extractVisxDepsFromPackageJson from './util/extractVisxDepsFromPackageJson';

type Component<P = {}> = React.FC<P> | React.ComponentClass<P>;

type ShowProps = {
  children?: string;
  /** Raw example source (prefer with highlightedCodeHtml from getStaticProps). */
  exampleSource?: string;
  /** Pre-highlighted HTML from highlightExampleCode (build time). */
  highlightedCodeHtml?: string;
  title: string;
  component: Component<ShowProvidedProps>;
  shadow?: boolean;
  events?: boolean;
  margin?: MarginShape;
  description?: Component<{ width: number; height: number }>;
  windowResizeDebounceTime?: number;
  packageJson?: PackageJson;
};

const padding = 40;

const Show = withScreenSize<ShowProps & WithScreenSizeProvidedProps>(
  ({
    screenWidth,
    children,
    title,
    component,
    shadow = false,
    events = false,
    margin,
    description,
    packageJson,
    exampleSource,
    highlightedCodeHtml,
  }: ShowProps & WithScreenSizeProvidedProps) => {
    const width = Math.min(800, (screenWidth || 0) - padding);
    const height = width * 0.6;
    const visxDeps = useMemo(() => extractVisxDepsFromPackageJson(packageJson), [packageJson]);
    const codeSource = exampleSource ?? (typeof children === 'string' ? children : undefined);
    const useExampleViewer = Boolean(highlightedCodeHtml && codeSource);

    return (
      <Page title={title}>
        <div className="container">
          <div style={{ width: useExampleViewer ? '100%' : width, maxWidth: 800 }}>
            <h1>{title}</h1>
            {useExampleViewer ? (
              <ExampleViewer
                component={component}
                source={codeSource}
                highlightedCodeHtml={highlightedCodeHtml}
                shadow={shadow}
                events={events}
                margin={margin}
                chartClassName={cx(!!shadow && 'shadow', title.split(' ').join('-'), 'chart')}
              />
            ) : null}
            {useExampleViewer && description && (
              <div style={{ width: '100%', maxWidth: 800 }}>
                {React.createElement(description, { width, height })}
              </div>
            )}
            {!useExampleViewer ? (
              <>
                <div className={cx(!!shadow && 'shadow', title.split(' ').join('-'), 'chart')}>
                  {React.createElement(component, {
                    width,
                    height,
                    margin,
                    events,
                  })}
                </div>
                {description && React.createElement(description, { width, height })}
              </>
            ) : null}
            {visxDeps.length > 0 && (
              <>
                <h2>Documentation</h2>
                <div className="doc-links">
                  {visxDeps.map((packageName) => (
                    <VisxDocLink key={packageName} packageName={packageName} />
                  ))}
                </div>
              </>
            )}
            {!useExampleViewer && children && (
              <>
                <h2>Code</h2>
                <div className="code">
                  <Codeblock>{children}</Codeblock>
                </div>
              </>
            )}
          </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            margin-bottom: 40px;
          }
          .container h1 {
            margin-top: 15px;
            line-height: 0.9em;
            letter-spacing: -0.03em;
          }
          .container h2 {
            margin-top: 15px;
            margin-bottom: 5px;
          }
          .chart {
            border-radius: 14px;
          }
          .shadow {
            border-radius: 14px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
          }
          .sandbox-link {
            display: flex;
            justify-content: flex-end;
          }
          .doc-links {
            font-size: 13px;
          }
          .doc-links :global(a) {
            margin-right: 6px;
          }
        `}</style>
      </Page>
    );
  },
);

export default Show;
