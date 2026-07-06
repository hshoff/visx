import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Resolve all @visx/* workspace packages from source so the benchmark tracks local changes
// without requiring a full `yarn build` first.
const packagesDir = path.resolve(__dirname, '../../packages');
const visxPackages = [
  'annotation',
  'axis',
  'curve',
  'event',
  'glyph',
  'grid',
  'group',
  'react-spring',
  'responsive',
  'scale',
  'shape',
  'text',
  'tooltip',
  'vendor',
  'voronoi',
  'xychart',
] as const;

const visxAliases = Object.fromEntries(
  visxPackages.map((name) => [
    `@visx/${name}`,
    path.resolve(packagesDir, `visx-${name}/src`),
  ]),
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: visxAliases,
  },
  server: {
    port: 5180,
    strictPort: true,
  },
});
