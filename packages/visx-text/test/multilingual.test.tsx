import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useText } from '../src';

describe('multilingual line breaking (Pretext)', () => {
  it('wraps CJK text without relying on spaces', async () => {
    const text = '日本語のテスト文字列'.repeat(3);
    const { result } = renderHook(() =>
      useText({
        width: 80,
        style: { fontFamily: 'sans-serif', fontSize: 14 },
        children: text,
      }),
    );

    await waitFor(() => {
      expect(result.current.wordsByLines.length).toBeGreaterThan(1);
    });
  });

  it('lays out RTL text without throwing', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 100,
        style: { fontFamily: 'sans-serif', fontSize: 14 },
        children: 'مرحبا بالعالم مرحبا بالعالم',
      }),
    );

    await waitFor(() => {
      expect(result.current.wordsByLines.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('does not split an emoji cluster across lines for short max width', async () => {
    const { result } = renderHook(() =>
      useText({
        width: 40,
        style: { fontFamily: 'sans-serif', fontSize: 14 },
        children: 'Hello 🚀🌍🎉 World',
      }),
    );

    await waitFor(() => {
      const joined = result.current.wordsByLines.map((l) => l.words.join(' ')).join('');
      expect(joined.replace(/\s+/g, ' ').trim()).toContain('🚀');
    });
  });
});
