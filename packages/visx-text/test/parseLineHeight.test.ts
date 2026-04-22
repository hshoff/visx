import { describe, expect, it } from 'vitest';
import parseLineHeight from '../src/util/parseLineHeight';

describe('parseLineHeight', () => {
  it('returns number values as-is', () => {
    expect(parseLineHeight(24)).toBe(24);
  });

  it('parses px', () => {
    expect(parseLineHeight('20px')).toBe(20);
  });

  it('parses em using font size from style', () => {
    expect(parseLineHeight('1em', { fontSize: 14 })).toBe(14);
    expect(parseLineHeight('1.5em', { fontSize: '20px' })).toBe(30);
  });

  it('uses 16px base for em when font size is missing', () => {
    expect(parseLineHeight('1em')).toBe(16);
  });

  it('treats bare numbers as multiples of 16px', () => {
    expect(parseLineHeight('1.5')).toBe(24);
  });
});
