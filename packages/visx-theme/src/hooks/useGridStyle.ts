import { useTheme } from './useTheme';
import type { GridStyleProps } from '../tokens/types';

export function useGridStyle(): GridStyleProps {
  const theme = useTheme();
  return {
    stroke: theme.colors.gridStroke,
    strokeWidth: theme.grid.strokeWidth,
  };
}
