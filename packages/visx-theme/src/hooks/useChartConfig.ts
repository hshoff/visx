import { useMemo } from 'react';
import type { ChartConfig, ChartSeriesConfig } from '../tokens/types';
import { useTheme } from './useTheme';

export interface ResolvedSeries<K extends string> {
  key: K;
  label: string;
  icon?: ChartSeriesConfig['icon'];
  color: string;
}

export function useChartConfig<K extends string>(
  config: ChartConfig<K>,
): {
  series: ResolvedSeries<K>[];
  getColor: (key: K) => string;
  getLabel: (key: K) => string;
} {
  const theme = useTheme();

  return useMemo(() => {
    const keys = Object.keys(config) as K[];
    const series: ResolvedSeries<K>[] = keys.map((key, index) => ({
      key,
      label: config[key].label,
      icon: config[key].icon,
      color: config[key].color ?? (theme.colors.categorical[index % 12] as string),
    }));

    const getColor = (key: K) =>
      config[key].color ?? (theme.colors.categorical[keys.indexOf(key) % 12] as string);

    const getLabel = (key: K) => config[key].label;

    return { series, getColor, getLabel };
  }, [config, theme.colors.categorical]);
}
