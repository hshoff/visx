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
import { scaleLinear } from '@visx/scale';

import { Legend, LegendLabel } from '../src';

const defaultProps = {
  scale: scaleLinear<number>({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<Legend />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(Legend).toBeDefined();
  });

  test('it should default style to display: flex, flex-direction: column', () => {
    const { container } = render(<Legend {...defaultProps} />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('flex');
    expect(legend.style.flexDirection).toBe('column');
  });

  test('it should extend style prop', () => {
    const { container } = render(<Legend {...defaultProps} style={{ display: 'block' }} />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('block');
    expect(legend.style.flexDirection).toBe('column');
  });

  test('it should pass through direction prop to style prop', () => {
    const { container } = render(<Legend {...defaultProps} direction="row" />);
    const legend = container.firstChild as HTMLElement;
    expect(legend.style.display).toBe('flex');
    expect(legend.style.flexDirection).toBe('row');
  });

  test('it should pass through legendLabelProps to legend labels', () => {
    const style = { fontFamily: 'Comic Sans MS' };
    const { container } = render(
      <Legend {...defaultProps} legendLabelProps={{ style }} />,
    );
    
    const labelElement = container.querySelector('[style*="font-family: Comic Sans MS"]');
    expect(labelElement).not.toBeNull();
    expect(labelElement).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
