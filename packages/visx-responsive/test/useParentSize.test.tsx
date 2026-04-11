import React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import useParentSize from '../src/hooks/useParentSize';

describe('useParentSize', () => {
  it('merges an external ref so it receives the same element as parentRef', async () => {
    const external = { current: null as HTMLDivElement | null };

    function Merged() {
      const { parentRef } = useParentSize({
        resizeObserverPolyfill: ResizeObserver,
        ref: external,
      });
      return <div ref={parentRef} data-testid="node" />;
    }

    const { findByTestId } = render(<Merged />);
    const node = await findByTestId('node');
    expect(external.current).toBe(node);
  });

  it('observes the merged element via ResizeObserver when an external ref is passed', () => {
    let observed: Element | null = null;
    let callback: (entries: { contentRect: DOMRectReadOnly }[]) => void = () => {};

    function MockResizeObserver(cb: (entries: { contentRect: DOMRectReadOnly }[]) => void) {
      callback = cb;
      return {
        observe(el: Element) {
          observed = el;
        },
        disconnect() {},
      };
    }

    const external = { current: null as HTMLDivElement | null };

    function Observed() {
      const { parentRef, width } = useParentSize({
        resizeObserverPolyfill: MockResizeObserver as unknown as typeof ResizeObserver,
        debounceTime: 0,
        ref: external,
      });
      return (
        <div ref={parentRef} data-testid="node">
          {width}
        </div>
      );
    }

    render(<Observed />);
    const node = screen.getByTestId('node');

    expect(observed).toBe(node);
    expect(external.current).toBe(node);

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((fn) => {
      fn(0);
      return 0;
    });

    const contentRect: DOMRectReadOnly = {
      width: 300,
      height: 150,
      top: 2,
      left: 4,
      right: 304,
      bottom: 152,
      x: 4,
      y: 2,
      toJSON: () => '',
    };

    act(() => {
      callback([{ contentRect }]);
    });

    rafSpy.mockRestore();

    expect(node.textContent).toBe('300');
  });
});
