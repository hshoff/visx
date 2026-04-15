'use client';

import React, { useState } from 'react';
import cx from 'classnames';
import { ParentSize } from '@visx/responsive';
import type { ShowProvidedProps } from '../../types';

type Component = React.FC<ShowProvidedProps> | React.ComponentClass<ShowProvidedProps>;

type Props = {
  component: Component;
  /** Raw source for clipboard */
  source: string;
  /** Pre-rendered HTML from highlightExampleCode (no client JS) */
  highlightedCodeHtml: string;
  shadow?: boolean;
  events?: boolean;
  margin?: ShowProvidedProps['margin'];
  chartClassName?: string;
};

function CopySourceButton({ source }: { source: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="example-viewer-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(source);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function ExampleViewerClient({
  component,
  source,
  highlightedCodeHtml,
  shadow = false,
  events = false,
  margin,
  chartClassName,
}: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="example-viewer">
      <div className="example-viewer-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'preview'}
          className={cx(tab === 'preview' && 'active')}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'code'}
          className={cx(tab === 'code' && 'active')}
          onClick={() => setTab('code')}
        >
          Code
        </button>
      </div>

      {tab === 'preview' && (
        <div
          className={cx(
            'example-viewer-preview',
            !!shadow && 'example-viewer-preview-shadow',
            chartClassName,
          )}
        >
          <ParentSize className="example-viewer-parent-size" debounceTime={10}>
            {({ width, height }) =>
              React.createElement(component, {
                width,
                height,
                margin,
                events,
              })
            }
          </ParentSize>
        </div>
      )}

      {tab === 'code' && (
        <div className="example-viewer-code-wrap">
          <div className="example-viewer-code-toolbar">
            <CopySourceButton source={source} />
          </div>
          <div
            className="example-viewer-code"
            // eslint-disable-next-line react/no-danger -- static HTML from Shiki at build time
            dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }}
          />
        </div>
      )}

      <style jsx>{`
        .example-viewer {
          width: 100%;
        }
        .example-viewer-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 12px;
          border-bottom: 1px solid #e9ecef;
        }
        .example-viewer-tabs button {
          background: none;
          border: none;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
          color: #6c757d;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .example-viewer-tabs button:hover {
          color: #212529;
        }
        .example-viewer-tabs button.active {
          color: #212529;
          font-weight: 500;
          border-bottom-color: #612efb;
        }
        .example-viewer-preview {
          width: 100%;
          min-height: 320px;
          border-radius: 14px;
          overflow: hidden;
        }
        .example-viewer-preview-shadow {
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        }
        :global(.example-viewer-parent-size) {
          min-height: 320px;
        }
        .example-viewer-code-wrap {
          position: relative;
          border-radius: 14px;
          overflow: auto;
          max-height: min(70vh, 640px);
          border: 1px solid #e9ecef;
          background: #fff;
        }
        .example-viewer-code-toolbar {
          display: flex;
          justify-content: flex-end;
          padding: 8px 10px 0;
          position: sticky;
          top: 0;
          z-index: 1;
          background: linear-gradient(to bottom, #fff 70%, transparent);
        }
        .example-viewer-copy {
          font-size: 13px;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid #dee2e6;
          background: #f8f9fa;
          cursor: pointer;
        }
        .example-viewer-copy:hover {
          background: #e9ecef;
        }
        .example-viewer-code {
          padding: 0 12px 12px;
          font-size: 13px;
          line-height: 1.45;
        }
        .example-viewer-code :global(pre) {
          margin: 0;
          padding: 12px;
          overflow: auto;
          border-radius: 8px;
        }
        .example-viewer-code :global(code) {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}
