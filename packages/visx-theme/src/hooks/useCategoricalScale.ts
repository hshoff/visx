import { useMemo } from 'react';
import { useTheme } from './useTheme';

export function useCategoricalScale(domain: readonly string[]): (key: string) => string {
  const theme = useTheme();
  return useMemo(() => {
    const palette = theme.colors.categorical;
    return (key: string) => {
      const i = domain.indexOf(key);
      const idx = i >= 0 ? i % 12 : 0;
      return palette[idx % 12] as string;
    };
  }, [domain, theme.colors.categorical]);
}
