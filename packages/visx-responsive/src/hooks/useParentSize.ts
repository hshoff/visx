import debounce from 'lodash/debounce';
import type { RefCallback } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DebounceSettings, PrivateWindow, ResizeObserverPolyfill } from '../types';

export type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type UseParentSizeConfig = {
  /** Initial size before measuring the parent. */
  initialSize?: Partial<ParentSizeState>;
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: ResizeObserverPolyfill;
  /** Optional dimensions provided won't trigger a state change when changed. */
  ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
} & DebounceSettings;

type UseParentSizeResult<T extends HTMLElement = HTMLDivElement> = ParentSizeState & {
  parentRef: RefCallback<T | null>;
  resize: (state: ParentSizeState) => void;
};

const defaultIgnoreDimensions: UseParentSizeConfig['ignoreDimensions'] = [];
const defaultInitialSize: ParentSizeState = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

export default function useParentSize<T extends HTMLElement = HTMLDivElement>({
  initialSize = defaultInitialSize,
  debounceTime = 300,
  ignoreDimensions = defaultIgnoreDimensions,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
}: UseParentSizeConfig = {}): UseParentSizeResult<T> {
  const animationFrameID = useRef(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const [state, setState] = useState<ParentSizeState>({ ...defaultInitialSize, ...initialSize });

  const resize = useMemo(() => {
    const normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];

    return debounce(
      (incoming: ParentSizeState) => {
        setState((existing) => {
          const stateKeys = Object.keys(existing) as (keyof ParentSizeState)[];
          const keysWithChanges = stateKeys.filter((key) => existing[key] !== incoming[key]);
          const shouldBail = keysWithChanges.every((key) => normalized.includes(key));

          return shouldBail ? existing : incoming;
        });
      },
      debounceTime,
      { leading: enableDebounceLeadingCall },
    );
  }, [debounceTime, enableDebounceLeadingCall, ignoreDimensions]);

  const parentRef = useCallback(
    (element: T | null) => {
      window.cancelAnimationFrame(animationFrameID.current);
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!element) return;

      const LocalResizeObserver =
        resizeObserverPolyfill || (window as unknown as PrivateWindow).ResizeObserver;

      const observer = new LocalResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { left, top, width, height } = entry?.contentRect ?? {};
          animationFrameID.current = window.requestAnimationFrame(() => {
            resize({ width, height, top, left });
          });
        });
      });
      observer.observe(element);
      observerRef.current = observer;
    },
    [resize, resizeObserverPolyfill],
  );

  useEffect(() => () => resize.cancel(), [resize]);

  return { parentRef, resize, ...state };
}
