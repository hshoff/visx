import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10 * 60 * 1000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5180',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
