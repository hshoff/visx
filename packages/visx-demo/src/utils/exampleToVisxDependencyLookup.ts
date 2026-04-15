import annotationPackageJson from '../examples/visx-annotation/package.json';
import areaPackageJson from '../examples/visx-area/package.json';
import axisPackageJson from '../examples/visx-axis/package.json';
import bargroupPackageJson from '../examples/visx-bargroup/package.json';
import bargroupHorizontalPackageJson from '../examples/visx-bargroup-horizontal/package.json';
import barsPackageJson from '../examples/visx-bars/package.json';
import barstackPackageJson from '../examples/visx-barstack/package.json';
import barstackHorizontalPackageJson from '../examples/visx-barstack-horizontal/package.json';
import brushPackageJson from '../examples/visx-brush/package.json';
import chordPackageJson from '../examples/visx-chord/package.json';
import curvePackageJson from '../examples/visx-curve/package.json';
import delaunayPackageJson from '../examples/visx-delaunay-triangulation/package.json';
import delaunayVoronoiPackageJson from '../examples/visx-delaunay-voronoi/package.json';
import dendrogramPackageJson from '../examples/visx-dendrogram/package.json';
import dotsPackageJson from '../examples/visx-dots/package.json';
import dragIPackageJson from '../examples/visx-drag-i/package.json';
import dragIIPackageJson from '../examples/visx-drag-ii/package.json';
import geoAlbersUsaPackageJson from '../examples/visx-geo-albers-usa/package.json';
import geoCustomPackageJson from '../examples/visx-geo-custom/package.json';
import geoMercatorPackageJson from '../examples/visx-geo-mercator/package.json';
import glyphPackageJson from '../examples/visx-glyph/package.json';
import gradientPackageJson from '../examples/visx-gradient/package.json';
import heatmapPackageJson from '../examples/visx-heatmap/package.json';
import legendPackageJson from '../examples/visx-legend/package.json';
import linktypesPackageJson from '../examples/visx-linktypes/package.json';
import networkPackageJson from '../examples/visx-network/package.json';
import packPackageJson from '../examples/visx-pack/package.json';
import patternPackageJson from '../examples/visx-pattern/package.json';
import polygonsPackageJson from '../examples/visx-polygons/package.json';
import radarPackageJson from '../examples/visx-radar/package.json';
import responsivePackageJson from '../examples/visx-responsive/package.json';
import lineRadialPackageJson from '../examples/visx-shape-line-radial/package.json';
import piePackageJson from '../examples/visx-shape-pie/package.json';
import sankeyPackageJson from '../examples/visx-sankey/package.json';
import splitLinePathPackageJson from '../examples/visx-shape-splitlinepath/package.json';
import stackedAreasPackageJson from '../examples/visx-stacked-areas/package.json';
import statsPackageJson from '../examples/visx-stats/package.json';
import streamgraphPackageJson from '../examples/visx-streamgraph/package.json';
import thresholdPackageJson from '../examples/visx-threshold/package.json';
import tooltipPackageJson from '../examples/visx-tooltip/package.json';
import treePackageJson from '../examples/visx-tree/package.json';
import treemapPackageJson from '../examples/visx-treemap/package.json';
import voronoiPackageJson from '../examples/visx-voronoi/package.json';
import wordcloudPackageJson from '../examples/visx-wordcloud/package.json';
import xychartPackageJson from '../examples/visx-xychart/package.json';
import zoomPackageJson from '../examples/visx-zoom-i/package.json';
import { packageJson as textPackageJson } from '../components/Gallery/TextTile';

import extractVisxDepsFromPackageJson from '../components/util/extractVisxDepsFromPackageJson';
import type { VisxPackage } from '../types';

const examples = [
  annotationPackageJson,
  areaPackageJson,
  axisPackageJson,
  bargroupHorizontalPackageJson,
  bargroupPackageJson,
  barsPackageJson,
  barstackHorizontalPackageJson,
  barstackPackageJson,
  brushPackageJson,
  chordPackageJson,
  curvePackageJson,
  delaunayPackageJson,
  delaunayVoronoiPackageJson,
  dendrogramPackageJson,
  dotsPackageJson,
  dragIIPackageJson,
  dragIPackageJson,
  geoAlbersUsaPackageJson,
  geoCustomPackageJson,
  geoMercatorPackageJson,
  glyphPackageJson,
  gradientPackageJson,
  heatmapPackageJson,
  legendPackageJson,
  lineRadialPackageJson,
  linktypesPackageJson,
  networkPackageJson,
  packPackageJson,
  patternPackageJson,
  piePackageJson,
  polygonsPackageJson,
  radarPackageJson,
  responsivePackageJson,
  sankeyPackageJson,
  splitLinePathPackageJson,
  stackedAreasPackageJson,
  statsPackageJson,
  streamgraphPackageJson,
  textPackageJson,
  thresholdPackageJson,
  tooltipPackageJson,
  treePackageJson,
  treemapPackageJson,
  voronoiPackageJson,
  wordcloudPackageJson,
  xychartPackageJson,
  zoomPackageJson,
];

const exampleToVisxDependencyLookup: { [exampleName: string]: Set<VisxPackage> } = {};
const seenPackages = new Set<VisxPackage>();

examples.forEach((packageJson) => {
  const visxPackages = new Set<VisxPackage>(
    extractVisxDepsFromPackageJson(packageJson).map(
      (visxPackage) => visxPackage.split('@visx/')[1] ?? '',
    ) as VisxPackage[],
  );

  visxPackages.forEach((visxPackage) => seenPackages.add(visxPackage));
  exampleToVisxDependencyLookup[packageJson.name] = visxPackages;
});

export const visxPackages = Array.from(seenPackages).sort();

export default exampleToVisxDependencyLookup;
