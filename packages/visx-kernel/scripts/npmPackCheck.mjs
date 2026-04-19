import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const out = execSync('npm pack --dry-run --json', {
  cwd: root,
  encoding: 'utf-8',
});
const [{ files }] = JSON.parse(out);
const bad = files.filter((f) => {
  const n = f.path;
  return (
    n.includes('/test/') ||
    n.endsWith('.map') ||
    n.includes('__tests__') ||
    n.includes('.test.')
  );
});
if (bad.length > 0) {
  console.error('Unexpected files in pack:', bad.map((x) => x.path).join(', '));
  process.exit(1);
}
console.log('npm pack check passed.');
