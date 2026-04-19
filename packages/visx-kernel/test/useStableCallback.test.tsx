import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMemo } from 'react';
import { useStableCallback } from '../src/useStableCallback';

describe('useStableCallback', () => {
  it('stable identity, latest invocation', () => {
    const fn1 = vi.fn(() => 1);
    const fn2 = vi.fn(() => 2);
    const { result, rerender } = renderHook(({ f }) => useStableCallback(f), {
      initialProps: { f: fn1 },
    });
    const cb = result.current;
    expect(cb()).toBe(1);
    rerender({ f: fn2 });
    expect(result.current).toBe(cb);
    expect(cb()).toBe(2);
    expect(fn2).toHaveBeenCalled();
  });

  it('inline function does not break downstream memo', () => {
    const { result, rerender } = renderHook(
      ({ n }) => {
        const cb = useStableCallback(() => n);
        return useMemo(() => cb, [cb]);
      },
      { initialProps: { n: 1 } },
    );
    const memo = result.current;
    rerender({ n: 1 });
    expect(result.current).toBe(memo);
  });
});
