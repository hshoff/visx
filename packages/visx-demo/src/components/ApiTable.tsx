import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import type { DocGenInfo, PropInfo, ParamInfo } from '../types';
import { toExportName } from './util/format';
import { getGitHubUrl } from '../utils/getGitHubUrl';

type Props = {
  docgenInfo: DocGenInfo;
};

const alphaSort = (a: PropInfo, b: PropInfo) => a.name.localeCompare(b.name);

/** Renders a list of props/parameters for the passed docgenInfo */
export default function ApiTable({ docgenInfo }: Props) {
  const {
    displayName = '',
    kind = 'component',
    description,
    parameters,
    returnType,
    filePath,
    lineNumber,
  } = docgenInfo;
  const anchorId = displayName;
  const isFunction = kind === 'function';
  const sourceUrl = getGitHubUrl(filePath, lineNumber);

  const props = useMemo(() => {
    const requiredProps: PropInfo[] = [];
    const optionalProps: PropInfo[] = [];

    Object.values(docgenInfo.props).forEach((prop) => {
      if (prop.required) {
        requiredProps.push(prop);
      } else {
        optionalProps.push(prop);
      }
    });

    return [...requiredProps.sort(alphaSort), ...optionalProps.sort(alphaSort)];
  }, [docgenInfo]);

  return (
    <div className="api border-b border-border pb-8 last:border-b-0 last:pb-0">
      <h3 className="group mb-3 flex scroll-mt-24 flex-wrap items-baseline gap-x-2 gap-y-1 text-xl font-semibold tracking-tight text-foreground">
        <a
          id={anchorId}
          href={`#${anchorId}`}
          className="mr-1 inline-block scroll-mt-24 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
        {toExportName(displayName)}
        {kind === 'hook' && (
          <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">
            hook
          </span>
        )}
        {kind === 'function' && (
          <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-950 dark:text-purple-200">
            function
          </span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-sm font-normal text-muted-foreground hover:text-foreground hover:underline"
          >
            View Source →
          </a>
        )}
      </h3>
      {description && (
        <div className="prose prose-neutral mb-4 max-w-none text-base dark:prose-invert prose-p:my-1">
          <Markdown>{description}</Markdown>
        </div>
      )}
      {isFunction && parameters && parameters.length > 0 ? (
        <>
          <h4 className="mb-2 mt-4 text-base font-semibold text-foreground">Parameters</h4>
          {parameters.map((param: ParamInfo) => {
            const id = `${displayName}_${param.name}`;
            return (
              <div key={param.name} className="group/prop border-b border-border py-3 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="inline-flex items-baseline gap-1.5 text-base">
                    <a
                      id={id}
                      href={`#${id}`}
                      className="scroll-mt-24 text-muted-foreground opacity-0 transition-opacity group-hover/prop:opacity-100"
                    >
                      #
                    </a>
                    <strong className="font-semibold text-foreground">{param.name}</strong>
                  </span>
                  {param.type && (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
                      {param.type.name}
                    </code>
                  )}
                </div>
                <div className="prose prose-neutral mt-2 max-w-none text-sm dark:prose-invert prose-p:my-1">
                  <Markdown>
                    {`${param.description || ''}${
                      param.defaultValue
                        ? `\n\nDefault \`${String(param.defaultValue.value) || '""'}\``
                        : ''
                    }`}
                  </Markdown>
                </div>
              </div>
            );
          })}
          {returnType && (
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-sm">
              <strong className="text-foreground">Returns:</strong>{' '}
              <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">{returnType}</code>
            </div>
          )}
        </>
      ) : (
        props.map((prop) => {
          const id = `${displayName}_${prop.name}`;
          return (
            <div key={prop.name} className="group/prop border-b border-border py-3 last:border-b-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="inline-flex items-baseline gap-1.5 text-base">
                  <a
                    id={id}
                    href={`#${id}`}
                    className="scroll-mt-24 text-muted-foreground opacity-0 transition-opacity group-hover/prop:opacity-100"
                  >
                    #
                  </a>
                  <strong className="font-semibold text-foreground">{prop.name}</strong>
                </span>
                {prop.type && (
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
                    {prop.type.name}
                  </code>
                )}
                {prop.required && (
                  <span className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                    required
                  </span>
                )}
              </div>
              <div className="prose prose-neutral mt-2 max-w-none text-sm dark:prose-invert prose-p:my-1">
                <Markdown>
                  {`${prop.description}${
                    prop.defaultValue
                      ? `\n\nDefault \`${String(prop.defaultValue.value) || '""'}\``
                      : ''
                  }`}
                </Markdown>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
