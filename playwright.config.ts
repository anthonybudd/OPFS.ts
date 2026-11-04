import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/integration',

  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
  },

  webServer: {
    command: 'npx vite --config vite.config.ts',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
