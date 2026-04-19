import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { devWarn, resetWarnDedupeForTests, setWarnHandler } from '../src/devWarn';

describe('devWarn', () => {
  const origEnv = process.env.NODE_ENV;

  beforeEach(() => {
    resetWarnDedupeForTests();
    setWarnHandler(null);
  });

  afterEach(() => {
    process.env.NODE_ENV = origEnv;
  });

  it('dedupes by (code, hook)', () => {
    const spy = vi.fn();
    setWarnHandler((code, hook, msg) => spy(code, hook, msg));
    devWarn('EMPTY_DATA', 'useDomain', 'a');
    devWarn('EMPTY_DATA', 'useDomain', 'b');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('no-ops in production', () => {
    process.env.NODE_ENV = 'production';
    const spy = vi.fn();
    setWarnHandler(spy);
    devWarn('EMPTY_DATA', 'useDomain', 'x');
    expect(spy).not.toHaveBeenCalled();
  });

  it('setWarnHandler receives detail', () => {
    const spy = vi.fn();
    setWarnHandler(spy);
    devWarn('NAN_IN_DATA', 'useDomain', 'm', { n: 1 });
    expect(spy).toHaveBeenCalledWith('NAN_IN_DATA', 'useDomain', 'm', { n: 1 });
  });

  it('default handler logs with and without detail', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    setWarnHandler(null);
    resetWarnDedupeForTests();
    devWarn('MISSING_DIMENSIONS', 'useChartDimensions', 'no detail');
    devWarn('NEGATIVE_DIMENSION', 'useChartDimensions', 'with detail', { w: 1 });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
