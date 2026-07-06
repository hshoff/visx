import { expect, test } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('line render 10k benchmark', async ({ page }) => {
  await page.goto('http://127.0.0.1:5180/');

  const table = await page.evaluate(async () => {
    if (!window.__runLineRender10kBenchmark) {
      throw new Error('Benchmark hook is not available on window');
    }
    return window.__runLineRender10kBenchmark();
  });

  expect(table).toContain('Line render 10k');
  expect(table).toContain('visx XYChart');

  const outputPath = path.resolve(__dirname, '../results.txt');
  writeFileSync(outputPath, `${table}\n`, 'utf8');

  // eslint-disable-next-line no-console
  console.log('\n' + table + '\n');
});
