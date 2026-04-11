import debounce from 'lodash/debounce';
import type { Ref, RefCallback, RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DebounceSettings, PrivateWindow, ResizeObserverPolyfill } from '../types';
import { mergeRefs } from '../utils/mergeRefs';

export type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type UseParentSizeConfig<T extends HTMLElement = HTMLDivElement> = {
  /** Initial size before measuring the parent. */
  initialSize?: Partial<ParentSizeState>;
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: ResizeObserverPolyfill;
  /** Optional dimensions provided won't trigger a state change when changed. */
  ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
  /**
   * Optional ref to the measured element. When set, `parentRef` merges this ref with the internal
   * observer target so both stay assigned to the same node.
   */
  ref?: Ref<T | null>;
} & DebounceSettings;

type UseParentSizeResult<T extends HTMLElement = HTMLDivElement> = ParentSizeState & {
  parentRef: RefObject<T | null> | RefCallback<T>;
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
  ref: externalRef,
}: UseParentSizeConfig<T> = {}): UseParentSizeResult<T> {
  const observerTargetRef = useRef<T | null>(null);
  const animationFrameID = useRef(0);

  const parentRef = useMemo((): RefObject<T | null> | RefCallback<T> => {
    if (externalRef == null) return observerTargetRef;
    return mergeRefs<T>(observerTargetRef, externalRef);
  }, [externalRef]);

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

  useEffect(() => {
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
    const target = observerTargetRef.current;
    if (target) observer.observe(target);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize, resizeObserverPolyfill, parentRef]);

  return { parentRef, resize, ...state };
}
