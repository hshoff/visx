import type { CSSProperties } from 'react';
import { CATEGORICAL_VAR_NAMES, CSS_VAR_NAMES } from '../tokens/names';
import type { VisxTheme } from '../tokens/types';

/** Inline style object with CSS custom properties from an authoring-form theme. */
export function emitCssVariables(authoring: VisxTheme): CSSProperties {
  const vars: Record<string, string> = {};
  const { colors } = authoring;

  for (let i = 0; i < 12; i += 1) {
    vars[CATEGORICAL_VAR_NAMES[i] as string] = colors.categorical[i] as string;
  }

  vars[CSS_VAR_NAMES.chartScaleFrom] = colors.sequentialFrom;
  vars[CSS_VAR_NAMES.chartScaleTo] = colors.sequentialTo;
  vars[CSS_VAR_NAMES.chartDivergeLow] = colors.divergingNegative;
  vars[CSS_VAR_NAMES.chartDivergeMid] = colors.divergingNeutral;
  vars[CSS_VAR_NAMES.chartDivergeHigh] = colors.divergingPositive;

  vars[CSS_VAR_NAMES.background] = colors.background;
  vars[CSS_VAR_NAMES.card] = colors.surface;
  vars[CSS_VAR_NAMES.border] = colors.border;
  vars[CSS_VAR_NAMES.foreground] = colors.textPrimary;
  vars[CSS_VAR_NAMES.mutedForeground] = colors.textMuted;

  vars[CSS_VAR_NAMES.chartPositive] = colors.positive;
  vars[CSS_VAR_NAMES.chartNegative] = colors.negative;
  vars[CSS_VAR_NAMES.chartHighlight] = colors.highlight;

  vars[CSS_VAR_NAMES.visxAxisStroke] = colors.axisStroke;
  vars[CSS_VAR_NAMES.visxAxisTickStroke] = colors.axisTickStroke;
  vars[CSS_VAR_NAMES.visxGridStroke] = colors.gridStroke;

  vars[CSS_VAR_NAMES.visxFontFamily] = authoring.typography.fontFamily;

  return vars as unknown as CSSProperties;
}
