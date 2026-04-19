import type { Accessor } from '../accessor/types';

export type DomainType = 'continuous' | 'time' | 'ordinal';

export type Domain<T extends DomainType> = T extends 'continuous'
  ? [number, number]
  : T extends 'time'
  ? [Date, Date]
  : string[];

export interface UseDomainParams<D, T extends DomainType> {
  readonly data: readonly D[];
  accessor: Accessor<D>;
  type?: T;
}

export interface ExtentMetrics {
  /** Values that were `NaN`, `null`, or `undefined`. */
  skippedNan: number;
  /** Values that were `Infinity` or `-Infinity` (excluded from extent). */
  clampedInfinite: number;
  /** True when no valid samples were available to compute the domain. */
  isEmpty: boolean;
}
