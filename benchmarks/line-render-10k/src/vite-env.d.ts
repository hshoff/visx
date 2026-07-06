/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare global {
  interface Window {
    __runLineRender10kBenchmark?: () => Promise<string>;
  }
}

export {};
