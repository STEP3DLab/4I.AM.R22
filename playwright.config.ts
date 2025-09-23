import { defineConfig } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  reporter: [['html', { open: 'never' }], ['list']],
});
