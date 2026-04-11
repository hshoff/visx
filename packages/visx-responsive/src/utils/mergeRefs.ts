import type { MutableRefObject, Ref, RefCallback } from 'react';

/** Assigns `node` to a React ref (object or callback). */
export function assignRef<T>(ref: Ref<T> | undefined | null, node: T | null) {
  if (ref == null) return;
  if (typeof ref === 'function') {
    (ref as RefCallback<T>)(node);
  } else {
    (ref as MutableRefObject<T | null>).current = node;
  }
}

/** Returns a callback ref that assigns the node to every provided ref. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined | null>): RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((r) => assignRef(r, node));
  };
}
