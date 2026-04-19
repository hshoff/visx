/** Builds `var(--name, fallback)` with optional nested fallbacks. */
export function cssVar(name: string, fallback: string): string {
  return `var(${name}, ${fallback})`;
}
