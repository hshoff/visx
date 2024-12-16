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
import { shallow } from 'enzyme';
import { scaleBand } from '@visx/scale';
import { BarStack } from '../src';

const scale = scaleBand({
  domain: [0, 100],
  range: [0, 100],
});

describe('<BarStack />', () => {
  test('it should be defined', () => {
    expect(BarStack).toBeDefined();
  });

  test('it should have className .visx-bar-stack', () => {
    const wrapper = shallow(
      <BarStack
        data={[]}
        top={2}
        left={3}
        x={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toBe('visx-bar-stack');
  });

  test('it should set className prop', () => {
    const wrapper = shallow(
      <BarStack
        className="test"
        data={[]}
        top={2}
        left={3}
        x={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toBe('visx-bar-stack test');
  });

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarStack
        className="test"
        data={[]}
        top={2}
        left={3}
        x={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('top')).toBe(2);
    expect(wrapper.prop('left')).toBe(3);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
