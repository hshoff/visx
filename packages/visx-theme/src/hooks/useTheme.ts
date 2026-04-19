import { useContext } from 'react';
import { ThemeContext, defaultThemeContextValue } from '../provider/ThemeContext';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === defaultThemeContextValue) {
    return defaultThemeContextValue.runtime;
  }
  return ctx.runtime;
}
