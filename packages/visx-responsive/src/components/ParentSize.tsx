import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import {
  defaultParentSizeMeasureLayerStyles,
  defaultParentSizeOuterStyles,
} from '../parentSizeWrapperStyles';
import type { ParentSizeState, UseParentSizeConfig } from '../hooks/useParentSize';
import useParentSize from '../hooks/useParentSize';

export type ParentSizeProvidedProps = ParentSizeState & {
  ref: HTMLDivElement | null;
  resize: (state: ParentSizeState) => void;
};

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /**
   * @deprecated - use `style` prop as all other props are passed directly to the outer wrapper `div`.
   * @TODO remove in the next major version.
   * Optional `style` merged onto the outer wrapper `div` (not the inner measurement layer).
   * */
  parentSizeStyles?: CSSProperties;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (args: ParentSizeProvidedProps) => ReactNode;
} & UseParentSizeConfig;

export default function ParentSize({
  className,
  children,
  debounceTime,
  ignoreDimensions,
  initialSize,
  parentSizeStyles,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
  style,
  ...restProps
}: ParentSizeProps & Omit<HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>) {
  const { parentRef, resize, ...dimensions } = useParentSize({
    initialSize,
    debounceTime,
    ignoreDimensions,
    enableDebounceLeadingCall,
    resizeObserverPolyfill,
  });

  const outerStyle = {
    ...defaultParentSizeOuterStyles,
    ...parentSizeStyles,
    ...style,
  };

  return (
    <div style={outerStyle} className={className} {...restProps}>
      <div style={defaultParentSizeMeasureLayerStyles} ref={parentRef}>
        {children({
          ...dimensions,
          ref: parentRef.current,
          resize,
        })}
      </div>
    </div>
  );
}
