import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, '../../packages');

/** Subpaths re-exported by @visx/vendor — resolve directly to node_modules. */
const VENDOR_SUBPATHS = [
  'd3-array',
  'd3-color',
  'd3-delaunay',
  'd3-format',
  'd3-geo',
  'd3-interpolate',
  'd3-path',
  'd3-scale',
  'd3-shape',
  'd3-time',
  'd3-time-format',
  'internmap',
] as const;

const SKIP_PACKAGES = new Set(['demo']);

/**
 * Resolve every @visx/* workspace package from source (or built output) so Vite
 * does not require `yarn build` before running the benchmark.
 */
function createVisxAliases(): Record<string, string> {
  const aliases: Record<string, string> = {};

  for (const dir of fs.readdirSync(packagesDir)) {
    if (!dir.startsWith('visx-')) {
      continue;
    }

    const packageName = dir.replace(/^visx-/, '');
    if (SKIP_PACKAGES.has(packageName)) {
      continue;
    }

    const packageDir = path.join(packagesDir, dir);
    const srcDir = path.join(packageDir, 'src');
    const esmDir = path.join(packageDir, 'esm');
    const libDir = path.join(packageDir, 'lib');

    if (fs.existsSync(srcDir)) {
      aliases[`@visx/${packageName}`] = srcDir;
    } else if (fs.existsSync(esmDir)) {
      aliases[`@visx/${packageName}`] = esmDir;
    } else if (fs.existsSync(path.join(libDir, 'index.js'))) {
      aliases[`@visx/${packageName}`] = libDir;
    }
  }

  for (const subpath of VENDOR_SUBPATHS) {
    aliases[`@visx/vendor/${subpath}`] = subpath;
  }

  return aliases;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: createVisxAliases(),
  },
  optimizeDeps: {
    // Workspace packages are aliased to TypeScript source — skip prebundling.
    exclude: ['@visx/xychart', '@visx/axis', '@visx/shape', '@visx/scale', '@visx/group'],
  },
  server: {
    port: 5180,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, '../..')],
    },
  },
});
