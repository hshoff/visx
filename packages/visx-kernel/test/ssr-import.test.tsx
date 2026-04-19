import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import * as kernel from '../src/index';

describe('SSR import smoke', () => {
  it('import namespace and renderToString', () => {
    expect(kernel.extent).toBeDefined();
    expect(kernel.useDomain).toBeDefined();
    expect(renderToString(<span />)).toBe('<span></span>');
  });
});
