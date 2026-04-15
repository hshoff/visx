import { createRoot } from 'react-dom/client';
import { ParentSize } from '@visx/responsive';

import Example from './example';
import './sandbox-styles.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
);
