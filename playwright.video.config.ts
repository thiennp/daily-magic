import { defineConfig, devices } from "@playwright/test";

import base from "./playwright.config";

export default defineConfig({
  ...base,
  outputDir: ".e2e/test-results",
  use: {
    ...base.use,
    video: "on",
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], video: "on" },
    },
  ],
  // Reuse the already-running local server with Agent Witch WS.
  webServer: undefined,
});
