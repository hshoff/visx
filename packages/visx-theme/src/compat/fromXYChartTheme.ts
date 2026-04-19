import { defineTheme } from '../provider/defineTheme';
import { lightTheme } from '../tokens/light';
import type { VisxTheme } from '../tokens/types';

/**
 * Minimal subset of xychart’s `XYChartTheme` that `fromXYChartTheme` reads.
 * Defined locally so `@visx/theme` stays free of `@visx/xychart` (no peer dep).
 * At the call site, `buildChartTheme(...)` output is accepted via structural typing.
 */
export type XYChartThemeInput = {
  backgroundColor: string;
  colors: string[];
  gridStyles: { stroke?: string | number };
  axisStyles: {
    x: {
      bottom: {
        axisLine: { stroke?: string };
      };
    };
  };
  svgLabelBig: { fontSize?: number; fontFamily?: string };
  svgLabelSmall: { fontSize?: number };
};

function normalizeCategorical(colors: string[]): string[] {
  const base = lightTheme.colors.categorical;
  const out: string[] = [];
  for (let i = 0; i < 12; i += 1) {
    out[i] = (colors[i] === undefined ? base[i] : colors[i]) as string;
  }
  return out;
}

/**
 * One-way migration from xychart’s theme object to `VisxTheme`.
 * Parameter type is structural — pass `buildChartTheme(...)` without importing types from `@visx/xychart`.
 */
export function fromXYChartTheme(legacy: XYChartThemeInput): VisxTheme {
  const gridStroke =
    typeof legacy.gridStyles.stroke === 'string'
      ? legacy.gridStyles.stroke
      : lightTheme.colors.gridStroke;

  const axisStroke = legacy.axisStyles.x.bottom.axisLine.stroke ?? lightTheme.colors.axisStroke;

  const fontSizeLabel =
    typeof legacy.svgLabelBig.fontSize === 'number'
      ? legacy.svgLabelBig.fontSize
      : lightTheme.typography.fontSizeLabel;
  const fontSizeTick =
    typeof legacy.svgLabelSmall.fontSize === 'number'
      ? legacy.svgLabelSmall.fontSize
      : lightTheme.typography.fontSizeTick;
  const fontFamily =
    typeof legacy.svgLabelBig.fontFamily === 'string'
      ? legacy.svgLabelBig.fontFamily
      : lightTheme.typography.fontFamily;

  return defineTheme(
    {
      name: 'from-xychart',
      colors: {
        categorical: normalizeCategorical(legacy.colors),
        background: legacy.backgroundColor,
        gridStroke,
        axisStroke,
        axisTickStroke: axisStroke,
      },
      typography: {
        fontSizeLabel,
        fontSizeTick,
        fontFamily,
      },
    },
    lightTheme,
  );
}
