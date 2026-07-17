import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Custom server.ts (npm run start) is required for Agent Witch WebSocket upgrades.
    // Plain `next start` serves HTTP only and leaves agent-witch disconnected.
    command: `set -a && . ./.env.local && set +a && npm run build && npm run start`,
    url: `${baseURL}/api/db/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
