'use client';

import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';
import type { CSSProperties } from 'react';
import buildFontString from './buildFontString';

const MAX_CACHE_SIZE = 2048;
const cache = new Map<string, number>();

/** Clears the module-level width cache used by {@link getStringWidth}. */
export function clearStringWidthCache() {
  cache.clear();
}

function setCachedWidth(key: string, width: number) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) {
      cache.delete(oldest);
    }
  }
  cache.set(key, width);
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
    setCachedWidth(cacheKey, width);
    return width;
  } catch (error) {
    console.warn('@visx/text: getStringWidth measurement unavailable', error);
    return null;
  }
}
