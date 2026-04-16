import React from 'react';
import Page from '../components/Page';
import Footer from '../components/Footer';
import PackageList from '../components/PackageList';

export default function Docs() {
  return (
    <Page title="documentation">
      <div className="mx-auto w-full max-w-[min(90rem,calc(100vw-2rem))] space-y-8 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Documentation
        </h1>
        <div className="prose prose-neutral max-w-3xl dark:prose-invert prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none">
          <p>
            <code>visx</code> is a suite of several low-level standalone packages for building visual interfaces with{' '}
            <code>react</code>. Packages can be mixed and used together depending on your use case, or you can simply add
            the umbrella <a href="/docs/visx">@visx/visx</a> package to use them all.
          </p>
          <p>Individual packages can be roughly categorized as follows:</p>
        </div>
        <PackageList grid />
      </div>
      <Footer />
    </Page>
  );
}
