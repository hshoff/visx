import type { CSSProperties } from 'react';

/**
 * Parse a CSS line-height value to pixels for Pretext layout.
 * Handles: '1em', '1.5em', '20px', '24', numbers.
 */
export default function parseLineHeight(
  lineHeight: string | number,
  style?: CSSProperties,
): number {
  if (typeof lineHeight === 'number') return lineHeight;

  const trimmed = String(lineHeight).trim();
  const num = parseFloat(trimmed);

  if (Number.isNaN(num)) {
    return 16;
  }

  if (trimmed.endsWith('em')) {
    const fontSize = style?.fontSize
      ? typeof style.fontSize === 'number'
        ? style.fontSize
        : parseFloat(String(style.fontSize))
      : 16;
    const base = Number.isFinite(fontSize) ? fontSize : 16;
    return num * base;
  }

  if (trimmed.endsWith('px')) {
    return num;
  }

  // Bare number — treat as multiplier of default 16px body size (matches common CSS semantics)
  const base = 16;
  return num * base;
}
