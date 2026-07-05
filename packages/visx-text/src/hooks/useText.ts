'use client';

import { useLayoutEffect, useMemo, useState } from 'react';
import {
  prepareWithSegments,
  layoutWithLines,
  type PreparedTextWithSegments,
  type LayoutLine,
  type PrepareOptions,
} from '@chenglou/pretext';
import reduceCSSCalc from 'reduce-css-calc';
import type { CSSProperties } from 'react';
import type { TextProps, WordsWithWidth } from '../types';
import buildFontString from '../util/buildFontString';
import parseLineHeight from '../util/parseLineHeight';
import parseLetterSpacing from '../util/parseLetterSpacing';

function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

function isXOrYInValid(xOrY: string | number | undefined) {
  return (typeof xOrY === 'number' && Number.isFinite(xOrY)) || typeof xOrY === 'string';
}

const WORD_SPLIT_RE = /(?:(?!\u00A0+)\s+)/;

function unmeasuredLine(
  textContent: string,
  children: TextProps['children'],
): WordsWithWidth[] {
  if (children == null) {
    return [{ words: [], width: undefined }];
  }
  if (textContent === '') {
    return [{ words: [''], width: undefined, text: '' }];
  }
  return [
    {
      words: textContent.split(WORD_SPLIT_RE),
      width: undefined,
      text: textContent,
    },
  ];
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

  const { x = 0, y = 0, fontWeight, fontStyle, letterSpacing } = textProps;
  const isXOrYNotValid = !isXOrYInValid(x) || !isXOrYInValid(y);

  const textContent = children == null ? '' : children.toString();

  const measurementStyle = useMemo((): CSSProperties => {
    const merged: CSSProperties = { ...(style ?? {}) };
    if (fontSize !== undefined) merged.fontSize = fontSize;
    if (fontFamily !== undefined) merged.fontFamily = fontFamily;
    if (fontWeight !== undefined) merged.fontWeight = fontWeight;
    if (fontStyle !== undefined) merged.fontStyle = fontStyle;
    if (letterSpacing !== undefined) merged.letterSpacing = letterSpacing;
    return merged;
  }, [style, fontSize, fontFamily, fontWeight, fontStyle, letterSpacing]);

  const fontString = useMemo(() => buildFontString(measurementStyle), [measurementStyle]);

  const prepareOptions = useMemo((): PrepareOptions | undefined => {
    const spacing = parseLetterSpacing(measurementStyle.letterSpacing, measurementStyle);
    return spacing !== undefined ? { letterSpacing: spacing } : undefined;
  }, [measurementStyle]);

  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);

  useLayoutEffect(() => {
    if (children == null || textContent === '') {
      setPrepared(null);
      return;
    }

    let cancelled = false;

    try {
      const handle = prepareWithSegments(textContent, fontString, prepareOptions);
      if (!cancelled) {
        setPrepared(handle);
      }
    } catch (error) {
      if (!cancelled) {
        setPrepared(null);
        console.warn('@visx/text: text measurement unavailable', error);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [children, textContent, fontString, prepareOptions]);

  const wordsByLines = useMemo((): WordsWithWidth[] => {
    if (isXOrYNotValid) {
      return [];
    }

    if (children == null || textContent === '') {
      return unmeasuredLine(textContent, children);
    }

    if (!prepared) {
      return unmeasuredLine(textContent, children);
    }

    if (!width && !scaleToFit) {
      return unmeasuredLine(textContent, children);
    }

    const maxWidth = width == null || scaleToFit ? Number.POSITIVE_INFINITY : width;
    const lineHeightPx = parseLineHeight(lineHeight, measurementStyle);
    const { lines } = layoutWithLines(prepared, maxWidth, lineHeightPx);

    return lines.map((line: LayoutLine) => ({
      words: line.text.split(WORD_SPLIT_RE),
      text: line.text,
      width: line.width,
    }));
  }, [
    isXOrYNotValid,
    children,
    textContent,
    prepared,
    width,
    scaleToFit,
    lineHeight,
    measurementStyle,
  ]);

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

    if (
      isNumber(x) &&
      isNumber(y) &&
      isNumber(width) &&
      scaleToFit &&
      prepared &&
      wordsByLines.length > 0
    ) {
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
  }, [isXOrYNotValid, x, y, width, scaleToFit, prepared, wordsByLines, angle]);

  return { wordsByLines, startDy, transform };
}
