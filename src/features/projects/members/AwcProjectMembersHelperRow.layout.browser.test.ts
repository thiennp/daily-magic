import type { Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { df036RailRowLayoutHtml } from "@/features/projects/members/df036RailRowLayout.fixture.html";
import {
  launchVitestPlaywrightBrowser,
  VITEST_PLAYWRIGHT_INSTALL_HINT,
} from "@/lib/test/vitestPlaywrightChromium";

describe("DF-036 helper row layout (Playwright)", () => {
  let browser: Browser | null = null;
  let skipReason: string | null = "pending browser launch";

  beforeAll(async () => {
    browser = await launchVitestPlaywrightBrowser();
    skipReason = browser === null ? VITEST_PLAYWRIGHT_INSTALL_HINT : null;
  }, 60_000);

  afterAll(async () => {
    await browser?.close();
  });

  const assertRowLayout = async (viewportWidth: number): Promise<void> => {
    if (browser === null) {
      throw new Error("browser not launched");
    }
    const page = await browser.newPage({
      viewport: { width: viewportWidth, height: 720 },
    });
    await page.setContent(df036RailRowLayoutHtml(viewportWidth - 40), {
      waitUntil: "domcontentloaded",
    });
    const name = page.locator("#name");
    const chip = page.locator("#chip span");
    const menu = page.locator("#menu");
    const nameBox = await name.boundingBox();
    const menuBox = await menu.boundingBox();
    expect(nameBox?.width ?? 0).toBeGreaterThan(40);
    expect(
      await name.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
    const nameText = await name.textContent();
    expect(nameText).toBe("Claude");
    expect(nameText).not.toBe("C…");
    expect(menuBox?.width ?? 0).toBeGreaterThan(20);
    const chipOverflows = await chip.evaluate(
      (el) => el.scrollWidth > el.clientWidth + 1,
    );
    const chipFits = await chip.evaluate(
      (el) => el.scrollWidth <= el.clientWidth + 1,
    );
    expect(chipOverflows || chipFits).toBe(true);
    if (chipOverflows) {
      expect(chipFits).toBe(false);
    }
    await page.close();
  };

  it("keeps assistant name visible at ~850px and full width", async ({
    skip,
  }) => {
    if (skipReason !== null) {
      skip(skipReason);
      return;
    }
    await assertRowLayout(850);
    await assertRowLayout(1440);
  }, 60_000);
});
