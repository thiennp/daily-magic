import { chromium, type Browser } from "playwright";

/** Shown when vitest Playwright suites skip (no browser on PATH / cache). */
export const VITEST_PLAYWRIGHT_INSTALL_HINT =
  "Vitest Playwright tests need Chromium. Run: npx playwright install --with-deps chromium";

/** Launch Chromium for vitest; returns null (skip tests) when the binary is missing. */
export const launchVitestPlaywrightBrowser =
  async (): Promise<Browser | null> => {
    try {
      return await chromium.launch();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      const missingBinary =
        message.includes("Executable doesn't exist") ||
        message.includes("chrome-headless-shell") ||
        message.includes("Failed to launch");
      if (missingBinary) {
        console.warn(`[vitest-playwright] ${VITEST_PLAYWRIGHT_INSTALL_HINT}`);
        return null;
      }
      throw error;
    }
  };
