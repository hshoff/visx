import { describe, expect, it } from 'vitest';
import { shallowEqual } from '../src/shallowEqual';

describe('shallowEqual more branches', () => {
  it('depth 1: array vs object uses Object.is fallback', () => {
    expect(shallowEqual([1], { a: 1 }, 1)).toBe(false);
  });

  it('depth 1: nested array length mismatch', () => {
    expect(shallowEqual([[1]], [[1, 2]], 1)).toBe(false);
  });

  it('depth 1: nested array element differs', () => {
    expect(shallowEqual([[1]], [[2]], 1)).toBe(false);
  });

  it('depth 0: key missing on b', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1 }, 0)).toBe(false);
  });

  it('depth 1: nested object key missing on b', () => {
    expect(shallowEqual({ a: { b: 1, c: 2 } }, { a: { b: 1 } }, 1)).toBe(false);
  });

  it('depth 1: nested arrays equal', () => {
    expect(
      shallowEqual(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [1, 2],
          [3, 4],
        ],
        1,
      ),
    ).toBe(true);
  });

  it('depth 1: nested object missing inherited key on b', () => {
    const a = Object.assign(Object.create({ x: 1 }), { y: 2 });
    const b = { y: 2 };
    expect(shallowEqual(a, b, 1)).toBe(false);
  });
});
