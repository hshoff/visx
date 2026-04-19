/** Resolves a datum to a value used for scales and domains (single-key strings or functions). */
export type Accessor<D, V = unknown> = string | ((d: D) => V);
