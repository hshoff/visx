import { useMemo } from 'react';
import { useLatestRef } from './useLatestRef';

type AnyFn = (...args: unknown[]) => unknown;

/**
 * Returns a callback with stable identity that always invokes the latest `fn`.
 */
export function useStableCallback<Fn extends AnyFn>(fn: Fn): Fn {
  const ref = useLatestRef(fn);
  return useMemo(
    () => ((...args: Parameters<Fn>) => ref.current(...args) as ReturnType<Fn>) as Fn,
    [ref],
  );
}
