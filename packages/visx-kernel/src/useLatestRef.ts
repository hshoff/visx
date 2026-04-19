import { useRef } from 'react';

/**
 * A ref whose `.current` is updated during render so it always reflects the latest `value`
 * in effects and event handlers. The ref object identity is stable across renders.
 */
export function useLatestRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
