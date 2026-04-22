import { describe, expect, it } from 'vitest';
import buildFontString from '../src/util/buildFontString';

describe('buildFontString', () => {
  it('returns default when style is undefined', () => {
    expect(buildFontString()).toBe('16px sans-serif');
  });

  it('includes font style, variant, weight, size, and family', () => {
    expect(
      buildFontString({
        fontStyle: 'italic',
        fontVariant: 'small-caps',
        fontWeight: '700',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      }),
    ).toBe('italic small-caps 700 14px Inter, sans-serif');
  });

  it('coerces numeric fontSize to px', () => {
    expect(buildFontString({ fontSize: 12, fontFamily: 'Arial' })).toBe('12px Arial');
  });

  it('defaults font size and family when omitted', () => {
    expect(buildFontString({ fontWeight: 'bold' })).toBe('bold 16px sans-serif');
  });
});
