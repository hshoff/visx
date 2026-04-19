import { describe, expect, it } from 'vitest';
import { formatNumber } from '../src/formatNumber';

describe('formatNumber', () => {
  it('strips trailing zeros and rounds', () => {
    expect(formatNumber(12.000001)).toBe('12');
    expect(formatNumber(12.345678, 3)).toBe('12.346');
  });

  it('avoids scientific notation in typical chart range', () => {
    const n = 12345.678;
    const s = formatNumber(n, 4);
    expect(s.includes('e')).toBe(false);
    expect(s.includes('E')).toBe(false);
  });
});
