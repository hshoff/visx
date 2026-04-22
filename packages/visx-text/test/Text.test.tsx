import React from 'react';
import { render, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text, getStringWidth, useText } from '../src';

describe('getStringWidth()', () => {
  it('should be defined', () => {
    expect(getStringWidth).toBeDefined();
  });

  it('returns a positive width in the browser environment', () => {
    const w = getStringWidth('hello', { fontSize: 16 });
    expect(w).not.toBeNull();
    expect(w! > 0).toBe(true);
  });
});

describe('<Text />', () => {
  it('should be defined', () => {
    expect(Text).toBeDefined();
  });

  it('Does not wrap long text if enough width', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 300,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    await waitFor(() => {
      expect(result.current.wordsByLines).toHaveLength(1);
    });
  });

  it('Wraps text if not enough width', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 200,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    await waitFor(() => {
      expect(result.current.wordsByLines).toHaveLength(2);
    });
  });

  it('Does not wrap text if there is enough width', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 300,
        style: { fontSize: '2em', fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );

    await waitFor(() => {
      expect(result.current.wordsByLines).toHaveLength(1);
    });
  });

  it('Does not perform word length calculation if width or scaleToFit props not set', () => {
    const {
      result: {
        current: { wordsByLines },
      },
    } = renderHook(() =>
      useText({
        children: 'This is really long text',
      }),
    );

    expect(wordsByLines).toHaveLength(1);
    expect(wordsByLines[0].width).toBeUndefined();
  });

  it('Render 0 success when specify the width', () => {
    const { container } = render(
      <Text x={0} y={0} width={30}>
        0
      </Text>,
    );

    const text = container.querySelector('tspan');
    expect(text?.textContent).toBe('0');
  });

  it('Render 0 success when not specify the width', () => {
    const { container } = render(
      <Text x={0} y={0}>
        0
      </Text>,
    );
    const text = container.querySelector('tspan');
    expect(text?.textContent).toBe('0');
  });

  it('Render text when x or y is a percentage', () => {
    const { container } = render(
      <Text x="50%" y="50%">
        anything
      </Text>,
    );
    const text = container.querySelector('tspan');
    expect(text?.textContent).toBe('anything');
  });

  it("Don't Render text when x or y is NaN", () => {
    const { container } = render(
      <Text x={NaN} y={10}>
        anything
      </Text>,
    );
    const text = container.querySelector('tspan');
    expect(text).toBeNull();
  });

  it('Render text when children 0 is a number', () => {
    const num = 0;
    const { container } = render(
      <Text x={0} y={0}>
        {num}
      </Text>,
    );

    const text = container.querySelector('tspan');
    expect(text?.textContent).toBe('0');
  });

  it('Applies transform if scaleToFit is set', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 300,
        scaleToFit: true,
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );
    await waitFor(() => {
      expect(result.current.transform).toBe('matrix(1.25, 0, 0, 1.25, 0, 0)');
    });
  });

  it("Does not scale above 1 when scaleToFit is set to 'shrink-only'", async () => {
    const { result } = renderHook(() =>
      useText({
        width: 300,
        scaleToFit: 'shrink-only',
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );
    await waitFor(() => {
      expect(result.current.transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
    });
  });

  it("Shrinks long text when scaleToFit is set to 'shrink-only'", async () => {
    const { result } = renderHook(() =>
      useText({
        width: 30,
        scaleToFit: 'shrink-only',
        style: { fontFamily: 'Courier' },
        children: 'This is really long text',
      }),
    );
    await waitFor(() => {
      expect(result.current.transform).toBe('matrix(0.125, 0, 0, 0.125, 0, 0)');
    });
  });

  it('Applies transform if angle is given', () => {
    const { container } = render(
      <Text width={300} angle={45} style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );

    const text = container.querySelector('text');
    expect(text).toHaveAttribute('transform', 'rotate(45, 0, 0)');
  });

  it('Offsets vertically if verticalAnchor is given', async () => {
    let { container } = render(
      <Text width={200} style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    );
    const getVerticalOffset = (c: HTMLElement) => c?.querySelector('tspan')?.getAttribute('dy');

    await waitFor(() => {
      expect(getVerticalOffset(container)).toBe('-1em');
    });

    ({ container } = render(
      <Text width={200} verticalAnchor="middle" style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    ));
    await waitFor(() => {
      expect(getVerticalOffset(container)).toBe('-0.145em');
    });

    ({ container } = render(
      <Text width={200} verticalAnchor="start" style={{ fontFamily: 'Courier' }}>
        This is really long text
      </Text>,
    ));
    await waitFor(() => {
      expect(getVerticalOffset(container)).toBe('0.71em');
    });
  });
});
