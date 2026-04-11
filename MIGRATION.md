# Migration guide

## `@types/react` and `@types/react-dom` as peer dependencies

React-based `@visx/*` packages declare `@types/react` as a **peer** dependency instead of bundling their own copy. That way your app supplies a single version and you avoid duplicate or conflicting installs.

`@visx/bounds` also expects `@types/react-dom` as a peer (it types APIs that involve the DOM).

### What you need to do

- **React 18 and earlier:** add dev dependencies that match your React version, for example:

  ```bash
  yarn add -D @types/react @types/react-dom
  ```

  (Use the major versions that align with your `react` / `react-dom` versions.)

- **React 19+:** you can rely on the types shipped with `react` and `react-dom` and omit `@types/react` / `@types/react-dom` if your toolchain resolves them correctly.

- **`@visx/visx`:** the umbrella package now lists `@types/react` as a peer as well, so consumers of the meta-package should satisfy it the same way as when installing individual packages.

If you see TypeScript errors about missing `react` types after upgrading, install the appropriate `@types/react` (and `@types/react-dom` when using `@visx/bounds`) in your application.
