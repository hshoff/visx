/**
 * jsdom does not implement Canvas 2D; Pretext requires measureText().
 * This installs a deterministic stub for tests.
 */

const originalGetContextByProto = new WeakMap<
  typeof HTMLCanvasElement.prototype,
  typeof HTMLCanvasElement.prototype.getContext
>();

export function installCanvasMock() {
  if (typeof HTMLCanvasElement === 'undefined') return;

  const proto = HTMLCanvasElement.prototype;
  if (originalGetContextByProto.has(proto)) return;

  originalGetContextByProto.set(proto, proto.getContext);

  proto.getContext = function getContext(this: HTMLCanvasElement, type: string) {
    if (type !== '2d') {
      return originalGetContextByProto.get(proto)!.call(this, type);
    }

    return {
      font: '10px sans-serif',
      measureText(text: string) {
        // Match legacy svgMock: 10px per character for stable expectations
        return { width: (text?.length ?? 0) * 10 };
      },
    };
  };
}

export function uninstallCanvasMock() {
  if (typeof HTMLCanvasElement === 'undefined') return;
  const proto = HTMLCanvasElement.prototype;
  const original = originalGetContextByProto.get(proto);
  if (!original) return;
  proto.getContext = original;
  originalGetContextByProto.delete(proto);
}
