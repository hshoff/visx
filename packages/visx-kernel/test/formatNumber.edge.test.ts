import { describe, expect, it } from 'vitest';
import { formatNumber } from '../src/formatNumber';

describe('formatNumber edge cases', () => {
  it('handles non-finite', () => {
    expect(formatNumber(Number.NaN)).toBe('NaN');
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('Infinity');
    expect(formatNumber(Number.NEGATIVE_INFINITY)).toBe('-Infinity');
  });

  it('uses scientific notation outside typical chart magnitude', () => {
    const s = formatNumber(1e-8, 3);
    expect(s.includes('e') || s.includes('E')).toBe(true);
  });

  it('integer fixed output has no dot branch', () => {
    expect(formatNumber(12, 0)).toBe('12');
  });
});
