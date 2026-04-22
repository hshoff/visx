# @visx/text

<a title="@visx/text npm downloads" href="https://www.npmjs.com/package/@visx/text">
  <img src="https://img.shields.io/npm/dm/@visx/text.svg?style=flat-square" />
</a>

The `@visx/text` provides a better SVG `<Text>` component with the following features

- Word-wrapping (when `width` prop is defined)
- Vertical alignment (`verticalAnchor` prop)
- Rotation (`angle` prop)
- Scale-to-fit text (`scaleToFit` prop)

## Server rendering (RSC / SSR)

This package is marked with the `'use client'` directive so it can be imported from React Server Components while the implementation runs on the client.

- **Server:** Text is emitted as a single unwrapped line (no Canvas measurement on the server). Output is valid SVG without `Infinity` transforms.
- **After hydration:** Line breaking is computed with [`@chenglou/pretext`](https://github.com/chenglou/pretext) (Canvas measurement once, then fast pure layout on width changes).

For pixel-identical wrapped output during SSR, use a Node Canvas implementation (for example `@napi-rs/canvas`) and run Pretext’s `prepareWithSegments` in that environment; that is an advanced integration, not the default.

Test environments without a working Canvas 2D context (plain jsdom) should stub `HTMLCanvasElement.prototype.getContext('2d')` or install a canvas polyfill. Pretext also exposes `clearCache()` (re-exported as `clearPretextCache` from this package) for clearing shared layout caches between tests.

## Example

Simple demo to show off a useful feature. Since svg `<text>` itself does not support
`verticalAnchor`, normally text rendered at `0,0` would be outside the viewport and thus not
visible. By using `<Text>` with the `verticalAnchor="start"` prop, the text will now be visible as
you'd expect.

```jsx
import React from 'react';
// note: react@18 syntax
import { createRoot } from 'react-dom/client';
import { Text } from '@visx/text';

const App = () => (
  <svg>
    <Text verticalAnchor="start">Hello world</Text>
  </svg>
);

const root = createRoot(document.getElementById('root'));

root.render(<App />);
```

## Installation

```
npm install --save @visx/text
```
