import debounce from 'lodash/debounce';
import type { DebouncedFunc } from 'lodash';
import { Component } from 'react';
import type { ComponentType } from 'react';
import type {
  DebounceSettings,
  Simplify,
  PrivateWindow,
  ResizeObserverPolyfill,
  ResizeObserver,
} from '../types';

const CONTAINER_STYLES = { width: '100%', height: '100%' };

/**
 * @deprecated
 * @TODO remove in the next major version - exported for backwards compatibility
 */
export type WithParentSizeProps = DebounceSettings;

type WithParentSizeConfig = {
  initialWidth?: number;
  initialHeight?: number;
} & DebounceSettings;

type WithParentSizeState = {
  parentWidth?: number;
  parentHeight?: number;
};

export type WithParentSizeProvidedProps = WithParentSizeState;

type WithParentSizeComponentProps<P extends WithParentSizeProvidedProps> = Simplify<
  Omit<P, keyof WithParentSizeProvidedProps> & WithParentSizeConfig
>;

export default function withParentSize<P extends WithParentSizeProvidedProps>(
  BaseComponent: ComponentType<P>,
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: ResizeObserverPolyfill,
): ComponentType<WithParentSizeComponentProps<P>> {
  return class WrappedComponent extends Component<
    WithParentSizeComponentProps<P>,
    WithParentSizeState
  > {
    displayName = `withParentSize(${
      BaseComponent.displayName ?? BaseComponent.name ?? 'Component'
    })`;
    state = {
      parentWidth: undefined,
      parentHeight: undefined,
    };
    animationFrameID: number = 0;
    resizeObserver: ResizeObserver | undefined;
    container: HTMLDivElement | null = null;
    resizeDebounced: DebouncedFunc<(dims: { width: number; height: number }) => void> | undefined;

    applyParentSize = ({ width, height }: { width: number; height: number }) => {
      this.setState({
        parentWidth: width,
        parentHeight: height,
      });
    };

    syncDebouncedResize() {
      this.resizeDebounced?.cancel();
      const debounceTime = this.props.debounceTime ?? 300;
      if (debounceTime > 0) {
        this.resizeDebounced = debounce(this.applyParentSize, debounceTime, {
          leading: this.props.enableDebounceLeadingCall ?? true,
        });
      } else {
        this.resizeDebounced = undefined;
      }
    }

    componentDidMount() {
      this.syncDebouncedResize();

      const ResizeObserverLocal =
        resizeObserverPolyfill || (window as unknown as PrivateWindow).ResizeObserver;

      this.resizeObserver = new ResizeObserverLocal((entries) => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;
          const dims = { width, height };
          const debounceTime = this.props.debounceTime ?? 300;
          if (debounceTime === 0) {
            this.animationFrameID = window.requestAnimationFrame(() => {
              this.applyParentSize(dims);
            });
          } else {
            this.resizeDebounced?.(dims);
          }
        });
      });
      if (this.container) this.resizeObserver.observe(this.container);
    }

    componentDidUpdate(prevProps: WithParentSizeComponentProps<P>) {
      if (
        prevProps.debounceTime !== this.props.debounceTime ||
        prevProps.enableDebounceLeadingCall !== this.props.enableDebounceLeadingCall
      ) {
        this.syncDebouncedResize();
      }
    }

    componentWillUnmount() {
      window.cancelAnimationFrame(this.animationFrameID);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.resizeDebounced?.cancel();
    }

    setRef = (ref: HTMLDivElement) => {
      this.container = ref;
    };

    render() {
      const { initialWidth, initialHeight } = this.props;
      const { parentWidth = initialWidth, parentHeight = initialHeight } = this.state;
      return (
        <div style={CONTAINER_STYLES} ref={this.setRef}>
          {parentWidth != null && parentHeight != null && (
            <BaseComponent
              parentWidth={parentWidth}
              parentHeight={parentHeight}
              {...(this.props as P)}
            />
          )}
        </div>
      );
    }
  };
}
