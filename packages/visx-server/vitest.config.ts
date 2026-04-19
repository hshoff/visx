import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    name: '@visx/server',
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['packages/visx-server/src/**/*.{ts,tsx}'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@visx/server': path.resolve(__dirname, './src'),
    },
  },
});
