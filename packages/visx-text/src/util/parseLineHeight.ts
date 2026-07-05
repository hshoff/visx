import type { CSSProperties } from 'react';

/** Resolve font-size to pixels for relative unit conversion. */
export function getFontSizePx(style?: CSSProperties): number {
  if (!style?.fontSize) return 16;
  if (typeof style.fontSize === 'number') return style.fontSize;

  const trimmed = String(style.fontSize).trim();
  const num = parseFloat(trimmed);
  if (Number.isNaN(num)) return 16;

  if (trimmed.endsWith('px')) return num;
  if (trimmed.endsWith('rem')) return num * 16;
  if (trimmed.endsWith('em')) return num * 16;

  return num;
}

/**
 * Parse a CSS line-height value to pixels for Pretext layout.
 * Handles: '1em', '1.5em', '20px', '1.5', '150%', '1.2rem', '1.5lh'.
 */
export default function parseLineHeight(
  lineHeight: string | number,
  style?: CSSProperties,
): number {
  if (typeof lineHeight === 'number') return lineHeight;

  const trimmed = String(lineHeight).trim();
  const num = parseFloat(trimmed);

  if (Number.isNaN(num)) {
    return getFontSizePx(style);
  }

  const fontSize = getFontSizePx(style);

  if (trimmed.endsWith('em')) {
    return num * fontSize;
  }

  if (trimmed.endsWith('rem')) {
    return num * 16;
  }

  if (trimmed.endsWith('px')) {
    return num;
  }

  if (trimmed.endsWith('%')) {
    return (num / 100) * fontSize;
  }

  if (trimmed.endsWith('lh')) {
    return num * fontSize;
  }

  // Unitless multiplier relative to element font-size (CSS line-height semantics)
  return num * fontSize;
}
