import { describe, expect, it } from 'vitest';
import { shallowEqual } from '../src/shallowEqual';

describe('shallowEqual', () => {
  it('depth 0: primitives', () => {
    expect(shallowEqual(1, 1, 0)).toBe(true);
    expect(shallowEqual(NaN, NaN, 0)).toBe(true);
    expect(shallowEqual(1, 2, 0)).toBe(false);
  });

  it('depth 0: arrays', () => {
    expect(shallowEqual([1, 2], [1, 2], 0)).toBe(true);
    expect(shallowEqual([1], [1, 2], 0)).toBe(false);
  });

  it('depth 0: plain objects', () => {
    expect(shallowEqual({ a: 1 }, { a: 1 }, 0)).toBe(true);
    expect(shallowEqual({ a: 1 }, { a: 2 }, 0)).toBe(false);
  });

  it('depth 1: nested plain objects', () => {
    expect(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }, 1)).toBe(true);
    expect(shallowEqual({ a: { b: 1 } }, { a: { b: 2 } }, 1)).toBe(false);
  });

  it('falls back to Object.is for non-plain objects', () => {
    const d1 = new Date(0);
    const d2 = new Date(0);
    expect(shallowEqual(d1, d2, 1)).toBe(false);
    expect(shallowEqual(d1, d1, 1)).toBe(true);
  });
});
