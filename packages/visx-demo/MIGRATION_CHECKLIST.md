# visx-demo CodeSandbox migration checklist

**Step 1 — inventory** (this file). Tracks every sandbox under `src/sandboxes/` for the CodeSandbox → inline example migration.

**Convention:** `template/` is CodeSandbox boilerplate only (not a gallery example). **47** `visx-*` directories contain an `Example.tsx` used by the demo site (48 entries under `sandboxes/` including `template/`).

## Inventory summary

| Category        | Count |
|-----------------|------:|
| Recipe-mapped   |    13 |
| Standalone      |    32 |
| Redundant (TBD) |     2 |

**Redundant pairs** are candidates to merge in Step 3 (same chart type, vertical vs horizontal). Final call during migration.

**Dependency lookup gap:** `exampleToVisxDependencyLookup.ts` imports package.json for most sandboxes but **does not** include `visx-geo-albers-usa`, `visx-xychart`, or `visx-tooltip` (those examples exist on disk and in pages). Fix when touching that module in Step 4.

---

## Full inventory

| Sandbox name | Category | Future recipe | Notes |
|--------------|----------|---------------|-------|
| `template` | — | — | Sandbox template; not an example. Safe to remove with `sandboxes/` cleanup. |
| `visx-annotation` | standalone | — | `ExampleControls.tsx`, `findNearestDatum.ts` alongside `Example.tsx`. |
| `visx-area` | recipe-mapped | `area-chart` | Tooltip + `@visx/mock-data` stock series. |
| `visx-axis` | standalone | — | Axis primitives demo. |
| `visx-bargroup` | recipe-mapped | `grouped-bar-chart` | Vertical grouped bars (`@visx/mock-data` cities). |
| `visx-bargroup-horizontal` | redundant | `grouped-bar-chart` | Horizontal variant of bargroup; consider one example with orientation control. |
| `visx-bars` | recipe-mapped | `bar-chart` | Simple vertical bars. |
| `visx-barstack` | recipe-mapped | `stacked-bar-chart` | Vertical stacked bars. |
| `visx-barstack-horizontal` | redundant | `stacked-bar-chart` | Horizontal variant of barstack; consider merge with `visx-barstack`. |
| `visx-brush` | standalone | — | Includes `AreaChart.tsx` subcomponent. |
| `visx-chord` | standalone | — | Chord diagram. |
| `visx-curve` | recipe-mapped | `line-chart` | Curve interpolation comparison (line family). |
| `visx-delaunay-triangulation` | standalone | — | Delaunay mesh demo (related to voronoi). |
| `visx-delaunay-voronoi` | standalone | — | Voronoi via `@visx/delaunay` (pairs with triangulation conceptually; different outputs). |
| `visx-dendrogram` | standalone | — | Hierarchy layout. |
| `visx-dots` | recipe-mapped | `scatter-chart` | Scatter + voronoi cells + `@visx/tooltip`. |
| `visx-drag-i` | standalone | — | `generateCircles.ts` helper. |
| `visx-drag-ii` | standalone | — | Second drag pattern (no extra files). |
| `visx-geo-albers-usa` | standalone | — | TopoJSON `usa-topo.json`, `us-abbr.json`; Albers USA projection. |
| `visx-geo-custom` | standalone | — | `world-topo.json` + custom projection. |
| `visx-geo-mercator` | standalone | — | `world-topo.json` Mercator. |
| `visx-glyph` | standalone | — | Glyph markers. |
| `visx-gradient` | standalone | — | Gradient defs demo. |
| `visx-heatmap` | recipe-mapped | `heatmap-chart` | Matrix heatmap. |
| `visx-legend` | standalone | — | Legend primitives. |
| `visx-linktypes` | standalone | — | `getLinkComponent.ts`, `LinkControls.tsx`, `useForceUpdate.ts`. |
| `visx-network` | standalone | — | Force-directed network. |
| `visx-pack` | standalone | — | Circle packing. |
| `visx-pattern` | standalone | — | Pattern fills. |
| `visx-polygons` | standalone | — | Polygon shapes. |
| `visx-radar` | standalone | — | Radar chart (distinct from radial line). |
| `visx-radial-bars` | recipe-mapped | `radial-bar-chart` | Radial bars. |
| `visx-responsive` | standalone | — | `Lines.tsx` helper; responsive sizing patterns. |
| `visx-sankey` | standalone | — | `energy.json` data; Sankey + tooltips. |
| `visx-shape-line-radial` | recipe-mapped | `radial-line-chart` | Radial line / polar line. |
| `visx-shape-pie` | recipe-mapped | `pie-chart` | Pie / arc (donut-style if inner radius — verify in file). |
| `visx-shape-splitlinepath` | standalone | — | `generateSinPoints.ts`, `generateSinSegments.ts`, `generateSnakePath.ts` — complex path splitting. |
| `visx-stacked-areas` | recipe-mapped | `stacked-area-chart` | Multi-series stacked areas (recipe name may align with “ordinal” charts). |
| `visx-stats` | standalone | — | Box plot / summary stats + `@visx/tooltip`. |
| `visx-streamgraph` | recipe-mapped | `streamgraph-chart` | Stacked layers; related to multi-series area (recipe naming TBD). |
| `visx-threshold` | standalone | — | Threshold / clipping. |
| `visx-tooltip` | standalone | — | Tooltip package demo (`<style jsx>` in example). Not the same as `@visx/xychart` gallery tile. |
| `visx-tree` | standalone | — | Tree layout. |
| `visx-treemap` | recipe-mapped | `treemap-chart` | Nested treemap. |
| `visx-voronoi` | standalone | — | Voronoi from `@visx/voronoi` (distinct from delaunay-voronoi sandbox). |
| `visx-wordcloud` | standalone | — | `text.fixture.ts` for text data. |
| `visx-xychart` | standalone | — | Large demo: `ExampleControls.tsx`, `CustomChartBackground.tsx`, `customTheme.ts`, `getAnimatedOrUnanimatedComponents.ts`, `userPrefersReducedMotion.ts` — migrate entire folder as a unit. |
| `visx-zoom-i` | standalone | — | Zoom / pan behavior. |

---

## Progress tracker (Steps 2–5)

Use this section to tick off work after Step 1.

### Step 2 — ExampleViewer

- [ ] Add `src/components/ExampleViewer.tsx` (preview + Shiki code + copy button)
- [ ] Wire build-time file read for source

### Step 3 — Migrate examples

For each row in **Full inventory** with a `visx-*` name:

- [ ] `visx-annotation` through `visx-zoom-i` (47 sandboxes) — copy `Example.tsx` → `src/examples/<name>/example.tsx`, update page, remove CodeSandbox embed

### Step 4 — Remove sandboxes

- [ ] Delete `src/sandboxes/`
- [ ] Remove CodeSandbox URL helpers and deps
- [ ] Fix `exampleToVisxDependencyLookup.ts` (or replace) for new layout

### Step 5 — Verify

- [ ] Smoke test all gallery routes
- [ ] Tests / CI green

---

## Category definitions (reference)

- **Recipe-mapped** — expected to swap to a `@visx/recipes` example in 4.1+ (names in **Future recipe** are indicative).
- **Standalone** — no direct recipe replacement; stays a custom `example.tsx`.
- **Redundant** — likely merge or delete as duplicate orientation/variant; confirm in Step 3.
