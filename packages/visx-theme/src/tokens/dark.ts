import type { VisxTheme } from './types';

const categorical = [
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#f87171',
  '#a78bfa',
  '#22d3ee',
  '#fb923c',
  '#a3e635',
  '#f472b6',
  '#818cf8',
  '#2dd4bf',
  '#c084fc',
] as const;

export const darkTheme: VisxTheme = {
  name: 'dark',
  colors: {
    categorical: [...categorical],
    sequentialFrom: '#60a5fa',
    sequentialTo: '#34d399',
    divergingNegative: '#f87171',
    divergingNeutral: '#374151',
    divergingPositive: '#60a5fa',

    background: '#0a0a0a',
    surface: '#171717',
    border: '#27272a',
    textPrimary: '#fafafa',
    textMuted: '#a1a1aa',

    positive: '#22c55e',
    negative: '#ef4444',
    highlight: '#60a5fa',

    axisStroke: '#27272a',
    axisTickStroke: '#27272a',
    gridStroke: '#27272a',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSizeTitle: 16,
    fontSizeLabel: 12,
    fontSizeTick: 11,
  },
  axis: {
    strokeWidth: 1,
    tickLength: 4,
  },
  grid: {
    strokeWidth: 1,
  },
  spacing: {
    margin: { top: 20, right: 20, bottom: 40, left: 50 },
  },
};
