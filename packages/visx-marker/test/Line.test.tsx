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
import { MarkerLine, Marker } from '../src';

const Wrapper = (restProps = {}) => shallow(<MarkerLine id="marker-line-test" {...restProps} />);

describe('<MarkerLine />', () => {
  test('it should be defined', () => {
    expect(MarkerLine).toBeDefined();
  });

  test('it should render a <Marker> containing a <rect>', () => {
    const marker = Wrapper().find(Marker);
    const rect = marker.dive().find('rect');
    expect(marker).toHaveLength(1);
    expect(rect).toHaveLength(1);
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const stroke = 'blue';
    const marker = Wrapper({ size, stroke, strokeWidth }).find(Marker);
    const rect = marker.dive().find('rect');
    const max = Math.max(size, strokeWidth * 2);
    const midX = max / 2;
    const midY = size / 2;
    expect(marker.prop('markerWidth')).toEqual(max);
    expect(marker.prop('markerHeight')).toEqual(size);
    expect(marker.prop('refX')).toEqual(midX);
    expect(marker.prop('refY')).toEqual(midY);
    expect(marker.prop('fill')).toEqual(stroke);
    expect(rect.prop('width')).toEqual(strokeWidth);
    expect(rect.prop('height')).toEqual(size);
    expect(rect.prop('x')).toEqual(midX);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
