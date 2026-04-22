import { describe, expect, it } from 'vitest';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';

describe('layoutWithLines performance', () => {
  it('is fast enough for interactive resize (many layout passes)', () => {
    const prepared = prepareWithSegments('Tick label one two three four five', '12px sans-serif');
    const iterations = 2000;
    const t0 = performance.now();
    for (let i = 0; i < iterations; i += 1) {
      layoutWithLines(prepared, 40 + (i % 80), 14);
    }
    const ms = performance.now() - t0;
    const perCallMs = ms / iterations;
    expect(perCallMs).toBeLessThan(0.05);
  });
});
