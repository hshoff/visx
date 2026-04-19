import { describe, expect, it } from 'vitest';
import { createPath } from '../src/createPath';

describe('createPath', () => {
  it('builds path string with formatted numbers', () => {
    const p = createPath(3);
    p.moveTo(0, 0).lineTo(10, 10);
    expect(p.toString()).toBe('M0,0L10,10');
  });

  it('precision reduces length vs full float', () => {
    const rough = createPath(12);
    rough.moveTo(1.234567890123, 2.345678901234);
    const fine = createPath(3);
    fine.moveTo(1.234567890123, 2.345678901234);
    expect(fine.toString().length).toBeLessThan(rough.toString().length);
  });
});
