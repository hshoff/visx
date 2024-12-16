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
import { scaleLinear } from '@visx/scale';
import { AnimatedGridRows } from '../src';

describe('AnimatedGridRows', () => {
  it('should be defined', () => {
    expect(AnimatedGridRows).toBeDefined();
  });
  it('should not throw', () => {
    expect(() =>
      shallow(
        <AnimatedGridRows width={10} scale={scaleLinear({ domain: [0, 10], range: [0, 10] })} />,
      ),
    ).not.toThrow();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
