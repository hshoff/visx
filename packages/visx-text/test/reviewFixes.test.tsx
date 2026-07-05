import React from 'react';
import { render, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as pretext from '@chenglou/pretext';
import { Text, clearPretextCache, clearStringWidthCache, useText } from '../src';

describe('code review regressions', () => {
  it('scaleToFit transform is correct on first render (useLayoutEffect prepare)', () => {
    const { result } = renderHook(() =>
      useText({
        width: 30,
        scaleToFit: 'shrink-only',
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    expect(result.current.transform).toBe('matrix(0.125, 0, 0, 0.125, 0, 0)');
  });

  it('does not apply scaleToFit matrix before measurement is ready', () => {
    const prepareSpy = vi
      .spyOn(pretext, 'prepareWithSegments')
      .mockImplementation(() => {
        throw new Error('canvas unavailable');
      });

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useText({
        width: 30,
        scaleToFit: true,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    expect(result.current.transform).toBe('');
    expect(warnSpy).toHaveBeenCalled();

    prepareSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('renders an empty text node when children is null', () => {
    const { container } = render(
      <Text x={0} y={0}>
        {null}
      </Text>,
    );
    expect(container.querySelector('text')).not.toBeNull();
    expect(container.querySelector('tspan')).not.toBeNull();
  });

  it('renders an empty tspan when children is an empty string', () => {
    const { container } = render(<Text x={0} y={0}>{''}</Text>);
    expect(container.querySelector('tspan')?.textContent).toBe('');
  });

  it('preserves non-breaking spaces in wrapped output', async () => {
    const nbspText = `hello\u00A0world\u00A0again again again`;
    const { result } = renderHook(() =>
      useText({
        width: 80,
        style: { fontFamily: 'sans-serif', fontSize: 14 },
        children: nbspText,
      }),
    );

    await waitFor(() => {
      const rendered = result.current.wordsByLines.map((l) => l.text ?? l.words.join(' ')).join('');
      expect(rendered).toContain('\u00A0');
    });
  });

  it('uses fontSize prop for measurement when style is omitted', () => {
    const { result } = renderHook(() =>
      useText({
        width: 200,
        fontSize: 32,
        fontFamily: 'Courier',
        children: 'This is really long text',
      }),
    );

    expect(result.current.wordsByLines[0]?.width).toBeDefined();
  });

  it('exposes cache clear helpers', () => {
    expect(clearPretextCache).toBeTypeOf('function');
    expect(clearStringWidthCache).toBeTypeOf('function');
    clearPretextCache();
    clearStringWidthCache();
  });
});
