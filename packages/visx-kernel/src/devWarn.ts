/** @internal Warning codes; extended as primitives emit new warnings. */
export type WarnCode =
  | 'EMPTY_DATA'
  | 'NAN_IN_DATA'
  | 'INFINITE_VALUE'
  | 'NEGATIVE_DIMENSION'
  | 'MISSING_DIMENSIONS';

export type WarnHandler = (code: WarnCode, hook: string, message: string, detail?: unknown) => void;

function defaultWarn(code: WarnCode, hook: string, message: string, detail?: unknown): void {
  const prefix = `[@visx/${hook}] ${message}`;
  if (detail === undefined) {
    console.warn(prefix);
  } else {
    console.warn(prefix, detail);
  }
}

let warnHandler: WarnHandler = defaultWarn;

const seen = new Set<string>();

/** @internal Clears dedupe keys between test cases. */
export function resetWarnDedupeForTests(): void {
  seen.clear();
}

/**
 * Experimental: replace the default warning sink (e.g. in tests). Not intended as a
 * long-lived extension point for third-party diagnostics.
 */
export function setWarnHandler(fn: WarnHandler | null | undefined): void {
  if (fn) {
    warnHandler = fn;
  } else {
    warnHandler = defaultWarn;
  }
}

/**
 * @internal Development-only warnings; stripped in production builds.
 */
export function devWarn(code: WarnCode, hook: string, message: string, detail?: unknown): void {
  if (process.env.NODE_ENV === 'production') return;
  const key = `${code}\0${hook}`;
  if (seen.has(key)) return;
  seen.add(key);
  warnHandler(code, hook, message, detail);
}
