import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useEffect } from 'react';
import { useLatestRef } from '../src/useLatestRef';

describe('useLatestRef', () => {
  it('keeps stable ref identity and updates current', () => {
    const { result, rerender } = renderHook(({ v }) => useLatestRef(v), {
      initialProps: { v: 1 },
    });
    const ref = result.current;
    expect(ref.current).toBe(1);
    rerender({ v: 2 });
    expect(result.current).toBe(ref);
    expect(ref.current).toBe(2);
  });

  it('effects see latest value', () => {
    const seen: number[] = [];
    const { rerender } = renderHook(
      ({ v }) => {
        const ref = useLatestRef(v);
        useEffect(() => {
          seen.push(ref.current);
        }, [v, ref]);
        return ref;
      },
      { initialProps: { v: 1 } },
    );
    rerender({ v: 2 });
    expect(seen).toContain(2);
  });
});
