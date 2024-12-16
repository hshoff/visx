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
import { feature } from 'topojson-client';
// eslint-disable-next-line import/no-unresolved
import { GeometryCollection } from 'geojson';

import Projection from '../src/projections/Projection';
// @ts-expect-error doesn't like .json
import topology from './topo.json';

describe('<Projection />', () => {
  // TopoJSON with two polygons
  // @ts-expect-error @TODO get this to method overload properly
  const data: GeometryCollection[] = feature(topology, topology.objects.collection).features;
  const props = { data };

  test('it should be defined', () => {
    expect(Projection).toBeDefined();
  });

  test('it should pass className', () => {
    const wrapper = shallow(<Projection className="visx-new" {...props} />);
    expect(wrapper.find('path').get(0).props.className).toBe('visx-geo-mercator visx-new');
  });

  test('it should create two paths', () => {
    const wrapper = shallow(<Projection {...props} />);
    expect(wrapper.find('path')).toHaveLength(2);
  });

  test('it should pass prop to path', () => {
    const wrapper = shallow(<Projection stroke="red" {...props} />);
    expect(wrapper.find('path').get(0).props.stroke).toBe('red');
    expect(wrapper.find('path').get(1).props.stroke).toBe('red');
  });

  test('it should call projectionFunc prop function', () => {
    const projectionFunc = jest.fn();
    shallow(<Projection projectionFunc={projectionFunc} {...props} />);
    expect(projectionFunc).toHaveBeenCalledTimes(1);
  });

  test('it should call centroid prop function', () => {
    const centroid = jest.fn();
    shallow(<Projection centroid={centroid} {...props} />);
    expect(centroid).toHaveBeenCalledTimes(2);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
