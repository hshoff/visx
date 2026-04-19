import type { SVGAttributes } from 'react';
import { useTheme } from './useTheme';
import type { AxisStyleProps } from '../tokens/types';

const tickLabelByOrientation: Record<
  'top' | 'right' | 'bottom' | 'left',
  SVGAttributes<SVGTextElement>
> = {
  bottom: { dy: '0.25em', textAnchor: 'middle' },
  top: { dy: '-0.75em', textAnchor: 'middle' },
  left: { dx: '-0.25em', dy: '0.25em', textAnchor: 'end' },
  right: { dx: '0.25em', dy: '0.25em', textAnchor: 'start' },
};

const labelByOrientation: Record<
  'top' | 'right' | 'bottom' | 'left',
  SVGAttributes<SVGTextElement>
> = {
  bottom: { dy: '-0.25em', textAnchor: 'middle' },
  top: { dy: '-0.25em', textAnchor: 'middle' },
  left: { dx: '-1.25em', textAnchor: 'middle' },
  right: { dx: '1.25em', textAnchor: 'middle' },
};

export function useAxisStyle(orientation: 'top' | 'right' | 'bottom' | 'left'): AxisStyleProps {
  const theme = useTheme();

  const tickLabelProps: SVGAttributes<SVGTextElement> = {
    fill: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSizeTick,
    ...tickLabelByOrientation[orientation],
  };

  const labelProps: SVGAttributes<SVGTextElement> = {
    fill: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSizeLabel,
    ...labelByOrientation[orientation],
  };

  return {
    stroke: theme.colors.axisStroke,
    strokeWidth: theme.axis.strokeWidth,
    tickStroke: theme.colors.axisTickStroke,
    tickLength: theme.axis.tickLength,
    tickLabelProps,
    labelProps,
  };
}
