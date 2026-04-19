import { describe, expect, it } from 'vitest';
import { extent } from '../src/extent';

describe('extent edge cases', () => {
  it('continuous: skips infinite values', () => {
    const [a, b] = extent([{ x: 1 }, { x: Infinity }, { x: 3 }], 'x', 'continuous');
    expect(a).toBe(1);
    expect(b).toBe(3);
  });

  it('continuous: min updates without changing max on first smaller value', () => {
    expect(extent([{ x: 3 }, { x: 1 }], 'x', 'continuous')).toEqual([1, 3]);
  });

  it('time: max updates when later value is larger', () => {
    const [a, b] = extent([{ t: new Date(1) }, { t: new Date(5) }], 't', 'time');
    expect(a.getTime()).toBe(1);
    expect(b.getTime()).toBe(5);
  });

  it('time: min updates when second timestamp is smaller', () => {
    const [a, b] = extent([{ t: new Date(5) }, { t: new Date(1) }], 't', 'time');
    expect(a.getTime()).toBe(1);
    expect(b.getTime()).toBe(5);
  });

  it('time: skips invalid dates', () => {
    const bad = new Date('invalid');
    const [d0, d1] = extent([{ t: bad }, { t: new Date(5) }], 't', 'time');
    expect(d0.getTime()).toBe(5);
    expect(d1.getTime()).toBe(5);
  });

  it('ordinal: skips non-strings', () => {
    expect(extent([{ s: 1 as unknown as string }], 's', 'ordinal')).toEqual([]);
  });

  it('continuous: only infinite values yields fallback', () => {
    expect(extent([{ x: Infinity }, { x: -Infinity }], 'x', 'continuous')).toEqual([0, 1]);
  });

  it('continuous: non-number that coerces to NaN is skipped', () => {
    expect(extent([{ x: {} as unknown as number }], 'x', 'continuous')).toEqual([0, 1]);
  });

  it('time: numeric infinity is excluded', () => {
    const [a, b] = extent([{ t: 1 }, { t: Infinity }, { t: 3 }], 't', 'time');
    expect(a.getTime()).toBe(1);
    expect(b.getTime()).toBe(3);
  });

  it('time: null datum is skipped', () => {
    const [a, b] = extent([{ t: null as unknown as Date }, { t: new Date(5) }], 't', 'time');
    expect(a.getTime()).toBe(5);
    expect(b.getTime()).toBe(5);
  });

  it('time: Date with non-finite getTime is clamped', () => {
    const weird = new Date(Number.NaN);
    const [a, b] = extent([{ t: weird }, { t: new Date(2) }], 't', 'time');
    expect(a.getTime()).toBe(2);
    expect(b.getTime()).toBe(2);
  });

  it('time: NaN numeric timestamp is skipped', () => {
    const [a, b] = extent([{ t: Number.NaN }, { t: 2 }], 't', 'time');
    expect(a.getTime()).toBe(2);
    expect(b.getTime()).toBe(2);
  });

  it('time: non-date non-number values are skipped', () => {
    expect(extent([{ t: 'x' as unknown as Date }], 't', 'time')).toEqual([
      new Date(0),
      new Date(1),
    ]);
  });

  it('ordinal: duplicate values only push once', () => {
    expect(extent([{ s: 'a' }, { s: 'a' }], 's', 'ordinal')).toEqual(['a']);
  });

  it('ordinal: null is skipped with count', () => {
    expect(extent([{ s: null as unknown as string }], 's', 'ordinal')).toEqual([]);
  });
});
