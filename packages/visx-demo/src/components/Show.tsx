import React, { useMemo } from 'react';
import cx from 'classnames';
import type { WithScreenSizeProvidedProps } from '@visx/responsive';
import { withScreenSize } from '@visx/responsive';
import CodeSandboxLink from './CodeSandboxLink';
import Page from './Page';
import Codeblock from './Codeblock';
import type { MarginShape, ShowProvidedProps, PackageJson } from '../types';
import VisxDocLink from './VisxDocLink';
import extractVisxDepsFromPackageJson from './util/extractVisxDepsFromPackageJson';
import { Card, CardContent } from '@/components/ui/card';
import { DemoPageCardSection, DemoPageLayout, DemoPageSection } from './DemoPageLayout';

type Component<P = {}> = React.FC<P> | React.ComponentClass<P>;

type ShowProps = {
  children?: string;
  title: string;
  component: Component<ShowProvidedProps>;
  codeSandboxDirectoryName?: string;
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
    codeSandboxDirectoryName,
    packageJson,
  }: ShowProps & WithScreenSizeProvidedProps) => {
    const width = Math.min(800, (screenWidth || 0) - padding);
    const height = width * 0.6;
    const visxDeps = useMemo(() => extractVisxDepsFromPackageJson(packageJson), [packageJson]);

    return (
      <Page title={title}>
        <DemoPageLayout>
          <header className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
          </header>

          <Card className={cx('overflow-hidden border-border', shadow && 'shadow-md')}>
            <CardContent className="p-0">
              <div
                className={cx(
                  !!shadow && 'shadow-none',
                  title.split(' ').join('-'),
                  'chart min-w-0 rounded-xl',
                )}
              >
                {React.createElement(component, {
                  width,
                  height,
                  margin,
                  events,
                })}
              </div>
            </CardContent>
          </Card>

          {description && React.createElement(description, { width, height })}

          {codeSandboxDirectoryName && (
            <div className="flex justify-end">
              <CodeSandboxLink exampleDirectoryName={codeSandboxDirectoryName} />
            </div>
          )}

          {visxDeps.length > 0 && (
            <DemoPageSection title="Documentation">
              <div className="doc-links flex flex-wrap gap-2 text-sm">
                {visxDeps.map((packageName) => (
                  <VisxDocLink key={packageName} packageName={packageName} />
                ))}
              </div>
            </DemoPageSection>
          )}

          {children && (
            <DemoPageCardSection title="Code">
              <div className="code min-w-0 overflow-x-auto rounded-md border border-border bg-muted/30">
                <Codeblock>{children}</Codeblock>
              </div>
            </DemoPageCardSection>
          )}
        </DemoPageLayout>
      </Page>
    );
  },
);

export default Show;
