/**
 * Measurable Storybook wave rubric for ux | copy | ui | product (reviewer A/B via STRICT env).
 * Usage:
 *   STORYBOOK_BASE_URL=http://127.0.0.1:6008 npx tsx scripts/storybookWaveQa/evaluateSubjectiveWaveQa.ts
 *   STRICT=1 ...  # reviewer B (stricter)
 */
import { chromium } from "playwright";

import {
  buildStorybookStoryId,
  STORYBOOK_WAVE_PAGES,
  storybookStoryUrl,
} from "./storybookWavePageCatalog";

const BASE = process.env.STORYBOOK_BASE_URL?.trim() || "http://127.0.0.1:6008";
const STRICT = process.env.STRICT === "1";

type Role = "ux" | "copy" | "ui" | "product";

interface RoleScore {
  readonly scoreDesktop: number;
  readonly scoreMobile: number;
  readonly scoreOverall: number;
  readonly passed: boolean;
  readonly deductions: readonly string[];
}

interface PageReport {
  readonly deployable: string;
  readonly pageId: string;
  readonly roles: Record<Role, RoleScore>;
}

const BANNED_COPY = [
  "undefined",
  "null",
  "lorem ipsum",
  "[object Object]",
  "NaN",
  "story fixture only",
];

const scoreFromDeductions = (
  deductions: readonly string[],
  weight: number,
): number => Math.max(0, 100 - deductions.length * weight);

const evaluateStory = async (
  url: string,
  viewport: { width: number; height: number },
  deployable: "AWC" | "AWL",
  status: string,
): Promise<{
  ux: string[];
  copy: string[];
  ui: string[];
  product: string[];
}> => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const ux: string[] = [];
  const copy: string[] = [];
  const ui: string[] = [];
  const product: string[] = [];

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
    await page.waitForTimeout(1500);
    const iframeLocator = page.frameLocator(
      'iframe[title="Agent Witch Live page preview"]',
    );
    const hasAwlFrame =
      (await page
        .locator('iframe[title="Agent Witch Live page preview"]')
        .count()) > 0;
    if (hasAwlFrame) {
      await iframeLocator.locator("body").waitFor({ timeout: 60_000 });
      await page.waitForTimeout(500);
    }
    const errCount = await page.locator(".sb-show-errordisplay").count();
    if (errCount > 0) {
      ux.push("storybook-error-overlay");
      ui.push("storybook-error-overlay");
      product.push("storybook-error-overlay");
    }

    const root = page.locator("#storybook-root");
    if ((await root.count()) === 0) {
      ux.push("missing-storybook-root");
    }

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    if (scrollWidth > clientWidth + (STRICT ? 2 : 8)) {
      ux.push("horizontal-overflow");
    }

    const bodyText = await page.evaluate(() => {
      const root = document.querySelector("#storybook-root");
      if (root === null) {
        return "";
      }
      const iframe = root.querySelector("iframe");
      if (iframe instanceof HTMLIFrameElement) {
        try {
          const doc = iframe.contentDocument;
          const body = doc?.body;
          if (body !== null && body !== undefined) {
            return body.innerText;
          }
        } catch {
          // cross-origin — fall back
        }
      }
      return (root as HTMLElement).innerText;
    });
    const lower = bodyText.toLowerCase();
    for (const banned of BANNED_COPY) {
      if (lower.includes(banned)) {
        copy.push(`banned-phrase:${banned}`);
      }
    }
    if (bodyText.trim().length < (STRICT ? 40 : 20)) {
      copy.push("thin-visible-copy");
    }

    const hasHeading = await page.evaluate(() => {
      const root = document.querySelector("#storybook-root");
      if (root === null) {
        return 0;
      }
      const iframe = root.querySelector("iframe");
      const scope =
        iframe instanceof HTMLIFrameElement
          ? (iframe.contentDocument?.body ?? root)
          : root;
      return scope.querySelectorAll("h1, h2, h3").length;
    });
    if (hasHeading === 0 && status === "ready") {
      ux.push("missing-heading-ready");
    }

    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(
        document.querySelectorAll("#storybook-root img"),
      ) as HTMLImageElement[];
      return imgs.filter((img) => img.naturalWidth === 0).length;
    });
    if (brokenImages > 0) {
      ui.push(`broken-images:${brokenImages}`);
    }

    if (status === "empty" && !/empty|no |yet|none/i.test(bodyText)) {
      product.push("empty-status-missing-empty-tone");
    }
    if (
      status === "error" &&
      !/error|fail|offline|unavailable/i.test(bodyText)
    ) {
      product.push("error-status-missing-error-tone");
    }
    if (status === "loading" && !/load|wait|checking/i.test(bodyText)) {
      product.push("loading-status-missing-loading-tone");
    }

    if (
      deployable === "AWC" &&
      viewport.width <= 400 &&
      status === "ready" &&
      STRICT
    ) {
      const smallTap = await page.evaluate(() => {
        const buttons = Array.from(
          document.querySelectorAll(
            "#storybook-root button, #storybook-root a",
          ),
        ) as HTMLElement[];
        return buttons.some((el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            (rect.height < 36 || rect.width < 36)
          );
        });
      });
      if (smallTap) {
        ux.push("small-tap-target-mobile");
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return { ux, copy, ui, product };
};

