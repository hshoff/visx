import { defineTheme } from '../provider/defineTheme';
import { lightTheme } from '../tokens/light';
import type { VisxTheme } from '../tokens/types';

/**
 * Structural match for @visx/xychart's XYChartTheme (accepts `buildChartTheme` output).
 * Kept local so @visx/theme does not depend on @visx/xychart.
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

/** One-way migration adapter from @visx/xychart XYChartTheme to VisxTheme. */
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
