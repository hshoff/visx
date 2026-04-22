'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  prepareWithSegments,
  layoutWithLines,
  type PreparedTextWithSegments,
  type LayoutLine,
} from '@chenglou/pretext';
import reduceCSSCalc from 'reduce-css-calc';
import type { CSSProperties } from 'react';
import type { TextProps, WordsWithWidth } from '../types';
import buildFontString from '../util/buildFontString';
import parseLineHeight from '../util/parseLineHeight';

function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

function isXOrYInValid(xOrY: string | number | undefined) {
  return (typeof xOrY === 'number' && Number.isFinite(xOrY)) || typeof xOrY === 'string';
}

const WORD_SPLIT_RE = /(?:(?!\u00A0+)\s+)/;

function splitWordsForTspan(lineText: string): string[] {
  return lineText.split(WORD_SPLIT_RE);
}

export default function useText(props: TextProps): {
  wordsByLines: WordsWithWidth[];
  startDy: string;
  transform: string;
} {
  const {
    verticalAnchor = 'end',
    scaleToFit = false,
    angle,
    width,
    lineHeight = '1em',
    capHeight = '0.71em',
    children,
    style,
    fontSize,
    fontFamily,
    ...textProps
  } = props;

  const { x = 0, y = 0 } = textProps;
  const isXOrYNotValid = !isXOrYInValid(x) || !isXOrYInValid(y);

  const textContent = children == null ? '' : children.toString();

  const measurementStyle = useMemo((): CSSProperties => {
    const merged: CSSProperties = { ...(style ?? {}) };
    if (fontSize !== undefined) merged.fontSize = fontSize;
    if (fontFamily !== undefined) merged.fontFamily = fontFamily;
    return merged;
  }, [style, fontSize, fontFamily]);

  const fontString = useMemo(() => buildFontString(measurementStyle), [measurementStyle]);

  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);

  useEffect(() => {
    if (!textContent) {
      setPrepared(null);
      return;
    }

    let cancelled = false;

    try {
      const handle = prepareWithSegments(textContent, fontString);
      if (!cancelled) {
        setPrepared(handle);
      }
    } catch {
      if (!cancelled) {
        setPrepared(null);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [textContent, fontString]);

  const wordsByLines = useMemo((): WordsWithWidth[] => {
    if (isXOrYNotValid || !textContent) {
      return [];
    }

    // SSR / first client render: no prepared handle yet → single-line fallback
    if (!prepared) {
      return [{ words: textContent.split(WORD_SPLIT_RE), width: undefined }];
    }

    if (!width && !scaleToFit) {
      return [{ words: textContent.split(WORD_SPLIT_RE), width: undefined }];
    }

    // When scaleToFit is set, legacy behavior keeps the entire string on one line
    // and applies a matrix() so that line fits `width`; wrapping is disabled.
    const maxWidth = width == null || scaleToFit ? Number.POSITIVE_INFINITY : width;
    const lineHeightPx = parseLineHeight(lineHeight, measurementStyle);
    const { lines } = layoutWithLines(prepared, maxWidth, lineHeightPx);

    return lines.map((line: LayoutLine) => ({
      words: splitWordsForTspan(line.text),
      width: line.width,
    }));
  }, [isXOrYNotValid, textContent, prepared, width, scaleToFit, lineHeight, measurementStyle]);

  const startDy = useMemo(() => {
    if (isXOrYNotValid) return '';
    if (verticalAnchor === 'start') {
      return reduceCSSCalc(`calc(${capHeight})`);
    }
    if (verticalAnchor === 'middle') {
      return reduceCSSCalc(
        `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`,
      );
    }
    return reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
  }, [isXOrYNotValid, verticalAnchor, capHeight, wordsByLines.length, lineHeight]);

  const transform = useMemo(() => {
    const transforms: string[] = [];
    if (isXOrYNotValid) return '';

    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      const lineWidth = wordsByLines[0].width || 1;
      const sx = scaleToFit === 'shrink-only' ? Math.min(width / lineWidth, 1) : width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }

    if (angle) {
      transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }

    return transforms.length > 0 ? transforms.join(' ') : '';
  }, [isXOrYNotValid, x, y, width, scaleToFit, wordsByLines, angle]);

  return { wordsByLines, startDy, transform };
}