const uniqueDeductions = (items: readonly string[]): string[] => [
  ...new Set(items),
];

const aggregateRole = (
  allDeductions: readonly string[],
  hasMobile: boolean,
  mobileDeductions: readonly string[],
): RoleScore => {
  const weight = STRICT ? 8 : 6;
  const desktopDeductions = uniqueDeductions(allDeductions);
  const mobileDeductionsUnique = uniqueDeductions(mobileDeductions);
  const desktopScore = scoreFromDeductions(desktopDeductions, weight);
  const mobileScore = hasMobile
    ? scoreFromDeductions(mobileDeductionsUnique, weight)
    : desktopScore;
  const scoreOverall = hasMobile
    ? Math.round((desktopScore + mobileScore) / 2)
    : desktopScore;
  return {
    scoreDesktop: desktopScore,
    scoreMobile: mobileScore,
    scoreOverall,
    passed: scoreOverall >= 95,
    deductions: [...desktopDeductions, ...mobileDeductionsUnique],
  };
};

const main = async (): Promise<void> => {
  const reports: PageReport[] = [];

  for (const catalogPage of STORYBOOK_WAVE_PAGES) {
    const roleBuckets: Record<Role, string[]> = {
      ux: [],
      copy: [],
      ui: [],
      product: [],
    };
    const mobileBuckets: Record<Role, string[]> = {
      ux: [],
      copy: [],
      ui: [],
      product: [],
    };

    const mobileStatus = catalogPage.statuses.includes("ready")
      ? "ready"
      : catalogPage.statuses[0];

    for (const status of catalogPage.statuses) {
      const storyId = buildStorybookStoryId(
        catalogPage.deployable,
        catalogPage.id,
        status,
      );
      const url = storybookStoryUrl(BASE, storyId);
      const desktop = await evaluateStory(
        url,
        { width: 1280, height: 900 },
        catalogPage.deployable,
        status,
      );
      for (const role of Object.keys(roleBuckets) as Role[]) {
        roleBuckets[role].push(...desktop[role]);
      }

      if (catalogPage.deployable === "AWC" && status === mobileStatus) {
        const mobile = await evaluateStory(
          url,
          { width: 390, height: 844 },
          catalogPage.deployable,
          status,
        );
        for (const role of Object.keys(mobileBuckets) as Role[]) {
          mobileBuckets[role].push(...mobile[role]);
        }
      }
    }

    const hasMobile = catalogPage.deployable === "AWC";
    reports.push({
      deployable: catalogPage.deployable,
      pageId: catalogPage.id,
      roles: {
        ux: aggregateRole(roleBuckets.ux, hasMobile, mobileBuckets.ux),
        copy: aggregateRole(roleBuckets.copy, hasMobile, mobileBuckets.copy),
        ui: aggregateRole(roleBuckets.ui, hasMobile, mobileBuckets.ui),
        product: aggregateRole(
          roleBuckets.product,
          hasMobile,
          mobileBuckets.product,
        ),
      },
    });
  }

  const failed = reports.filter((r) =>
    (["ux", "copy", "ui", "product"] as Role[]).some(
      (role) => !r.roles[role].passed,
    ),
  );

  process.stdout.write(
    `${JSON.stringify({ strict: STRICT, reports, failedCount: failed.length }, null, 2)}\n`,
  );
  if (failed.length > 0) {
    process.exit(1);
  }
};

main().catch((error: unknown) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
});
