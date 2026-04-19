/* eslint-env node */
/* global globalThis */
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('toPath2D SSR', () => {
  afterEach(() => {
    vi.resetModules();
  });

  it('without Path2D, returns shim that implements instance methods', async () => {
    const g = globalThis as typeof globalThis & { Path2D?: typeof Path2D };
    const Path2DRef = g.Path2D;
    // @ts-expect-error — exercise SSR branch
    delete g.Path2D;
    const { toPath2D } = await import('../src/toPath2D');
    const p = toPath2D('M0,0');
    expect(() => p.moveTo(0, 0)).not.toThrow();
    expect(() => p.closePath()).not.toThrow();
    g.Path2D = Path2DRef;
  });
});
