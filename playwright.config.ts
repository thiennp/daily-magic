import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://127.0.0.1:${port}`;
const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 1 : undefined,
  reporter: "list",
  // CI has no Agent Witch Mac / Neon secrets — keep GitHub e2e on static pages.
  // Local `npm run test:e2e` still runs the full suite (except capture helpers).
  testMatch: isCi ? ["**/showcases-*.spec.ts"] : undefined,
  testIgnore: ["**/capture-*.spec.ts"],
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
    // `.env.local` is optional so CI can boot without a checked-in secrets file.
    command:
      "if [ -f .env.local ]; then set -a && . ./.env.local && set +a; fi && npm run build && npm run start",
    url: `${baseURL}/api/health`,
    reuseExistingServer: !isCi,
    timeout: 300_000,
  },
});
