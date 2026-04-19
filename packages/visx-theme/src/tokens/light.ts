import type { VisxTheme } from './types';

/** shadcn-aligned default palette extended to 12 series; authoring form (raw hex / literals). */
const categorical = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#84cc16',
  '#ec4899',
  '#6366f1',
  '#14b8a6',
  '#a855f7',
] as const;

export const lightTheme: VisxTheme = {
  name: 'light',
  colors: {
    categorical: [...categorical],
    sequentialFrom: '#3b82f6',
    sequentialTo: '#10b981',
    divergingNegative: '#ef4444',
    divergingNeutral: '#f3f4f6',
    divergingPositive: '#3b82f6',

    background: '#ffffff',
    surface: '#ffffff',
    border: '#e5e7eb',
    textPrimary: '#1a1a1a',
    textMuted: '#6b7280',

    positive: '#22c55e',
    negative: '#ef4444',
    highlight: '#3b82f6',

    axisStroke: '#e5e7eb',
    axisTickStroke: '#e5e7eb',
    gridStroke: '#e5e7eb',
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
