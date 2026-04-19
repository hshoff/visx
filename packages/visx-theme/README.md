# @visx/theme

CSS-variable-first theming for visx: `ThemeProvider`, `useColor`, `useAxisStyle`, `useGridStyle`, `useChartConfig`, and built-in `light` / `dark` token sets.

Hooks return `var(--token, fallback)` strings for SVG/CSS so light/dark toggles propagate through the cascade without `@visx/theme` subscribing to DOM or theme state.

See the package specification in the visx repo for full API details.
