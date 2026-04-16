/* eslint-disable no-underscore-dangle */
import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ApiTable from './ApiTable';
import PackageList from './PackageList';
import Page from './Page';
import type { DocGenInfo, VisxPackage } from '../types';
import { toExportName } from './util/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DemoPageLayout } from './DemoPageLayout';
import { cn } from '@/utils/cn';

type Props = {
  components?: unknown[];
  examples?: (React.ComponentClass | React.FC)[];
  visxPackage: VisxPackage;
  readme: string;
};

export default function DocPage({ components, examples, visxPackage, readme }: Props) {
  return (
    <Page wrapper={false} title={`@visx/${visxPackage} documentation`}>
      <DemoPageLayout className="max-w-[min(90rem,calc(100vw-2rem))] gap-0 lg:flex-row lg:items-start lg:gap-10">
        <aside className="w-full shrink-0 lg:sticky lg:top-16 lg:w-56 lg:self-start xl:w-64">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="text-sm font-semibold">Packages</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="max-h-[min(70vh,32rem)] overflow-y-auto px-3 py-3">
              <PackageList compact grid={false} emphasizePackage={visxPackage} />
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 flex-1 space-y-10 pt-8 lg:pt-0">
          <article
            className={cn(
              'prose prose-neutral max-w-none dark:prose-invert',
              'prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight',
              'prose-h1:text-3xl prose-h1:leading-tight',
              'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
              'prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
              'prose-pre:rounded-lg prose-pre:border prose-pre:border-border prose-pre:bg-muted/50',
              'prose-img:rounded-lg prose-img:border prose-img:border-border',
              'prose-table:text-sm',
            )}
          >
            <Markdown rehypePlugins={[rehypeRaw]}>{readme}</Markdown>
          </article>

          {examples && examples.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {examples.map((example, i) => (
                  <Card key={i} className="min-w-0 overflow-hidden border-border">
                    <CardContent className="p-4">{React.createElement(example)}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {components && components.length > 0 && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_16rem] lg:gap-12 xl:grid-cols-[1fr_18rem]">
              <div className="min-w-0 space-y-8">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">APIs</h2>
                {components.map((component) => {
                  // @ts-expect-error TS doesn't know about docgenInfo
                  const docgenInfo = component.__docgenInfo as DocGenInfo | undefined;
                  return docgenInfo ? (
                    <ApiTable key={docgenInfo.displayName} docgenInfo={docgenInfo} />
                  ) : null;
                })}
              </div>
              <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-semibold">Exports</CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-3 py-3">
                    <ul className="space-y-1.5 text-sm">
                      {components.map((component) => {
                        // @ts-expect-error TS doesn't know about docgenInfo
                        const docgenInfo = component?.__docgenInfo as DocGenInfo | undefined;
                        const { displayName = '' } = docgenInfo || {};
                        return docgenInfo ? (
                          <li key={displayName}>
                            <a
                              className="text-primary underline-offset-4 hover:underline"
                              href={`#${displayName}`}
                            >
                              {toExportName(displayName)}
                            </a>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </aside>
            </div>
          )}
        </div>
      </DemoPageLayout>
    </Page>
  );
}
