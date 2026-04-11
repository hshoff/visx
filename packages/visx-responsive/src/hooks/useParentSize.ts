import debounce from 'lodash/debounce';
import type { RefObject } from 'react';
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

type ResizeHandler = ((state: ParentSizeState) => void) & { cancel: () => void };

type UseParentSizeResult<T extends HTMLElement = HTMLDivElement> = ParentSizeState & {
  parentRef: RefObject<T | null>;
  resize: ResizeHandler;
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
  const parentRef = useRef<T>(null);
  const animationFrameID = useRef(0);

  const [state, setState] = useState<ParentSizeState>({ ...defaultInitialSize, ...initialSize });

  const applyIncoming = useCallback(
    (incoming: ParentSizeState) => {
      const normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];
      setState((existing) => {
        const stateKeys = Object.keys(existing) as (keyof ParentSizeState)[];
        const keysWithChanges = stateKeys.filter((key) => existing[key] !== incoming[key]);
        const shouldBail = keysWithChanges.every((key) => normalized.includes(key));

        return shouldBail ? existing : incoming;
      });
    },
    [ignoreDimensions],
  );

  const resize = useMemo((): ResizeHandler => {
    if (debounceTime === 0) {
      const immediate: ResizeHandler = (incoming: ParentSizeState) => {
        applyIncoming(incoming);
      };
      immediate.cancel = () => {};
      return immediate;
    }
    return debounce(applyIncoming, debounceTime, {
      leading: enableDebounceLeadingCall,
    }) as ResizeHandler;
  }, [applyIncoming, debounceTime, enableDebounceLeadingCall]);

  useEffect(() => {
    const LocalResizeObserver =
      resizeObserverPolyfill || (window as unknown as PrivateWindow).ResizeObserver;

    const observer = new LocalResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { left, top, width, height } = entry?.contentRect ?? {};
        const next = { width, height, top, left };
        if (debounceTime === 0) {
          animationFrameID.current = window.requestAnimationFrame(() => {
            applyIncoming(next);
          });
        } else {
          resize(next);
        }
      });
    });
    if (parentRef.current) observer.observe(parentRef.current);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [applyIncoming, debounceTime, resize, resizeObserverPolyfill]);

  return { parentRef, resize, ...state };
}
