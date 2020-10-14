import React from 'react';
import { PositionScale } from '@visx/shape/lib/types';
import BaseBarGroup, { BaseBarGroupProps } from './BaseBarGroup';
import Bars from './Bars';

export default function BarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
>({ ...props }: Omit<BaseBarGroupProps<XScale, YScale>, 'BarsComponent'>) {
  return <BaseBarGroup<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
