import { describe, expect, it } from 'vitest';
import { createPath } from '../src/createPath';

describe('createPath full ops', () => {
  it('curveTo and close', () => {
    const p = createPath(2);
    p.moveTo(0, 0).curveTo(1, 1, 2, 2, 3, 3).close();
    expect(p.toString()).toContain('C');
    expect(p.toString().endsWith('Z')).toBe(true);
  });
});
