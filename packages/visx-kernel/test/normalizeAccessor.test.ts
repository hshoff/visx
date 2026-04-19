import { describe, expect, it } from 'vitest';
import { normalizeAccessor } from '../src/normalizeAccessor';

describe('normalizeAccessor', () => {
  it('caches string accessors', () => {
    expect(normalizeAccessor('x')).toBe(normalizeAccessor('x'));
  });

  it('passes function accessors through', () => {
    const fn = (d: { x: number }) => d.x;
    expect(normalizeAccessor(fn)).toBe(fn);
  });
});
