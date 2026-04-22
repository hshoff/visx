'use client';

import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';
import type { CSSProperties } from 'react';
import buildFontString from './buildFontString';

const cache = new Map<string, number>();

/** Clears the module-level width cache used by {@link getStringWidth}. */
export function clearStringWidthCache() {
  cache.clear();
}

/**
 * Measures the rendered width of a string.
 *
 * Uses Pretext's Canvas-based measurement instead of DOM
 * `getComputedTextLength()`. The function is synchronous and requires a
 * browser environment (Canvas API or OffscreenCanvas).
 *
 * @returns width in pixels, or null if measurement is unavailable
 */
export default function getStringWidth(str: string, style?: CSSProperties): number | null {
  if (typeof str !== 'string' || !str) return null;

  const fontString = buildFontString(style);
  const cacheKey = `${str}\0${fontString}`;

  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  try {
    const prepared = prepareWithSegments(str, fontString);
    const width = measureNaturalWidth(prepared);
    cache.set(cacheKey, width);
    return width;
  } catch {
    return null;
  }
}
