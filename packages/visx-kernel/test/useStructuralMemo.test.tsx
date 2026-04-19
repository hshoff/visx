import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StrictMode, type ReactNode } from 'react';
import { useStructuralMemo } from '../src/useStructuralMemo';

describe('useStructuralMemo', () => {
  it('returns same ref for structurally equal object', () => {
    const { result, rerender } = renderHook(({ v }) => useStructuralMemo(v, 1), {
      initialProps: { v: { top: 1 } },
    });
    const first = result.current;
    rerender({ v: { top: 1 } });
    expect(result.current).toBe(first);
  });

  it('changes ref when structure changes', () => {
    const { result, rerender } = renderHook(({ v }) => useStructuralMemo(v, 1), {
      initialProps: { v: { top: 1 } },
    });
    const first = result.current;
    rerender({ v: { top: 2 } });
    expect(result.current).not.toBe(first);
  });

  it('strict mode double render returns correct value', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>;
    const { result } = renderHook(() => useStructuralMemo({ a: 1 }, 1), { wrapper });
    expect(result.current).toEqual({ a: 1 });
  });

  it('sequence invariant: reference changes iff comparator would see inequality', () => {
    const seq = [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 1 }];
    const refs: unknown[] = [];
    const { result, rerender } = renderHook(({ i }) => useStructuralMemo(seq[i], 1), {
      initialProps: { i: 0 },
    });
    refs.push(result.current);
    rerender({ i: 1 });
    refs.push(result.current);
    rerender({ i: 2 });
    refs.push(result.current);
    rerender({ i: 3 });
    refs.push(result.current);
    expect(refs[0]).toBe(refs[1]);
    expect(refs[1]).not.toBe(refs[2]);
    expect(refs[2]).not.toBe(refs[3]);
  });
});
