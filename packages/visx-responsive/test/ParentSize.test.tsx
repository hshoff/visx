import React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { render } from '@testing-library/react';
import { ParentSize } from '../src';

describe('<ParentSize />', () => {
  it('should be defined', () => {
    expect(ParentSize).toBeDefined();
  });
  it('does not throw', () => {
    const wrapper = render(
      <ParentSize resizeObserverPolyfill={ResizeObserver}>
        {() => <div data-testid="test" />}
      </ParentSize>,
    );
    expect(wrapper.findByTestId('test')).not.toBeNull();
  });
  it('defaults to outer overflow clip and inner absolute measurement layer', () => {
    const { container } = render(
      <ParentSize resizeObserverPolyfill={ResizeObserver}>
        {() => <div data-testid="child" />}
      </ParentSize>,
    );
    const outer = container.firstElementChild as HTMLElement;
    const inner = outer.firstElementChild as HTMLElement;
    expect(outer.style.position).toBe('relative');
    expect(outer.style.overflow).toBe('hidden');
    expect(inner.style.position).toBe('absolute');
    expect(inner.contains(container.querySelector('[data-testid="child"]'))).toBe(true);
  });
});
