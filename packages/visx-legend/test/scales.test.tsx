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
import '@testing-library/jest-dom';
import { scaleBand, scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';

import {
  Legend,
  LegendLinear,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendQuantile,
} from '../src';

describe('Legend scales', () => {
  it('should render with scaleLinear', () => {
    const linearScale = scaleLinear<number>({
      domain: [0, 10],
      range: [1, 5, 10, 15, 20],
    });

    const { container: container1 } = render(<LegendLinear scale={linearScale} />);
    expect(container1).toBeInTheDocument();

    const { container: container2 } = render(<LegendSize scale={linearScale} />);
    expect(container2).toBeInTheDocument();

    const { container: container3 } = render(<Legend scale={linearScale} />);
    expect(container3).toBeInTheDocument();
  });

  it('should render with scaleOrdinal', () => {
    const ordinalScale = scaleOrdinal<string, string>({
      domain: ['a', 'b', 'c', 'd'],
      range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
    });

    const { container: container1 } = render(<LegendOrdinal scale={ordinalScale} />);
    expect(container1).toBeInTheDocument();

    const { container: container2 } = render(<Legend scale={ordinalScale} />);
    expect(container2).toBeInTheDocument();
  });

  it('should render with scaleBand', () => {
    const bandScale = scaleBand<string>({
      domain: ['a', 'b', 'c', 'd'],
      range: [1, 10],
    });

    const { container } = render(<Legend scale={bandScale} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with scaleThreshold', () => {
    const thresholdScale = scaleThreshold<number, string>({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    const { container: container1 } = render(<LegendThreshold scale={thresholdScale} />);
    expect(container1).toBeInTheDocument();

    const { container: container2 } = render(<Legend scale={thresholdScale} />);
    expect(container2).toBeInTheDocument();
  });

  it('should render with scaleQuantile', () => {
    const quantileScale = scaleQuantile<string>({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    const { container: container1 } = render(<LegendQuantile scale={quantileScale} />);
    expect(container1).toBeInTheDocument();

    const { container: container2 } = render(<Legend scale={quantileScale} />);
    expect(container2).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
