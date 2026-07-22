import { defineConfig } from "@playwright/test";

const port = 3000;
const baseURL = `http://127.0.0.1:${port}`;
const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  workers: 1,
  reporter: "list",
  testMatch: ["**/agent-witch-shipped-install.spec.ts"],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "shipped-install",
    },
  ],
  webServer: {
    command:
      "if [ -f .env.local ]; then set -a && . ./.env.local && set +a; fi && npm run build && npm run start",
    url: `${baseURL}/install/agent-witch/version`,
    reuseExistingServer: !isCi,
    timeout: 300_000,
  },
});
