import type { CSSProperties, ElementType, JSX, ReactNode } from 'react';
import { useMemo } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';
import { emitCssVariables } from './emitCssVariables';
import { resolveThemeProp } from './defineTheme';
import { toRuntimeTheme } from '../tokens/runtimeTheme';
import type { VisxTheme, VisxThemeName } from '../tokens/types';

type ThemeProviderBaseProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export type ThemeProviderAutoFalse = ThemeProviderBaseProps & {
  theme?: 'auto';
  as?: false;
};

export type ThemeProviderWithWrapper = ThemeProviderBaseProps & {
  theme?: VisxThemeName | VisxTheme;
  as?: keyof JSX.IntrinsicElements;
};

export type ThemeProviderProps = ThemeProviderAutoFalse | ThemeProviderWithWrapper;

/* eslint-disable @typescript-eslint/unified-signatures, no-redeclare -- public API overloads */
function ThemeProvider(props: ThemeProviderAutoFalse): JSX.Element;
function ThemeProvider(props: ThemeProviderWithWrapper): JSX.Element;
function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const { children, className, style } = props;
  const themeInput = props.theme;
  const asProp = 'as' in props ? props.as : undefined;

  const { authoring, mode } = resolveThemeProp(themeInput as VisxThemeName | VisxTheme | undefined);

  if (process.env.NODE_ENV === 'development' && asProp === false && mode !== 'auto') {
    // eslint-disable-next-line no-console
    console.warn(
      '@visx/theme ThemeProvider: `as={false}` is only supported with theme="auto". Rendering a wrapper element to scope CSS variables.',
    );
  }

  const contextValue: ThemeContextValue = useMemo(
    () => ({
      authoring,
      runtime: toRuntimeTheme(authoring),
      mode,
    }),
    [authoring, mode],
  );

  const mergedStyle: CSSProperties | undefined = useMemo(() => {
    if (mode === 'auto') {
      return style;
    }
    return { ...emitCssVariables(authoring), ...style };
  }, [authoring, mode, style]);

  if (mode === 'auto' && asProp === false) {
    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
  }

  const Component: ElementType = asProp === false || asProp === undefined ? 'div' : asProp;

  return (
    <ThemeContext.Provider value={contextValue}>
      <Component className={className} style={mergedStyle}>
        {children}
      </Component>
    </ThemeContext.Provider>
  );
}
/* eslint-enable @typescript-eslint/unified-signatures, no-redeclare */

export default ThemeProvider;
