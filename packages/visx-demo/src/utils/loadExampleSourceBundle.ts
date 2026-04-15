import fs from 'fs';
import path from 'path';

/**
 * Collect all example source files under an example directory (excluding CodeSandbox
 * entry `index.tsx` and `package.json`) for static code display. Concatenates files with
 * path markers so multi-file demos (e.g. brush + AreaChart, xychart) show full context.
 */
export function loadExampleSourceBundle(exampleDir: string): string {
  const files = collectSourceFiles(exampleDir)
    .filter((f) => !f.endsWith(`${path.sep}index.tsx`))
    .sort();

  return files
    .map((file) => {
      const rel = path.relative(exampleDir, file).split(path.sep).join('/');
      const body = fs.readFileSync(file, 'utf8');
      return `// --- ${rel} ---\n\n${body}`;
    })
    .join('\n\n');
}

function collectSourceFiles(dir: string): string[] {
  const out: string[] = [];

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (isBundledFile(full)) {
        out.push(full);
      }
    }
  }

  walk(dir);
  return out;
}

function isBundledFile(filePath: string): boolean {
  const base = path.basename(filePath);
  if (base === 'package.json' || base === 'sandbox-styles.css') {
    return false;
  }
  // Omit .json (e.g. large TopoJSON) from static props; TS/TSX is what readers need.
  return /\.(tsx?|jsx?)$/i.test(base);
}
