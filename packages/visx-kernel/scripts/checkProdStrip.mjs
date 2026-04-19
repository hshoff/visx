import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const result = await esbuild.build({
  entryPoints: [path.join(root, 'src/index.ts')],
  bundle: true,
  platform: 'neutral',
  format: 'esm',
  write: false,
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  external: ['react', 'react/jsx-runtime'],
});

const text = result.outputFiles[0].text;
// Warning payloads and dev-only messages must not ship in production
const leaked = ['EMPTY_DATA', 'NAN_IN_DATA', 'INFINITE_VALUE'].filter((s) => text.includes(s));
if (leaked.length > 0) {
  console.error('Production bundle appears to include dev warning paths:', leaked.join(', '));
  process.exit(1);
}
console.log('Production bundle check passed: no dev warning strings in minified output.');
