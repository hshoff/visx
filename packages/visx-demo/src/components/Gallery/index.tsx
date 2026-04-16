import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as AnnotationTile from './AnnotationTile';
import * as AreaTile from './AreaTile';
import * as AxisTile from './AxisTile';
import * as BarGroupHorizontalTile from './BarGroupHorizontalTile';
import * as BarGroupTile from './BarGroupTile';
import * as BarStackHorizontalTile from './BarStackHorizontalTile';
import * as BarStackTile from './BarStackTile';
import * as BarsTile from './BarsTile';
import * as BrushTile from './BrushTile';
import * as ChordTile from './ChordTile';
import * as CurvesTile from './CurvesTile';
import * as DelaunayTile from './DelaunayTriangulationTile';
import * as DelaunayVoronoiTile from './DelaunayVoronoiTile';
import * as DendrogramsTile from './DendrogramsTile';
import * as DotsTile from './DotsTile';
import * as DragIITile from './DragIITile';
import * as DragITile from './DragITile';
import * as GeoCustomTile from './GeoCustomTile';
import * as GeoAlbersUsaTile from './GeoAlbersUsaTile';
import * as GeoMercatorTile from './GeoMercatorTile';
import * as GlyphsTile from './GlyphsTile';
import * as GradientsTile from './GradientsTile';
import * as HeatmapsTile from './HeatmapsTile';
import * as LegendsTile from './LegendsTile';
import * as LineRadialTile from './LineRadialTile';
import * as LinkTypesTile from './LinkTypesTile';
import * as NetworkTile from './NetworkTile';
import * as PackTile from './PackTile';
import * as PatternsTile from './PatternsTile';
import * as PiesTile from './PiesTile';
import * as PolygonsTile from './PolygonsTile';
import * as RadarTile from './RadarTile';
import * as RadialBarsTile from './RadialBarsTile';
import * as ResponsiveTile from './ResponsiveTile';
import * as SankeyTile from './SankeyTile';
import * as SplitLinePathTile from './SplitLinePathTile';
import * as StackedAreasTile from './StackedAreasTile';
import * as StatsPlotTile from './StatsPlotTile';
import * as StreamGraphTile from './StreamGraphTile';
import * as TextTile from './TextTile';
import * as ThresholdTile from './ThresholdTile';
import * as TooltipTile from './TooltipTile';
import * as TreemapTile from './TreemapTile';
import * as TreesTile from './TreesTile';
import * as WordcloudTile from './WordcloudTile';
import * as XYChartTile from './XYChartTile';
import * as ZoomITile from './ZoomITile';
import type { VisxPackage } from '../../types';
import exampleToVisxDependencyLookup, {
  visxPackages,
} from '../../sandboxes/exampleToVisxDependencyLookup';
import { Button } from '@/components/ui/button';

export const tiles = [
  BarsTile,
  DotsTile,
  PatternsTile,
  AreaTile,
  TreemapTile,
  ZoomITile,
  StackedAreasTile,
  AxisTile,
  ChordTile,
  StreamGraphTile,
  LegendsTile,
  CurvesTile,
  ThresholdTile,
  AnnotationTile,
  LineRadialTile,
  DragITile,
  BarGroupTile,
  BarGroupHorizontalTile,
  PiesTile,
  BrushTile,
  BarStackTile,
  BarStackHorizontalTile,
  DelaunayTile,
  DelaunayVoronoiTile,
  DendrogramsTile,
  DragIITile,
  XYChartTile,
  GeoCustomTile,
  GeoAlbersUsaTile,
  GeoMercatorTile,
  GlyphsTile,
  GradientsTile,
  HeatmapsTile,
  LinkTypesTile,
  NetworkTile,
  PackTile,
  PolygonsTile,
  RadarTile,
  RadialBarsTile,
  ResponsiveTile,
  SankeyTile,
  SplitLinePathTile,
  StatsPlotTile,
  TextTile,
  TooltipTile,
  TreesTile,
  WordcloudTile,
];

export default function Gallery() {
  const router = useRouter();
  const { pkg: routePackage } = router.query;

  const filteredTiles = routePackage
    ? tiles.filter((Tile) =>
        exampleToVisxDependencyLookup[Tile.packageJson.name]?.has(routePackage as VisxPackage),
      )
    : tiles;

  return (
    <div className="flex w-full min-w-0 flex-col gap-8 pb-10 lg:flex-row lg:gap-10">
      <aside className="flex w-full flex-shrink-0 flex-col gap-2 lg:w-40">
        <div className="text-sm font-semibold text-foreground">Filter</div>
        <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:items-stretch">
          {visxPackages.map((visxPackage) => {
            const active = routePackage === visxPackage;
            return (
              <Button
                key={visxPackage}
                variant={active ? 'secondary' : 'outline'}
                size="sm"
                className="h-auto justify-start rounded-full px-3 py-1.5 text-left text-xs font-normal"
                asChild
              >
                <Link
                  href={{
                    pathname: '/gallery',
                    query: active ? undefined : { pkg: visxPackage },
                  }}
                >
                  {visxPackage}
                </Link>
              </Button>
            );
          })}
        </div>
      </aside>
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {filteredTiles.map((Tile, i) => (
          /* eslint-disable react/jsx-pascal-case */
          <Tile.default key={`tile-${i}`} />
        ))}
      </div>
    </div>
  );
}
