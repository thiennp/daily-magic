import { defineConfig, devices } from "@playwright/test";

const port = 6016;
const baseURL = `http://127.0.0.1:${port}`;

/** Storybook interaction QA — not part of default CI (build time). */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 90_000,
  reporter: "list",
  testMatch: ["**/storybook-awc-projects-interactions.spec.ts"],
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
      "npm run storybook:build && npx --yes serve storybook-static -l tcp://127.0.0.1:" +
      String(port),
    url: baseURL,
    reuseExistingServer: true,
    timeout: 600_000,
  },
});
