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

import { scaleLinear } from '@visx/scale';
import { GridPolar } from '../src';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scaleAngle: scaleLinear({ range: [1, 100], domain: [1, 10] }),
  scaleRadial: scaleLinear({ range: [1, 100], domain: [1, 10] }),
};

describe('<GridPolar />', () => {
  it('should be defined', () => {
    expect(GridPolar).toBeDefined();
  });

  it('should render with class .visx-grid-polar', () => {
    const { container } = render(
      <svg>
        <GridPolar {...gridProps} />
      </svg>,
    );
    expect(container.querySelector('.visx-grid-polar')).toBeTruthy();
  });

  it('should render both angle and radial grid lines', () => {
    const { container } = render(
      <svg>
        <GridPolar {...gridProps} />
      </svg>,
    );

    // Look for actual rendered lines rather than mocked components
    const lines = container.querySelectorAll('line');
    const arcs = container.querySelectorAll('path'); // radial grids are rendered as arcs/paths

    expect(lines.length).toBeGreaterThan(0); // Should have some angle lines
    expect(arcs.length).toBeGreaterThan(0); // Should have some radial lines
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
