import type { ComponentType, SVGAttributes } from 'react';

/**
 * Theme token shape. The same interface serves two uses:
 *
 * 1. Authoring form — raw values (`lightTheme` / `darkTheme`, `defineTheme`).
 * 2. Runtime form — `useTheme()`; CSS-backed strings are `var(...)` expressions.
 */
export interface VisxTheme {
  /** Identifier ("light" | "dark" | custom) */
  name: string;

  colors: {
    categorical: readonly string[];
    sequentialFrom: string;
    sequentialTo: string;
    divergingNegative: string;
    divergingNeutral: string;
    divergingPositive: string;

    background: string;
    surface: string;
    border: string;
    textPrimary: string;
    textMuted: string;

    positive: string;
    negative: string;
    highlight: string;

    axisStroke: string;
    axisTickStroke: string;
    gridStroke: string;
  };

  typography: {
    fontFamily: string;
    fontSizeTitle: number;
    fontSizeLabel: number;
    fontSizeTick: number;
  };

  axis: {
    strokeWidth: number;
    tickLength: number;
  };

  grid: {
    strokeWidth: number;
  };

  spacing: {
    margin: { top: number; right: number; bottom: number; left: number };
  };
}

export type VisxThemeName = 'light' | 'dark' | 'auto' | (string & {});

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface ChartSeriesConfig {
  label: string;
  icon?: ComponentType<{ className?: string }>;
  color?: string;
}

export type ChartConfig<K extends string = string> = Record<K, ChartSeriesConfig>;

export type ColorTokenName =
  | 'background'
  | 'surface'
  | 'border'
  | 'textPrimary'
  | 'textMuted'
  | 'positive'
  | 'negative'
  | 'highlight'
  | 'axisStroke'
  | 'axisTickStroke'
  | 'gridStroke'
  | 'sequentialFrom'
  | 'sequentialTo'
  | 'divergingNegative'
  | 'divergingNeutral'
  | 'divergingPositive';

/** Props intended for @visx/axis Axis* components (subset of SharedAxisProps). */
export interface AxisStyleProps {
  stroke: string;
  strokeWidth: number;
  tickStroke: string;
  tickLength: number;
  tickLabelProps: SVGAttributes<SVGTextElement>;
  labelProps: SVGAttributes<SVGTextElement>;
}

/** Props intended for @visx/grid GridRows / GridColumns. */
export interface GridStyleProps {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
}
