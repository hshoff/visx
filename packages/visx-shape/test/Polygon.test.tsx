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

import { Polygon } from '../src';
import { PolygonProps } from '../src/shapes/Polygon';

const PolygonWrapper = (restProps = {}) => shallow(<Polygon size={10} sides={6} {...restProps} />);
const PolygonChildren = ({ children, ...restProps }: Partial<PolygonProps>) =>
  shallow(
    <Polygon size={10} sides={6} {...restProps}>
      {children}
    </Polygon>,
  );

describe('<Polygon />', () => {
  it('should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  it('should render an octagon', () => {
    const wrapper = PolygonWrapper({ sides: 8, size: 25 });
    const polygon = wrapper.find('polygon');
    const points = polygon.props().points!.split(' ');
    expect(points).toHaveLength(8);
  });

  it('should add classname', () => {
    const wrapper = PolygonWrapper({ sides: 6, size: 25, className: 'a-polygon' });
    expect(wrapper.prop('className')).toBe('visx-polygon a-polygon');
  });

  it('should add onClick handler', () => {
    const fn = jest.fn();
    const wrapper = PolygonWrapper({
      sides: 6,
      size: 25,
      className: 'a-polygon',
      onClick: fn,
    });
    wrapper.simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    PolygonChildren({ children: fn, sides: 8, size: 25 });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { points }', () => {
    const fn = jest.fn();
    PolygonChildren({ children: fn, sides: 8, size: 25 });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('points');
    expect(args.points).toHaveLength(8);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
