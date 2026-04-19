import { useRef } from 'react';
import { shallowEqual } from './shallowEqual';

/**
 * Returns the same reference as the previous render when the value is structurally equal
 * to the last one (see `shallowEqual` at depth 0 or 1).
 *
 * Default depth is **1**, which catches the common case of inline option objects with
 * primitive values (margins, ranges, padding). Use depth **0** for already-memoized inputs
 * or when profiling shows the recursion matters.
 */
export function useStructuralMemo<T>(value: T, depth: 0 | 1 = 1): T {
  const ref = useRef(value);
  if (!shallowEqual(ref.current, value, depth)) {
    ref.current = value;
  }
  return ref.current;
}
