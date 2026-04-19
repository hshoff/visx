import { useRef } from 'react';
import { devWarn } from './devWarn';
import type { Domain, DomainType, UseDomainParams } from './domain/types';
import { extentWithMetrics } from './extent';
import { shallowEqual } from './shallowEqual';
import { useStructuralMemo } from './useStructuralMemo';

function domainEqual<T extends DomainType>(a: Domain<T>, b: Domain<T>, kind: DomainType): boolean {
  if (kind === 'time') {
    const x = a as [Date, Date];
    const y = b as [Date, Date];
    return x[0].getTime() === y[0].getTime() && x[1].getTime() === y[1].getTime();
  }
  return shallowEqual(a, b, 1);
}

/**
 * Computes a stable domain from `data` and `accessor`.
 *
 * `useDomain` types (`'continuous' | 'time' | 'ordinal'`) describe **domain shape**.
 * `useScale` types (`'linear' | 'time' | 'band' | 'point' | 'ordinal' | 'auto'`) describe
 * **concrete scale implementation**. Band and point scales share ordinal domain shape but
 * differ in how they distribute output across a range — these unions stay distinct.
 */
export function useDomain<D, T extends DomainType = 'continuous'>(
  params: UseDomainParams<D, T>,
): Domain<T> {
  const { data, accessor, type = 'continuous' as T } = params;
  const result = extentWithMetrics(data, accessor, type);
  const kind = (params.type ?? 'continuous') as DomainType;

  if (result.metrics.isEmpty) {
    devWarn('EMPTY_DATA', 'useDomain', 'No valid values available to form a domain.', {
      length: data.length,
    });
  }
  if (result.metrics.skippedNan > 0) {
    devWarn('NAN_IN_DATA', 'useDomain', 'Some values were NaN, null, or undefined.', {
      skipped: result.metrics.skippedNan,
    });
  }
  if (result.metrics.clampedInfinite > 0) {
    devWarn('INFINITE_VALUE', 'useDomain', 'Some values were infinite and were excluded.', {
      clamped: result.metrics.clampedInfinite,
    });
  }

  const next = result.domain as Domain<T>;
  const ref = useRef<Domain<T>>(next);
  if (!domainEqual(ref.current, next, kind)) {
    ref.current = next;
  }

  return useStructuralMemo(ref.current, 1) as Domain<T>;
}
