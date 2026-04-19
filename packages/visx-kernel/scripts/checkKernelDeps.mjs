import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const deps = pkg.dependencies ?? {};
if (Object.keys(deps).length > 0) {
  console.error('@visx/kernel must have zero runtime dependencies. Found:', Object.keys(deps).join(', '));
  process.exit(1);
}
console.log('@visx/kernel dependencies check passed.');
