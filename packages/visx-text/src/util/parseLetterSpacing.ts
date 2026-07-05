import type { CSSProperties } from 'react';
import { getFontSizePx } from './parseLineHeight';

/**
 * Parse letter-spacing to pixels for Pretext prepare options.
 */
export default function parseLetterSpacing(
  letterSpacing: CSSProperties['letterSpacing'],
  style?: CSSProperties,
): number | undefined {
  if (letterSpacing === undefined) return undefined;
  if (typeof letterSpacing === 'number') return letterSpacing;

  const trimmed = String(letterSpacing).trim();
  const num = parseFloat(trimmed);
  if (Number.isNaN(num)) return undefined;

  if (trimmed.endsWith('px')) return num;
  if (trimmed.endsWith('em')) return num * getFontSizePx(style);
  if (trimmed.endsWith('rem')) return num * 16;

  return num;
}
