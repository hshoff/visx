import { createContext } from 'react';
import type { VisxTheme } from '../tokens/types';
import { lightTheme } from '../tokens/light';
import { toRuntimeTheme } from '../tokens/runtimeTheme';

export type ThemeContextMode = 'light' | 'dark' | 'auto' | 'custom';

export interface ThemeContextValue {
  /** Resolved authoring theme (raw values) used for fallbacks and CSS emission. */
  authoring: VisxTheme;
  /** Runtime theme for hooks (`var()` expressions on CSS-backed fields). */
  runtime: VisxTheme;
  mode: ThemeContextMode;
}

const defaultAuthoring = lightTheme;
const defaultRuntime = toRuntimeTheme(lightTheme);

export const defaultThemeContextValue: ThemeContextValue = {
  authoring: defaultAuthoring,
  runtime: defaultRuntime,
  mode: 'light',
};

export const ThemeContext = createContext<ThemeContextValue>(defaultThemeContextValue);
