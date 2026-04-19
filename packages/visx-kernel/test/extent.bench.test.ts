import { describe, expect, it } from 'vitest';
import { extent } from '../src/extent';

describe('extent performance guard', () => {
  it('100k rows completes quickly', () => {
    const data = Array.from({ length: 100_000 }, (_, i) => ({ x: i }));
    const t0 = performance.now();
    extent(data, 'x', 'continuous');
    const ms = performance.now() - t0;
    expect(ms).toBeLessThan(500);
  });
});
