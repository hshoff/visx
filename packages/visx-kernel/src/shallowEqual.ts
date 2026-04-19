function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function shallowEqualDepth0(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (const [i, element] of a.entries()) {
      if (!Object.is(element, b[i])) return false;
    }
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!Object.is(a[k], b[k])) return false;
    }
    return true;
  }
  return Object.is(a, b);
}

function shallowEqualDepth1Inner(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (const [i, element] of a.entries()) {
      if (!shallowEqualDepth0(element, b[i])) return false;
    }
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!shallowEqualDepth0(a[k], b[k])) return false;
    }
    return true;
  }
  return Object.is(a, b);
}

/**
 * Structural comparison for primitives, arrays, and plain objects only.
 * Other object types fall back to `Object.is`.
 * @internal
 */
export function shallowEqual(a: unknown, b: unknown, depth: 0 | 1): boolean {
  if (depth === 0) {
    if (!isPlainObject(a) && !Array.isArray(a) && !isPlainObject(b) && !Array.isArray(b)) {
      return Object.is(a, b);
    }
    return shallowEqualDepth0(a, b);
  }
  if (!isPlainObject(a) && !Array.isArray(a) && !isPlainObject(b) && !Array.isArray(b)) {
    return Object.is(a, b);
  }
  return shallowEqualDepth1Inner(a, b);
}
