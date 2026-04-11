import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import type { ParentSizeState, UseParentSizeConfig } from '../hooks/useParentSize';
import useParentSize from '../hooks/useParentSize';
import { assignRef } from '../utils/mergeRefs';

export type ParentSizeProvidedProps = ParentSizeState & {
  ref: HTMLDivElement | null;
  resize: (state: ParentSizeState) => void;
};

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /**
   * @deprecated - use `style` prop as all other props are passed directly to the parent `div`.
   * @TODO remove in the next major version.
   * Optional `style` object to apply to the parent `div` wrapper used for size measurement.
   * */
  parentSizeStyles?: CSSProperties;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (args: ParentSizeProvidedProps) => ReactNode;
} & UseParentSizeConfig;

const defaultParentSizeStyles = { width: '100%', height: '100%' };

export default function ParentSize({
  className,
  children,
  debounceTime,
  ignoreDimensions,
  initialSize,
  parentSizeStyles = defaultParentSizeStyles,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
  ref: parentRefProp,
  ...restProps
}: ParentSizeProps & Omit<HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>) {
  const { parentRef, resize, ...dimensions } = useParentSize({
    initialSize,
    debounceTime,
    ignoreDimensions,
    enableDebounceLeadingCall,
    resizeObserverPolyfill,
    ref: parentRefProp,
  });

  const [measuredElement, setMeasuredElement] = useState<HTMLDivElement | null>(null);

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setMeasuredElement(node);
      assignRef(parentRef, node);
    },
    [parentRef],
  );

  return (
    <div style={parentSizeStyles} ref={setContainerRef} className={className} {...restProps}>
      {children({
        ...dimensions,
        ref: measuredElement,
        resize,
      })}
    </div>
  );
}
