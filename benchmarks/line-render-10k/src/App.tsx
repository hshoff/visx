import { StrictMode, useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  formatAsciiTable,
  referenceResults,
  runMountBenchmark,
  withComparisons,
  type BenchmarkResult,
  type LibraryResult,
} from './benchmark';
import { benchmarkCases } from './charts';
import styles from './App.module.css';

type RunState = 'idle' | 'running' | 'done';

async function runAllCases(
  mountHost: HTMLDivElement,
  onProgress: (completed: number, total: number, name: string) => void,
): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  for (const [index, benchmarkCase] of benchmarkCases.entries()) {
    onProgress(index, benchmarkCases.length, benchmarkCase.name);

    let reactRoot: ReturnType<typeof createRoot> | null = null;

    const render = () => {
      if (!reactRoot) {
        reactRoot = createRoot(mountHost);
      }
      const Chart = benchmarkCase.render;
      reactRoot.render(
        <StrictMode>
          <Chart />
        </StrictMode>,
      );
    };

    const unmount = () => {
      reactRoot?.unmount();
      reactRoot = null;
      mountHost.replaceChildren();
    };

    // eslint-disable-next-line no-await-in-loop
    const result = await runMountBenchmark(
      benchmarkCase.name,
      mountHost,
      render,
      unmount,
      { iterations: 20, warmupIterations: 10 },
    );

    unmount();
    results.push(result);
  }

  onProgress(benchmarkCases.length, benchmarkCases.length, 'done');
  return results;
}

function App() {
  const mountHostRef = useRef<HTMLDivElement>(null);
  const [runState, setRunState] = useState<RunState>('idle');
  const [progress, setProgress] = useState({ completed: 0, total: benchmarkCases.length, name: '' });
  const [results, setResults] = useState<LibraryResult[] | null>(null);

  const referenceTable = useMemo(() => formatAsciiTable(referenceResults), []);

  const runBenchmark = useCallback(async () => {
    const mountHost = mountHostRef.current;
    if (!mountHost || runState === 'running') {
      return;
    }

    setRunState('running');
    setResults(null);

    try {
      const rawResults = await runAllCases(mountHost, (completed, total, name) => {
        setProgress({ completed, total, name });
      });

      rawResults.sort((a, b) => a.meanMs - b.meanMs);
      setResults(withComparisons(rawResults));
    } finally {
      setRunState('idle');
    }
  }, [runState]);

  const localTable = results ? formatAsciiTable(results) : null;

  return (
    <div className={styles.layout}>
      <section className={styles.panel}>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            onClick={runBenchmark}
            disabled={runState === 'running'}
          >
            {runState === 'running' ? 'Running…' : 'Run benchmark (20 iterations)'}
          </button>
          {runState === 'running' ? (
            <span className={styles.progress}>
              {progress.completed + 1}/{progress.total}: {progress.name}
            </span>
          ) : null}
        </div>

        <h2 className={styles.heading}>Reference (Colm Tuite, Jul 2026)</h2>
        <pre className={styles.table}>{referenceTable}</pre>

        {localTable ? (
          <>
            <h2 className={styles.heading}>This machine</h2>
            <pre className={styles.table}>{localTable}</pre>
          </>
        ) : null}
      </section>

      <div ref={mountHostRef} className={styles.mountHost} aria-hidden="true" />
    </div>
  );
}

export default App;

if (typeof window !== 'undefined') {
  window.__runLineRender10kBenchmark = async () => {
    const mountHost = document.createElement('div');
    document.body.appendChild(mountHost);

    const rawResults = await runAllCases(mountHost, () => undefined);
    rawResults.sort((a, b) => a.meanMs - b.meanMs);
    mountHost.remove();

    return formatAsciiTable(withComparisons(rawResults));
  };
}
