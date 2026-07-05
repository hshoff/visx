import { describe, expect, it } from 'vitest';
import parseLetterSpacing from '../src/util/parseLetterSpacing';

describe('parseLetterSpacing', () => {
  it('returns undefined when letter spacing is omitted', () => {
    expect(parseLetterSpacing(undefined)).toBeUndefined();
  });

  it('returns numeric values as-is', () => {
    expect(parseLetterSpacing(2)).toBe(2);
  });

  it('parses px and em', () => {
    expect(parseLetterSpacing('2px')).toBe(2);
    expect(parseLetterSpacing('0.1em', { fontSize: 20 })).toBe(2);
  });
});
