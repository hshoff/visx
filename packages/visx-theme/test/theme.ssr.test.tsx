import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import {
  ThemeProvider,
  useTheme,
  useColor,
  useAxisStyle,
  useGridStyle,
  useCategoricalScale,
  useChartConfig,
  lightTheme,
  darkTheme,
  defineTheme,
  fromXYChartTheme,
} from '../src';

function HookProbe() {
  const theme = useTheme();
  const c = useColor('positive');
  const axis = useAxisStyle('bottom');
  const grid = useGridStyle();
  const scale = useCategoricalScale(['a', 'b']);
  const { getColor } = useChartConfig({ a: { label: 'A' }, b: { label: 'B' } });
  return (
    <g data-theme-name={theme.name} data-color={c} data-axis={axis.stroke} data-grid={grid.stroke}>
      <text data-scale={scale('a')} data-config={getColor('a')} />
    </g>
  );
}

describe('@visx/theme SSR', () => {
  it('renders ThemeProvider light mode without mismatch', () => {
    const html = renderToString(
      <ThemeProvider theme="light">
        <HookProbe />
      </ThemeProvider>,
    );
    expect(html).toContain('data-theme-name="light"');
    expect(html).toContain('var(--chart-positive');
  });

  it('renders auto mode with pass-through as={false}', () => {
    const html = renderToString(
      <ThemeProvider theme="auto" as={false}>
        <HookProbe />
      </ThemeProvider>,
    );
    expect(html).not.toContain('<div');
    expect(html).toContain('data-theme-name="light"');
  });

  it('renders dark built-in theme', () => {
    const html = renderToString(
      <ThemeProvider theme="dark">
        <HookProbe />
      </ThemeProvider>,
    );
    expect(html).toContain('--chart-1');
  });

  it('renders custom theme object', () => {
    const custom = defineTheme({ name: 'x', colors: { positive: '#abc' } });
    const html = renderToString(
      <ThemeProvider theme={custom}>
        <HookProbe />
      </ThemeProvider>,
    );
    expect(html).toContain('--chart-positive');
  });

  it('exports authoring themes with raw hex', () => {
    expect(lightTheme.colors.categorical[0]).toMatch(/^#/);
    expect(darkTheme.colors.categorical[0]).toMatch(/^#/);
  });

  it('fromXYChartTheme maps legacy shape', () => {
    const visx = fromXYChartTheme({
      backgroundColor: '#fff',
      colors: ['#111', '#222', '#333', '#444', '#555'],
      gridStyles: { stroke: '#ccc' },
      axisStyles: { x: { bottom: { axisLine: { stroke: '#999' } } } },
      svgLabelBig: { fontSize: 13, fontFamily: 'Inter' },
      svgLabelSmall: { fontSize: 9 },
    });
    expect(visx.colors.background).toBe('#fff');
    expect(visx.colors.gridStroke).toBe('#ccc');
    expect(visx.typography.fontFamily).toBe('Inter');
    expect(visx.colors.categorical).toHaveLength(12);
  });
});
