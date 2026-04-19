/**
 * Format a number for SVG path output: fixed precision with trailing zeros stripped.
 * Avoids scientific notation for typical chart magnitudes (1e-4 … 1e7).
 */
export function formatNumber(n: number, precision = 3): string {
  if (!Number.isFinite(n)) {
    if (Number.isNaN(n)) return 'NaN';
    return n > 0 ? 'Infinity' : '-Infinity';
  }

  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e7)) {
    return String(n);
  }

  const fixed = n.toFixed(precision);
  if (!fixed.includes('.')) return fixed;
  return fixed.replace(/\.?0+$/, '');
}
