# Line render 10k

Reproduction of [Colm Tuite's line chart benchmark](https://x.com/colmtuite/status/2073092169783541785) with **visx** added to the comparison.

The suite renders a single line series with **10,000 points** and measures initial mount time using DOM-settle timing (mutation quiet window), matching the approach in [Base UI perf experiments](https://github.com/mui/base-ui/blob/master/docs/src/app/%28private%29/experiments/perf/utils/benchmark.tsx).

## Reference results (Colm Tuite, Jul 2026)

```
Line render 10k

Rank  Library          Raw        Comparison
----  ---------------  ---------  ----------
1     Base UI Charts   38.94ms    1.00x
2     ECharts Canvas   94.53ms    2.43x
3     ECharts SVG      127.71ms   3.28x
4     MUI X SVG        161.44ms   4.15x
5     AG Charts        303.04ms   7.78x
6     Recharts         332.96ms   8.55x
```

> **Note:** `@base-ui/charts` is not published yet, so this suite cannot include Base UI Charts until that package is available. The reference table above is shown in the UI for comparison.

## Libraries benchmarked here

| Library | Implementation |
| --- | --- |
| ECharts Canvas | `echarts-for-react` with canvas renderer |
| ECharts SVG | `echarts-for-react` with SVG renderer |
| MUI X SVG | `@mui/x-charts/LineChart` |
| AG Charts | `ag-charts-react` |
| Recharts | `recharts` `LineChart` |
| **visx XYChart** | `@visx/xychart` high-level API |
| **visx shape** | `@visx/shape` `LinePath` + `@visx/axis` (low-level) |

All charts use the same synthetic dataset (`y = 50 + sin(x / 5) * 25`), dimensions (500×300), no point markers, and animations disabled.

## Run locally

From the repo root:

```bash
corepack enable
yarn install
yarn benchmark:line-render-10k
```

This starts the interactive benchmark UI at http://localhost:5180. Click **Run benchmark** to measure all libraries on your machine.

> **Note:** visx packages are resolved from workspace source via Vite aliases — no `yarn build` step is required. If you see resolution errors for `@visx/*` packages, pull the latest branch; the Vite config auto-discovers all workspace packages.

### Headless (Playwright)

```bash
cd benchmarks/line-render-10k
yarn install
yarn bench
```

Results are printed to the console and saved to `benchmarks/line-render-10k/results.txt`.

## Methodology

- **Warmup:** 10 mount/unmount cycles (discarded)
- **Measurement:** 20 mount/unmount cycles
- **Outliers:** removed via IQR (1.5× rule)
- **Metric:** time from mount start until the DOM is quiet for 32ms
- **Ranking:** sorted by mean render time (fastest first)

Absolute numbers vary by machine, browser, and CPU load. Compare relative ordering and ratios on the same hardware.

## Adding Base UI Charts

When `@base-ui/charts` is published, add a chart adapter in `src/charts/BaseUiCharts.tsx` and insert it as the first entry in `src/charts/index.ts` to match the original benchmark ordering.
