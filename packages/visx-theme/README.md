# @visx/theme

CSS-variable-first theming for visx: `ThemeProvider`, `useColor`, `useAxisStyle`, `useGridStyle`, `useChartConfig`, and built-in `light` / `dark` token sets.

Hooks return `var(--token, fallback)` strings for SVG/CSS so light/dark toggles propagate through the cascade without `@visx/theme` subscribing to DOM or theme state.

See the package specification in the visx repo for full API details.

## Dependencies

**Peer:** `react` only. There is no dependency on `@visx/xychart`.

`fromXYChartTheme` takes a minimal structural type (`XYChartThemeInput`) describing the fields the adapter reads. If you use `@visx/xychart`, pass your `buildChartTheme(...)` result as-is — it is structurally compatible; you do not install xychart for `@visx/theme`.
