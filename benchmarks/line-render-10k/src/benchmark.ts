const DOM_SETTLE_QUIET_WINDOW_MS = 32;

export type BenchmarkOptions = {
  iterations?: number;
  warmupIterations?: number;
  removeOutliers?: boolean;
};

export type BenchmarkResult = {
  name: string;
  samples: number[];
  meanMs: number;
  stdDevMs: number;
};

export function removeOutliers(data: number[]) {
  if (data.length < 4) {
    return data;
  }

  const sorted = data.slice().sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;

  return data.filter((value) => value >= lower && value <= upper);
}

function roundMs(value: number) {
  return Math.round(value * 100) / 100;
}

function stdDev(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return roundMs(Math.sqrt(variance));
}

async function measureDomSettled(
  root: HTMLElement,
  updateVisibility: () => void,
): Promise<number> {
  const start = performance.now();
  let lastMutationAt = start;
  let resolved = false;

  return new Promise<number>((resolve) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      observer?.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resolve(Math.max(0, lastMutationAt - start));
    };

    const scheduleFinish = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(finish, DOM_SETTLE_QUIET_WINDOW_MS);
    };

    const observer = new MutationObserver(() => {
      lastMutationAt = performance.now();
      scheduleFinish();
    });

    observer.observe(root, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    updateVisibility();
    scheduleFinish();
  });
}

/**
 * Measures mount time until the DOM stops mutating (same approach as Base UI perf experiments).
 */
export async function runMountBenchmark(
  name: string,
  root: HTMLElement,
  render: () => void,
  unmount: () => void,
  options: BenchmarkOptions = {},
): Promise<BenchmarkResult> {
  const {
    iterations = 20,
    warmupIterations = 10,
    removeOutliers: shouldRemoveOutliers = true,
  } = options;

  const samples: number[] = [];

  for (let i = 0; i < warmupIterations + iterations; i += 1) {
    unmount();

    // eslint-disable-next-line no-await-in-loop
    const durationMs = await measureDomSettled(root, render);

    if (i < warmupIterations) {
      continue;
    }

    samples.push(roundMs(durationMs));
  }

  const filtered = shouldRemoveOutliers ? removeOutliers(samples) : samples;
  const meanMs = roundMs(filtered.reduce((sum, value) => sum + value, 0) / filtered.length);

  return {
    name,
    samples: filtered,
    meanMs,
    stdDevMs: stdDev(filtered),
  };
}

export type LibraryResult = BenchmarkResult & {
  comparison: number;
};

export function formatAsciiTable(results: LibraryResult[]) {
  const baseline = results[0]?.meanMs ?? 1;
  const header = ['Rank', 'Library', 'Raw', 'Comparison'];
  const rows = results.map((result, index) => [
    String(index + 1),
    result.name,
    `${result.meanMs.toFixed(2)}ms`,
    `${(result.meanMs / baseline).toFixed(2)}x`,
  ]);

  const widths = header.map((cell, columnIndex) =>
    Math.max(cell.length, ...rows.map((row) => row[columnIndex].length)),
  );

  const formatRow = (cells: string[]) =>
    cells.map((cell, index) => cell.padEnd(widths[index])).join('  ');

  const divider = widths.map((width) => '-'.repeat(width)).join('  ');

  return ['Line render 10k', '', formatRow(header), divider, ...rows.map(formatRow)].join('\n');
}

export function withComparisons(results: BenchmarkResult[]): LibraryResult[] {
  const baseline = results[0]?.meanMs ?? 1;
  return results.map((result) => ({
    ...result,
    comparison: roundMs(result.meanMs / baseline),
  }));
}

/** Reference numbers from https://x.com/colmtuite/status/2073092169783541785 */
export const referenceResults: LibraryResult[] = [
  { name: 'Base UI Charts', samples: [], meanMs: 38.94, stdDevMs: 0, comparison: 1 },
  { name: 'ECharts Canvas', samples: [], meanMs: 94.53, stdDevMs: 0, comparison: 2.43 },
  { name: 'ECharts SVG', samples: [], meanMs: 127.71, stdDevMs: 0, comparison: 3.28 },
  { name: 'MUI X SVG', samples: [], meanMs: 161.44, stdDevMs: 0, comparison: 4.15 },
  { name: 'AG Charts', samples: [], meanMs: 303.04, stdDevMs: 0, comparison: 7.78 },
  { name: 'Recharts', samples: [], meanMs: 332.96, stdDevMs: 0, comparison: 8.55 },
];
