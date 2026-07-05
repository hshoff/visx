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

  it('uses element font size for unitless values', () => {
    expect(parseLineHeight('1.5', { fontSize: 20 })).toBe(30);
    expect(parseLineHeight('1.5')).toBe(24);
  });

  it('parses rem against a 16px root', () => {
    expect(parseLineHeight('1.5rem')).toBe(24);
  });

  it('parses percentage of font size', () => {
    expect(parseLineHeight('150%', { fontSize: 20 })).toBe(30);
  });

  it('parses lh relative to font size', () => {
    expect(parseLineHeight('1.5lh', { fontSize: 20 })).toBe(30);
  });
});
