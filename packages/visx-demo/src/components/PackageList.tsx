import React from 'react';
import Link from 'next/link';
import type { VisxPackage } from '../types';
import { cn } from '@/utils/cn';

export default function PackageList({
  emphasizePackage,
  compact,
  grid,
}: {
  emphasizePackage?: VisxPackage;
  compact?: boolean;
  grid?: boolean;
}) {
  const HeaderElement = compact ? 'h6' : 'h3';
  const headerClass = cn(
    'font-semibold text-foreground',
    compact ? 'mb-2 text-xs uppercase tracking-wide text-muted-foreground' : 'mb-3 text-lg',
  );
  const listClass = compact ? 'space-y-0.5' : 'space-y-3';
  const itemClass = cn(
    !compact && 'rounded-lg border border-border bg-muted/30 p-3',
    compact && 'text-sm leading-snug',
  );
  const linkClass = (pkg: VisxPackage) =>
    cn(
      'inline-block rounded-md px-1 py-0.5 font-medium text-foreground transition-colors hover:text-primary',
      emphasizePackage === pkg && 'bg-primary text-primary-foreground hover:text-primary-foreground',
    );

  return (
    <div
      className={cn(
        compact && 'flex flex-col gap-6',
        grid &&
          !compact &&
          'grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]',
      )}
    >
      <div>
        <HeaderElement className={headerClass}>Chart primitives</HeaderElement>
        <ul className={listClass}>
          <li className={itemClass}>
            <Link href="/docs/annotation" className={linkClass('annotation')}>
              annotation
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Annotate elements of a chart</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/axis" className={linkClass('axis')}>
              axis
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Annotate your coordinate system</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/curve" className={linkClass('curve')}>
              curve
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">d3 line interpolators for @visx/shape</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/glyph" className={linkClass('glyph')}>
              glyph
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Complex marks & symbols to be used in visuals</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/grid" className={linkClass('grid')}>
              grid
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Grid lines for a chart</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/legend" className={linkClass('legend')}>
              legend
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Make your visual encodings readable</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/marker" className={linkClass('marker')}>
              marker
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Annotation lines with text</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/scale" className={linkClass('scale')}>
              scale
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Map data to visual dimensions</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/shape" className={linkClass('shape')}>
              shape
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">
                Fundamental visualization shape primatives, the core of visx
              </p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/tooltip" className={linkClass('tooltip')}>
              tooltip
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Show details on demand</p>}
          </li>
        </ul>
      </div>
      <div>
        <HeaderElement className={headerClass}>Layouts & specialized</HeaderElement>
        <ul className={listClass}>
          <li className={itemClass}>
            <Link href="/docs/chord" className={linkClass('chord')}>
              chord
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Radial layout for matrix relationships</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/geo" className={linkClass('geo')}>
              geo
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Geographic projections</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/heatmap" className={linkClass('heatmap')}>
              heatmap
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Represent data values using color</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/hierarchy" className={linkClass('hierarchy')}>
              hierarchy
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">Components to visualize hierarchical or nested data</p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/network" className={linkClass('network')}>
              network
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Visualize nodes and links between them</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/react-spring" className={linkClass('react-spring')}>
              react-spring
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Animated visx primitives</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/sankey" className={linkClass('sankey')}>
              sankey
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Components to visualize sankey charts</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/stats" className={linkClass('stats')}>
              stats
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Common ways to visualize distributions</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/threshold" className={linkClass('threshold')}>
              threshold
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">
                Difference charts to compare the delta between two time series
              </p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/wordcloud" className={linkClass('wordcloud')}>
              wordcloud
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Visualize word frequency</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/xychart" className={linkClass('xychart')}>
              xychart
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">
                A chart-level API built on & integrated with several other visx building blocks
              </p>
            )}
          </li>
        </ul>
      </div>
      <div>
        <HeaderElement className={headerClass}>Interactions</HeaderElement>
        <ul className={listClass}>
          <li className={itemClass}>
            <Link href="/docs/brush" className={linkClass('brush')}>
              brush
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Enable selection of a part of an interface</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/delaunay" className={linkClass('delaunay')}>
              delaunay
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">Partition points in a chart to improve user interaction</p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/drag" className={linkClass('drag')}>
              drag
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Make elements of an interface draggable</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/voronoi" className={linkClass('voronoi')}>
              voronoi
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">Partition points in a chart to improve user interaction</p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/zoom" className={linkClass('zoom')}>
              zoom
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Apply transforms to a viewport</p>}
          </li>
        </ul>
      </div>
      <div>
        <HeaderElement className={headerClass}>SVG utilities</HeaderElement>
        <ul className={listClass}>
          <li className={itemClass}>
            <Link href="/docs/clip-path" className={linkClass('clip-path')}>
              clip-path
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Utilities for clip-path elements</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/event" className={linkClass('event')}>
              event
            </Link>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground">Utilities for computing svg coordinates from mouse or touch events</p>
            )}
          </li>
          <li className={itemClass}>
            <Link href="/docs/group" className={linkClass('group')}>
              group
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Simplified API for &lt;g /&gt; elements</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/gradient" className={linkClass('gradient')}>
              gradient
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Utilities for making making color gradient definitions</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/pattern" className={linkClass('pattern')}>
              pattern
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Utilities for creating pattern definitions</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/text" className={linkClass('text')}>
              text
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">An improved SVG Text component</p>}
          </li>
        </ul>
      </div>
      <div>
        <HeaderElement className={headerClass}>Data utilities</HeaderElement>
        <ul className={listClass}>
          <li className={itemClass}>
            <Link href="/docs/bounds" className={linkClass('bounds')}>
              bounds
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Detect the bounding box of an element & its parent</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/mock-data" className={linkClass('mock-data')}>
              mock-data
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Lots of mock data sets to play with</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/responsive" className={linkClass('responsive')}>
              responsive
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">Utilities to make responsive visualizations easy</p>}
          </li>
          <li className={itemClass}>
            <Link href="/docs/point" className={linkClass('point')}>
              point
            </Link>
            {!compact && <p className="mt-1 text-xs text-muted-foreground">A simple class to represent an x,y coordinate</p>}
          </li>
        </ul>
      </div>
      {compact && (
        <div>
          <HeaderElement className={headerClass}>Umbrella package</HeaderElement>
          <ul className={listClass}>
            <li className={itemClass}>
              <Link href="/docs/visx" className={linkClass('visx')}>
                visx
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
