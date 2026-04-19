import { describe, expect, it } from 'vitest';
import { extent } from '../src/extent';

describe('extent', () => {
  it('continuous: empty falls back', () => {
    expect(extent([], 'x', 'continuous')).toEqual([0, 1]);
  });

  it('continuous: mixed valid and NaN', () => {
    expect(extent([{ x: 1 }, { x: NaN }, { x: 3 }], 'x', 'continuous')).toEqual([1, 3]);
  });

  it('ordinal: dedup preserves first-seen order', () => {
    expect(extent([{ s: 'b' }, { s: 'a' }, { s: 'b' }], 's', 'ordinal')).toEqual(['b', 'a']);
  });

  it('time: produces date range', () => {
    const d0 = new Date('2020-01-01');
    const d1 = new Date('2020-06-01');
    const [a, b] = extent([{ t: d1 }, { t: d0 }], 't', 'time');
    expect(a.getTime()).toBe(d0.getTime());
    expect(b.getTime()).toBe(d1.getTime());
  });
});
