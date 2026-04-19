import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDomain } from '../src/useDomain';

describe('useDomain time', () => {
  it('returns stable tuple for same range', () => {
    const d0 = new Date('2020-01-01');
    const d1 = new Date('2020-02-01');
    const data = [{ t: d0 }, { t: d1 }];
    const { result, rerender } = renderHook(() =>
      useDomain({ data, accessor: 't', type: 'time' as const }),
    );
    const first = result.current;
    rerender();
    expect(result.current[0].getTime()).toBe(first[0].getTime());
    expect(result.current[1].getTime()).toBe(first[1].getTime());
    expect(result.current).toBe(first);
  });
});
