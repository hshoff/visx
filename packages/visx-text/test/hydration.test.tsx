import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { Text } from '../src';

describe('hydration', () => {
  it('starts as a single line then wraps after client prepare', async () => {
    const props = {
      x: 0 as const,
      y: 0 as const,
      width: 200,
      style: { fontFamily: 'Courier' } as const,
      children: 'This is really long text' as const,
    };

    const markup = renderToString(<Text {...props} />);
    const host = document.createElement('div');
    host.innerHTML = markup;
    const svg = host.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg!.querySelectorAll('tspan')).toHaveLength(1);

    // Hydrate the container that wraps the server HTML (matches typical SSR + root pattern)
    hydrateRoot(host, <Text {...props} />);

    await waitFor(() => {
      expect(host.querySelectorAll('tspan').length).toBeGreaterThanOrEqual(2);
    });
  });

  it('client render wraps when width is constrained', async () => {
    const props = {
      x: 0 as const,
      y: 0 as const,
      width: 200,
      style: { fontFamily: 'Courier' } as const,
      children: 'This is really long text' as const,
    };

    const { container } = render(<Text {...props} />);

    await waitFor(() => {
      expect(container.querySelectorAll('tspan').length).toBeGreaterThanOrEqual(2);
    });
  });
});
