export { default as ThemeProvider } from './provider/ThemeProvider';
export type {
  ThemeProviderProps,
  ThemeProviderAutoFalse,
  ThemeProviderWithWrapper,
} from './provider/ThemeProvider';

export { defineTheme } from './provider/defineTheme';

export { lightTheme } from './tokens/light';
export { darkTheme } from './tokens/dark';
export { cssVar } from './tokens/cssVar';
export { CSS_VAR_NAMES, CATEGORICAL_VAR_NAMES } from './tokens/names';
export type {
  VisxTheme,
  VisxThemeName,
  DeepPartial,
  ChartSeriesConfig,
  ChartConfig,
  ColorTokenName,
  AxisStyleProps,
  GridStyleProps,
} from './tokens/types';

export { useTheme } from './hooks/useTheme';
export { useColor } from './hooks/useColor';
export { useCategoricalScale } from './hooks/useCategoricalScale';
export { useAxisStyle } from './hooks/useAxisStyle';
export { useGridStyle } from './hooks/useGridStyle';
export { useChartConfig } from './hooks/useChartConfig';
export type { ResolvedSeries } from './hooks/useChartConfig';

export { fromXYChartTheme } from './compat/fromXYChartTheme';
export type { XYChartThemeInput } from './compat/fromXYChartTheme';
