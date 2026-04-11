import type { CSSProperties } from 'react';

/** Outer wrapper: establishes a containing block and clips content so intrinsic child size does not expand flex/grid parents. */
export const defaultParentSizeOuterStyles: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
};

/** Inner layer observed by ResizeObserver; absolutely fills the outer wrapper without participating in parent auto sizing. */
export const defaultParentSizeMeasureLayerStyles: CSSProperties = {
  position: 'absolute',
  inset: 0,
};
