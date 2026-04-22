import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from '../src';

const LEGACY_MEASUREMENT_ID = '__react_svg_text_measurement_id';

describe('DOM measurement side effects', () => {
  it('does not append the legacy hidden measurement svg to document.body', async () => {
    const { unmount } = render(
      <Text x={0} y={0} width={120} style={{ fontFamily: 'sans-serif' }}>
        Some label text for measurement
      </Text>,
    );

    await waitFor(() => {
      expect(document.getElementById(LEGACY_MEASUREMENT_ID)).toBeNull();
    });

    unmount();
    expect(document.getElementById(LEGACY_MEASUREMENT_ID)).toBeNull();
  });
});
