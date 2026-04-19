import { CATEGORICAL_VAR_NAMES, CSS_VAR_NAMES } from './names';
import { cssVar } from './cssVar';
import type { VisxTheme } from './types';

function categoricalHex(authoring: VisxTheme['colors'], index: number): string {
  const { categorical } = authoring;
  if (index < categorical.length) return categorical[index] as string;
  return categorical[categorical.length - 1] as string;
}

/** Maps authoring-form color tokens to runtime `var(...)` chains (§5.3). */
export function toRuntimeColors(authoring: VisxTheme['colors']): VisxTheme['colors'] {
  const cat = (i: number) =>
    cssVar(CATEGORICAL_VAR_NAMES[i] as string, categoricalHex(authoring, i));

  return {
    categorical: Array.from({ length: 12 }, (_, i) => cat(i)),
    sequentialFrom: cssVar(
      CSS_VAR_NAMES.chartScaleFrom,
      cssVar(CSS_VAR_NAMES.chart1, categoricalHex(authoring, 0)),
    ),
    sequentialTo: cssVar(
      CSS_VAR_NAMES.chartScaleTo,
      cssVar(CSS_VAR_NAMES.chart2, categoricalHex(authoring, 1)),
    ),
    divergingNegative: cssVar(
      CSS_VAR_NAMES.chartDivergeLow,
      cssVar(CSS_VAR_NAMES.destructive, authoring.negative),
    ),
    divergingNeutral: cssVar(
      CSS_VAR_NAMES.chartDivergeMid,
      cssVar(CSS_VAR_NAMES.muted, authoring.divergingNeutral),
    ),
    divergingPositive: cssVar(
      CSS_VAR_NAMES.chartDivergeHigh,
      cssVar(CSS_VAR_NAMES.primary, authoring.highlight),
    ),

    background: cssVar(CSS_VAR_NAMES.background, authoring.background),
    surface: cssVar(CSS_VAR_NAMES.card, cssVar(CSS_VAR_NAMES.background, authoring.background)),
    border: cssVar(CSS_VAR_NAMES.border, authoring.border),
    textPrimary: cssVar(CSS_VAR_NAMES.foreground, authoring.textPrimary),
    textMuted: cssVar(CSS_VAR_NAMES.mutedForeground, authoring.textMuted),

    positive: cssVar(CSS_VAR_NAMES.chartPositive, authoring.positive),
    negative: cssVar(
      CSS_VAR_NAMES.chartNegative,
      cssVar(CSS_VAR_NAMES.destructive, authoring.negative),
    ),
    highlight: cssVar(
      CSS_VAR_NAMES.chartHighlight,
      cssVar(CSS_VAR_NAMES.primary, authoring.highlight),
    ),

    axisStroke: cssVar(
      CSS_VAR_NAMES.visxAxisStroke,
      cssVar(CSS_VAR_NAMES.border, authoring.border),
    ),
    axisTickStroke: cssVar(
      CSS_VAR_NAMES.visxAxisTickStroke,
      cssVar(CSS_VAR_NAMES.border, authoring.border),
    ),
    gridStroke: cssVar(
      CSS_VAR_NAMES.visxGridStroke,
      cssVar(CSS_VAR_NAMES.border, authoring.border),
    ),
  };
}

export function toRuntimeTypography(authoring: VisxTheme): VisxTheme['typography'] {
  return {
    ...authoring.typography,
    fontFamily: cssVar(CSS_VAR_NAMES.visxFontFamily, authoring.typography.fontFamily),
  };
}

/** Full theme: CSS-backed strings become `var()` expressions; JS-only fields unchanged. */
export function toRuntimeTheme(authoring: VisxTheme): VisxTheme {
  return {
    ...authoring,
    colors: toRuntimeColors(authoring.colors),
    typography: toRuntimeTypography(authoring),
  };
}
