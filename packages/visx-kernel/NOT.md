# Non-goals and deferrals (@visx/kernel v1)

These are explicitly **not** part of the initial `@visx/kernel` release. They may land in 1.1+ with separate design review.

- Deep equality, cycle detection, or custom comparators in structural memoization
- Dotted path accessors (`"a.b"`) or indexed paths (`"items[0]"`"); only single string keys
- Symbol-key accessors for string normalization
- Collapsing `useDomain` domain-shape types with `useScale` implementation types (they stay distinct)
- `nice`, `padding`, `includeZero`, `filter`, and `INVERTED_DOMAIN` warnings on domains
- Perf-style or “inline options object” warnings
- Byte-for-byte d3-path / d3-scale parity; d3 is inspiration only
- Branded path string types
- `arcTo` on `PathBuilder` until Tier 1 `arcPath` integration (Phase 6)
