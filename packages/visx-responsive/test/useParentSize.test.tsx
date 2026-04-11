import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import type { ResizeObserver as ResizeObserverType } from '../src/types';
import useParentSize from '../src/hooks/useParentSize';

type ROEntry = { contentRect: { left: number; top: number; width: number; height: number } };
type ROCallback = (entries: ROEntry[], observer: ResizeObserverType) => void;

/** Fires synchronously on observe with deterministic dimensions (jsdom layout is often 0×0). */
class ImmediateResizeObserver implements ResizeObserverType {
  constructor(private readonly callback: ROCallback) {}

  observe() {
    this.callback(
      [
        {
          contentRect: { left: 0, top: 0, width: 400, height: 200 },
        },
      ],
      this,
    );
  }

  unobserve() {}

  disconnect() {}

  static toString() {
    return 'ResizeObserver';
  }
}

function SizedContainer() {
  const { parentRef, width, height } = useParentSize({
    resizeObserverPolyfill: ImmediateResizeObserver,
    debounceTime: 0,
  });

  return (
    <div style={{ width: 400, height: 200 }}>
      <div ref={parentRef} data-testid="target" style={{ width: '100%', height: '100%' }} />
      <span data-testid="dims">
        {width}x{height}
      </span>
    </div>
  );
}

describe('useParentSize', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('measures the parent after the ref attaches (not stuck at 0×0)', async () => {
    render(<SizedContainer />);

    await waitFor(() => {
      expect(screen.getByTestId('dims').textContent).toBe('400x200');
    });
  });
});
