import type { Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  launchVitestPlaywrightBrowser,
  VITEST_PLAYWRIGHT_INSTALL_HINT,
} from "@/lib/test/vitestPlaywrightChromium";

describe("P1-S4b Chat dock Esc with composer trap (Playwright)", () => {
  let browser: Browser | null = null;
  let skipReason: string | null = "pending browser launch";

  beforeAll(async () => {
    browser = await launchVitestPlaywrightBrowser();
    skipReason = browser === null ? VITEST_PLAYWRIGHT_INSTALL_HINT : null;
  }, 60_000);

  afterAll(async () => {
    await browser?.close();
  });

  const dockTrapPage = async (): Promise<
    Awaited<ReturnType<NonNullable<typeof browser>["newPage"]>>
  > => {
    if (browser === null) {
      throw new Error("browser not launched");
    }
    const page = await browser.newPage();
    await page.setContent(`<!DOCTYPE html><html><body><script>
      let trapDepth = 0;
      window.pushTrap = () => { trapDepth += 1; return () => { trapDepth = Math.max(0, trapDepth - 1); }; };
      window.isTrapActive = () => trapDepth > 0;
      const dock = { open: true, full: true };
      window.dock = dock;
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (event.defaultPrevented || window.isTrapActive()) return;
        if (dock.full) { dock.full = false; return; }
        dock.open = false;
      });
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !window.isTrapActive()) return;
        event.preventDefault();
        event.stopPropagation();
      }, true);
    </script></body></html>`);
    return page;
  };

  it("first Esc with mention-style capture trap keeps full view; second Esc exits full", async ({
    skip,
  }) => {
    if (skipReason !== null) {
      skip(skipReason);
      return;
    }
    const page = await dockTrapPage();
    await page.evaluate(() => {
      window.releaseTrap = window.pushTrap();
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(await page.evaluate(() => window.dock.full)).toBe(true);
    await page.evaluate(() => {
      window.releaseTrap();
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(await page.evaluate(() => window.dock.full)).toBe(false);
    await page.close();
  }, 60_000);

  it("first Esc with trap depth only (picker-style) keeps full view", async ({
    skip,
  }) => {
    if (skipReason !== null) {
      skip(skipReason);
      return;
    }
    const page = await dockTrapPage();
    await page.evaluate(() => {
      window.releaseTrap = window.pushTrap();
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(await page.evaluate(() => window.dock.full)).toBe(true);
    await page.evaluate(() => window.releaseTrap());
    await page.close();
  }, 60_000);
});
