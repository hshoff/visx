import React from 'react';
import PropTypes from 'prop-types';
import ClipPath from './ClipPath';

CircleClipPath.propTypes = {
  id: PropTypes.string.isRequired,
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number
};

export default function CircleClipPath({ id, cx, cy, r, ...restProps }) {
  return (
    <ClipPath id={id}>
      <circle cx={cx} cy={cy} r={r} {...restProps} />
    </ClipPath>
  );
}
