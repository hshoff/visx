import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/kernel',
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      all: false,
      reporter: ['lcov', 'json-summary', 'html', 'json', 'text'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/esm/**', '**/lib/**', '**/test/**', 'src/index.ts'],
      reportsDirectory: './coverage',
      thresholds: {
        lines: 95,
        branches: 95,
        functions: 95,
        statements: 95,
      },
    },
  },
  resolve: {
    alias: {
      '@visx/kernel': path.resolve(__dirname, './src'),
    },
  },
});
