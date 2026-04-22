import type { CSSProperties } from 'react';

/**
 * Converts a React CSS style object to a CSS font shorthand string
 * for use with Pretext's prepare() / Canvas measureText().
 *
 * Format: [style] [variant] [weight] [size[/line-height]] family
 * Example: "italic bold 16px Inter"
 */
export default function buildFontString(style?: CSSProperties): string {
  if (!style) return '16px sans-serif';

  const parts: string[] = [];

  if (style.fontStyle) parts.push(String(style.fontStyle));
  if (style.fontVariant) parts.push(String(style.fontVariant));
  if (style.fontWeight) parts.push(String(style.fontWeight));

  // Font size — default to 16px if not specified
  const fontSize = style.fontSize
    ? typeof style.fontSize === 'number'
      ? `${style.fontSize}px`
      : String(style.fontSize)
    : '16px';
  parts.push(fontSize);

  // Font family — default to sans-serif
  const fontFamily = style.fontFamily || 'sans-serif';
  parts.push(String(fontFamily));

  return parts.join(' ');
}
