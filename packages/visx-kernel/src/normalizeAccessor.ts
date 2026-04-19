import type { Accessor } from './accessor/types';

const stringCache = new Map<string, (d: Record<string, unknown>) => unknown>();

function fromString(key: string): (d: Record<string, unknown>) => unknown {
  let fn = stringCache.get(key);
  if (!fn) {
    fn = (d: Record<string, unknown>) => d[key];
    stringCache.set(key, fn);
  }
  return fn;
}

/**
 * Returns a function accessor for a string key (cached per key) or passes function accessors through.
 *
 * Only single-segment property names are supported (no `"a.b"` paths or `"items[0]"` indices).
 * String keys only; symbol-key access is not supported in v1.
 */
export function normalizeAccessor<D, V = unknown>(accessor: Accessor<D, V>): (d: D) => V {
  if (typeof accessor === 'function') {
    return accessor as (d: D) => V;
  }
  return fromString(accessor as string) as (d: D) => V;
}
