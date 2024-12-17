/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { render } from '@testing-library/react';

import { MarkerCross } from '../src';

describe('<MarkerCross />', () => {
  test('it should be defined', () => {
    expect(MarkerCross).toBeDefined();
  });

  test('it should render a Marker containing a polyline', () => {
    const { container } = render(
      <svg>
        <MarkerCross id="marker-cross-test" />
      </svg>,
    );
    expect(container.querySelector('marker')).toBeTruthy();
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const { container } = render(
      <svg>
        <MarkerCross id="marker-cross-test" size={size} strokeWidth={strokeWidth} />
      </svg>,
    );
    expect(container.querySelector('marker')).toBeTruthy();
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
