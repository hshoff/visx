/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Text, getStringWidth } from '../src';

describe('SSR', () => {
  it('getStringWidth returns null without Canvas', () => {
    expect(getStringWidth('hello', { fontSize: 16 })).toBeNull();
  });

  it('renderToString produces valid markup without Infinity', () => {
    const html = renderToString(
      <Text x={0} y={0} width={100}>
        Hello world this is long enough to wrap on the client
      </Text>,
    );
    expect(html).toContain('<svg');
    expect(html).toContain('Hello world');
    expect(html).not.toContain('Infinity');
  });

  it('handles numeric children on the server', () => {
    const html = renderToString(
      <Text x={0} y={0} width={30}>
        {0}
      </Text>,
    );
    expect(html).toContain('0');
    expect(html).not.toContain('Infinity');
  });
});
