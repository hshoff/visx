/* global globalThis */
import { beforeAll, describe, expect, it } from 'vitest';
import { toPath2D } from '../src/toPath2D';

function Path2DStub(this: object) {
  // no-op stub when jsdom lacks Path2D
  return this;
}

beforeAll(() => {
  if (typeof globalThis.Path2D === 'undefined') {
    globalThis.Path2D = Path2DStub as unknown as typeof Path2D;
  }
});

describe('toPath2D', () => {
  it('same string returns same instance', () => {
    const a = toPath2D('M0,0');
    const b = toPath2D('M0,0');
    expect(a).toBe(b);
  });

  it('evicts oldest at 1024 entries', () => {
    for (let i = 0; i < 1024; i += 1) {
      toPath2D(`M${i},0`);
    }
    const first = toPath2D('M0,0');
    toPath2D('M1024,0');
    const again = toPath2D('M0,0');
    expect(again).not.toBe(first);
  });
});
