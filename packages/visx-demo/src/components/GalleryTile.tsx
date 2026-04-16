import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ParentSize } from '@visx/responsive';
import type { WidthAndHeight } from '../types';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';

type Props<ExampleProps extends WidthAndHeight> = {
  description?: string;
  detailsHeight?: number;
  detailsStyles?: React.CSSProperties;
  exampleRenderer: React.ComponentClass<ExampleProps> | React.FunctionComponent<ExampleProps>;
  exampleProps?: Omit<ExampleProps, 'width' | 'height'> &
    Partial<Pick<ExampleProps, 'width' | 'height'>>;
  exampleUrl?: string;
  tileStyles?: React.CSSProperties;
  title?: string;
};

const renderLinkWrapper = (url: string | undefined, node: React.ReactNode) =>
  url ? (
    <Link href={url} className="flex min-h-0 min-w-0 flex-1 flex-col">
      {node}
    </Link>
  ) : (
    node
  );

/**
 * hook which returns if the ref was ever visible.
 * used for better perf/not rendering all tiles on load.
 */
function useEverVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [everVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((visible) => visible || entry.isIntersecting);
        });
      },
      {
        root: null, // viewport is the root
        threshold: 0.01,
      },
    );

    let curr: HTMLDivElement;
    if (ref.current) {
      curr = ref.current;
      observer.observe(ref.current);
    }

    return () => {
      if (curr) {
        observer.unobserve(curr);
        observer.disconnect();
      }
    };
  }, []);

  return { everVisible, ref };
}

export default function GalleryTile<ExampleProps extends WidthAndHeight>({
  description,
  detailsHeight = 76,
  detailsStyles,
  exampleProps,
  exampleRenderer,
  exampleUrl,
  tileStyles,
  title,
}: Props<ExampleProps>) {
  const { everVisible, ref } = useEverVisible();
  return (
    <>
      {renderLinkWrapper(
        exampleUrl,
        <Card
          ref={ref}
          style={tileStyles}
          className={cn(
            'group m-1 flex h-[390px] min-w-[min(100%,300px)] flex-1 cursor-pointer flex-col overflow-hidden border-0 transition-shadow hover:shadow-md sm:min-w-[45%] md:min-w-[300px]',
          )}
        >
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            {everVisible && (
              <ParentSize>
                {({ width, height }) =>
                  React.createElement(exampleRenderer, {
                    width,
                    height: height + (title || description ? detailsHeight : 0),
                    ...exampleProps,
                  } as ExampleProps)
                }
              </ParentSize>
            )}
          </div>
          {(title || description) && (
            <div
              className="shrink-0 px-5 py-4 text-center text-sm"
              style={detailsStyles}
            >
              {title && <div className="font-black leading-tight tracking-tight">{title}</div>}
              {description && (
                <div className="mt-1 font-light opacity-95">
                  <pre className="m-0 min-w-0 whitespace-pre-wrap break-words bg-transparent p-0 font-sans text-[13px] leading-snug">
                    {description}
                  </pre>
                </div>
              )}
            </div>
          )}
        </Card>,
      )}
    </>
  );
}
