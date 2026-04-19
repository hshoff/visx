import { darkTheme } from '../tokens/dark';
import { lightTheme } from '../tokens/light';
import type { DeepPartial, VisxTheme, VisxThemeName } from '../tokens/types';

function isVisxThemeObject(value: unknown): value is VisxTheme {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'colors' in value &&
    typeof (value as VisxTheme).colors === 'object' &&
    (value as VisxTheme).colors !== null &&
    'categorical' in (value as VisxTheme).colors
  );
}

function mergeCategorical(
  base: readonly string[],
  override: readonly string[] | undefined,
): string[] {
  if (override === undefined || override.length === 0) return [...base];
  const out: string[] = [];
  for (let i = 0; i < 12; i += 1) {
    out[i] = (override[i] === undefined ? base[i] : override[i]) as string;
  }
  return out;
}

function deepMergeVisxTheme(base: VisxTheme, partial: DeepPartial<VisxTheme>): VisxTheme {
  const colors = partial.colors
    ? {
        ...base.colors,
        ...partial.colors,
        categorical: mergeCategorical(
          base.colors.categorical,
          partial.colors.categorical as readonly string[] | undefined,
        ),
      }
    : {
        ...base.colors,
        categorical: mergeCategorical(base.colors.categorical, undefined),
      };

  const typography = partial.typography
    ? { ...base.typography, ...partial.typography }
    : base.typography;
  const axis = partial.axis ? { ...base.axis, ...partial.axis } : base.axis;
  const grid = partial.grid ? { ...base.grid, ...partial.grid } : base.grid;
  const spacing = partial.spacing
    ? {
        ...base.spacing,
        ...partial.spacing,
        margin: partial.spacing.margin
          ? { ...base.spacing.margin, ...partial.spacing.margin }
          : base.spacing.margin,
      }
    : base.spacing;

  return {
    name: partial.name ?? base.name,
    colors,
    typography,
    axis,
    grid,
    spacing,
  };
}

export function defineTheme(
  overrides: DeepPartial<VisxTheme>,
  base: VisxTheme = lightTheme,
): VisxTheme {
  const merged = deepMergeVisxTheme(base, overrides);
  if (
    process.env.NODE_ENV === 'development' &&
    overrides.colors?.categorical &&
    overrides.colors.categorical.length > 0 &&
    overrides.colors.categorical.length < 5 &&
    base.colors.categorical.length < 5
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      '@visx/theme defineTheme: categorical override has fewer than 5 entries and base also has fewer than 5; palette may be invalid.',
    );
  }
  return merged;
}

export function resolveThemeProp(theme: VisxThemeName | VisxTheme | undefined): {
  authoring: VisxTheme;
  mode: 'light' | 'dark' | 'auto' | 'custom';
} {
  if (theme === 'auto' || theme === undefined) {
    return { authoring: lightTheme, mode: 'auto' };
  }
  if (theme === 'light') {
    return { authoring: lightTheme, mode: 'light' };
  }
  if (theme === 'dark') {
    return { authoring: darkTheme, mode: 'dark' };
  }
  if (isVisxThemeObject(theme)) {
    return { authoring: theme, mode: 'custom' };
  }
  return { authoring: lightTheme, mode: 'light' };
}
