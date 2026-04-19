import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDomain } from '../src/useDomain';
import { setWarnHandler, resetWarnDedupeForTests } from '../src/devWarn';

describe('useDomain', () => {
  beforeEach(() => {
    resetWarnDedupeForTests();
    setWarnHandler(null);
  });

  it('empty data: fallback and EMPTY_DATA', () => {
    const spy = vi.fn();
    setWarnHandler((code, hook, msg) => spy(code, hook, msg));
    const { result } = renderHook(() => useDomain({ data: [], accessor: 'x', type: 'continuous' }));
    expect(result.current).toEqual([0, 1]);
    expect(spy).toHaveBeenCalledWith('EMPTY_DATA', 'useDomain', expect.any(String));
  });

  it('all NaN: EMPTY_DATA and NAN_IN_DATA', () => {
    const spy = vi.fn();
    setWarnHandler((code) => spy(code));
    const { result } = renderHook(() =>
      useDomain({
        data: [{ x: NaN }, { x: NaN }],
        accessor: 'x',
        type: 'continuous',
      }),
    );
    expect(result.current).toEqual([0, 1]);
    expect(spy.mock.calls.map((c) => c[0]).sort()).toEqual(['EMPTY_DATA', 'NAN_IN_DATA']);
  });

  it('infinite values: INFINITE_VALUE warning', () => {
    const spy = vi.fn();
    setWarnHandler((code) => spy(code));
    renderHook(() =>
      useDomain({
        data: [{ x: 1 }, { x: Infinity }],
        accessor: 'x',
        type: 'continuous',
      }),
    );
    expect(spy.mock.calls.map((c) => c[0])).toContain('INFINITE_VALUE');
  });

  it('only infinite samples: EMPTY_DATA and INFINITE_VALUE', () => {
    const spy = vi.fn();
    setWarnHandler((code) => spy(code));
    renderHook(() =>
      useDomain({
        data: [{ x: Infinity }, { x: -Infinity }],
        accessor: 'x',
        type: 'continuous',
      }),
    );
    const codes = spy.mock.calls.map((c) => c[0]).sort();
    expect(codes).toEqual(['EMPTY_DATA', 'INFINITE_VALUE']);
  });

  it('updates memo when domain values change', () => {
    const { result, rerender } = renderHook(
      ({ data }) => useDomain({ data, accessor: 'x', type: 'continuous' }),
      { initialProps: { data: [{ x: 0 }, { x: 1 }] } },
    );
    const first = result.current;
    rerender({ data: [{ x: 10 }, { x: 20 }] });
    expect(result.current).not.toBe(first);
    expect(result.current).toEqual([10, 20]);
  });
});
