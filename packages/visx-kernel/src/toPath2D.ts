const MAX = 1024;
const cache = new Map<string, Path2D | MinimalPath2D>();

function noop(): void {}

/** Minimal Path2D-compatible shim for SSR: methods are no-ops; identity is cached per string. */
export type MinimalPath2D = {
  addPath(...args: unknown[]): void;
  closePath(): void;
  moveTo(...args: unknown[]): void;
  lineTo(...args: unknown[]): void;
  bezierCurveTo(...args: unknown[]): void;
  quadraticCurveTo(...args: unknown[]): void;
  arc(...args: unknown[]): void;
  arcTo(...args: unknown[]): void;
  ellipse(...args: unknown[]): void;
  rect(...args: unknown[]): void;
  roundRect(...args: unknown[]): void;
};

function createShim(): MinimalPath2D {
  return {
    addPath: noop,
    closePath: noop,
    moveTo: noop,
    lineTo: noop,
    bezierCurveTo: noop,
    quadraticCurveTo: noop,
    arc: noop,
    arcTo: noop,
    ellipse: noop,
    rect: noop,
    roundRect: noop,
  };
}

function evictOldest(): void {
  const first = cache.keys().next().value as string | undefined;
  if (first !== undefined) cache.delete(first);
}

/**
 * Returns a cached `Path2D` for `pathString`. In browsers this is native `Path2D`;
 * on the server a minimal compatible shim is returned (opaque — do not branch on it).
 */
export function toPath2D(pathString: string): Path2D {
  const hit = cache.get(pathString);
  if (hit) return hit as Path2D;

  if (cache.size >= MAX) {
    evictOldest();
  }

  let path: Path2D | MinimalPath2D;
  if (typeof Path2D === 'undefined') {
    path = createShim();
  } else {
    path = new Path2D(pathString);
  }
  cache.set(pathString, path);
  return path as Path2D;
}
