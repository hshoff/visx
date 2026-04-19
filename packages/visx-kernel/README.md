# @visx/kernel

Small, dependency-free primitives for visx hooks (`react >= 18` peer) and shared pure helpers used from `@visx/server`.

## Path semantics

`createPath` follows **visx-internal** path semantics. [d3-path](https://github.com/d3/d3-path) is inspiration only; there is **no** byte-for-byte compatibility guarantee.

## RSC and SSR

- **SSR-safe**: the package imports in Node and `react-dom/server` rendering does not throw.
- **Hooks** (`useStructuralMemo`, `useDomain`, …) are **client-only** — they use React hooks. Using them in a Server Component body yields the **standard React error** for client hooks, not a kernel-specific message.
- **Server Components**: import pure helpers from **`@visx/server`** (`extent`, `formatNumber`, `createPath`, `toPath2D`) in server-rendered code. `@visx/server` does **not** re-export hooks, `normalizeAccessor`, or `setWarnHandler`.

## `toPath2D` runtime contract

TypeScript types this as `Path2D` everywhere for ergonomic Canvas interop. In browsers you get a native `Path2D`. On the server, a **minimal shim** implements the `Path2D` instance method names as no-ops so call sites do not throw. **Do not** branch on or introspect the returned object on the server — treat it as opaque.

## Identity stability

Kernel helpers stabilize outputs when inputs are **structurally equal** (see `useStructuralMemo`). They **cannot** fix unstable inputs. You should:

- Wrap inline callbacks in `useStableCallback`
- Avoid mutating `data` arrays or option objects in place between renders
- Prefer stable function accessors or string keys (string accessors are cached)

## API (stable)

`useStructuralMemo`, `normalizeAccessor`, `useLatestRef`, `useStableCallback`, `useDomain`, `extent`, `formatNumber`, `createPath`, `toPath2D`, and the `PathBuilder` **type** (return type of `createPath`).

**Experimental:** `setWarnHandler` — intended for tests and controlled capture; the shape may change.

Internal: `devWarn`, `shallowEqual`, and the `PathBuilder` **class** implementation.
