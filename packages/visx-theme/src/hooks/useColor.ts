import { useContext } from 'react';
import { ThemeContext, defaultThemeContextValue } from '../provider/ThemeContext';
import type { ColorTokenName, VisxTheme } from '../tokens/types';

const COLOR_KEYS: Record<ColorTokenName, keyof VisxTheme['colors']> = {
  background: 'background',
  surface: 'surface',
  border: 'border',
  textPrimary: 'textPrimary',
  textMuted: 'textMuted',
  positive: 'positive',
  negative: 'negative',
  highlight: 'highlight',
  axisStroke: 'axisStroke',
  axisTickStroke: 'axisTickStroke',
  gridStroke: 'gridStroke',
  sequentialFrom: 'sequentialFrom',
  sequentialTo: 'sequentialTo',
  divergingNegative: 'divergingNegative',
  divergingNeutral: 'divergingNeutral',
  divergingPositive: 'divergingPositive',
};

/* eslint-disable @typescript-eslint/unified-signatures, no-redeclare -- spec overloads */
export function useColor(token: ColorTokenName): string;
export function useColor(index: number): string;
export function useColor(tokenOrIndex: ColorTokenName | number): string {
  const ctx = useContext(ThemeContext);
  const runtime = ctx === defaultThemeContextValue ? defaultThemeContextValue.runtime : ctx.runtime;

  if (typeof tokenOrIndex === 'number') {
    const i = ((tokenOrIndex % 12) + 12) % 12;
    return runtime.colors.categorical[i] as string;
  }
  const key = COLOR_KEYS[tokenOrIndex];
  return runtime.colors[key] as string;
}
/* eslint-enable @typescript-eslint/unified-signatures, no-redeclare */
