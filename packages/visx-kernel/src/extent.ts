import type { Accessor } from './accessor/types';
import type { Domain, DomainType, ExtentMetrics } from './domain/types';
import { normalizeAccessor } from './normalizeAccessor';

export interface ExtentResult<T extends DomainType> {
  domain: Domain<T>;
  metrics: ExtentMetrics;
}

function extentContinuous<D>(
  data: readonly D[],
  get: (d: D) => unknown,
): ExtentResult<'continuous'> {
  let min = Infinity;
  let max = -Infinity;
  let skippedNan = 0;
  let clampedInfinite = 0;
  let sawFinite = false;

  for (const datum of data) {
    const v = get(datum);
    if (v === null || v === undefined || (typeof v === 'number' && Number.isNaN(v))) {
      skippedNan += 1;
    } else {
      const n = typeof v === 'number' ? v : Number(v);
      if (Number.isNaN(n)) {
        skippedNan += 1;
      } else if (n === Infinity || n === -Infinity) {
        clampedInfinite += 1;
      } else {
        sawFinite = true;
        if (n < min) min = n;
        if (n > max) max = n;
      }
    }
  }

  if (!sawFinite || min === Infinity || max === -Infinity) {
    return {
      domain: [0, 1],
      metrics: { skippedNan, clampedInfinite, isEmpty: true },
    };
  }
  return {
    domain: [min, max],
    metrics: { skippedNan, clampedInfinite, isEmpty: false },
  };
}

function extentTime<D>(data: readonly D[], get: (d: D) => unknown): ExtentResult<'time'> {
  let minT = Infinity;
  let maxT = -Infinity;
  let skippedNan = 0;
  let clampedInfinite = 0;
  let sawValid = false;

  for (const datum of data) {
    const v = get(datum);
    if (v === null || v === undefined) {
      skippedNan += 1;
    } else if (v instanceof Date) {
      const t = v.getTime();
      if (Number.isNaN(t)) {
        skippedNan += 1;
      } else {
        sawValid = true;
        if (t < minT) minT = t;
        if (t > maxT) maxT = t;
      }
    } else if (typeof v === 'number') {
      const t = v;
      if (Number.isNaN(t)) {
        skippedNan += 1;
      } else if (t === Infinity || t === -Infinity) {
        clampedInfinite += 1;
      } else {
        sawValid = true;
        if (t < minT) minT = t;
        if (t > maxT) maxT = t;
      }
    } else {
      skippedNan += 1;
    }
  }

  if (!sawValid || minT === Infinity || maxT === -Infinity) {
    return {
      domain: [new Date(0), new Date(1)],
      metrics: { skippedNan, clampedInfinite, isEmpty: true },
    };
  }
  return {
    domain: [new Date(minT), new Date(maxT)],
    metrics: { skippedNan, clampedInfinite, isEmpty: false },
  };
}

function extentOrdinal<D>(data: readonly D[], get: (d: D) => unknown): ExtentResult<'ordinal'> {
  const seen = new Set<string>();
  const order: string[] = [];
  let skippedNan = 0;
  const clampedInfinite = 0;

  for (const datum of data) {
    const v = get(datum);
    if (v === null || v === undefined) {
      skippedNan += 1;
    } else if (typeof v !== 'string') {
      skippedNan += 1;
    } else if (!seen.has(v)) {
      seen.add(v);
      order.push(v);
    }
  }

  const isEmpty = order.length === 0;
  return {
    domain: order,
    metrics: { skippedNan, clampedInfinite, isEmpty },
  };
}

/** @internal */
export function extentWithMetrics<D, T extends DomainType>(
  data: readonly D[],
  accessor: Accessor<D>,
  type: T,
): ExtentResult<T> {
  const get = normalizeAccessor(accessor);
  if (type === 'continuous') {
    return extentContinuous(data, get) as ExtentResult<T>;
  }
  if (type === 'time') {
    return extentTime(data, get) as ExtentResult<T>;
  }
  return extentOrdinal(data, get) as ExtentResult<T>;
}

/**
 * Single-pass extent for continuous, time, or ordinal domains.
 */
export function extent<D, T extends DomainType>(
  data: readonly D[],
  accessor: Accessor<D>,
  type: T,
): Domain<T> {
  return extentWithMetrics(data, accessor, type).domain;
}
