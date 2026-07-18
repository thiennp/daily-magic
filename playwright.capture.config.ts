import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://127.0.0.1:${port}`;
const isCi = Boolean(process.env.CI);

/** Capture helpers only — default playwright.config ignores capture-*.spec.ts. */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  forbidOnly: isCi,
  retries: 0,
  workers: 1,
  reporter: "list",
  testMatch: ["**/capture-e2e-screenshots.spec.ts"],
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
    command:
      "if [ -f .env.local ]; then set -a && . ./.env.local && set +a; fi && npm run build && npm run start",
    url: `${baseURL}/api/health`,
    reuseExistingServer: !isCi,
    timeout: 300_000,
  },
});
