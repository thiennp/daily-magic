import { expect, test, type Page } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

const EMAIL = "test-screenshot-admin@agentwitch.com";
const VIEWPORT = { width: 1440, height: 900 } as const;

const SAMPLE = {
  weekOf: "Jul 7",
  highlights: "Shipped the library sample workflow and onboarding guide.",
  blockers: "Waiting on design review for the hero copy.",
  automationName: "Weekly status — team sample",
  sendPrompt:
    "Draft a short standup from my local branch: what shipped, what's next, and one blocker.",
} as const;

const bugs: string[] = [];

const shot = async (page: Page, relPath: string): Promise<void> => {
  await page.screenshot({
    path: `public/showcases/${relPath}.png`,
    fullPage: true,
  });
};

const dismissBlockingModals = async (page: Page): Promise<void> => {
  for (let i = 0; i < 3; i += 1) {
    const modal = page.locator(".modal").first();
    if (!(await modal.count()) || !(await modal.isVisible())) break;
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
  }
};

const gotoSettled = async (
  page: Page,
  path: string,
  options?: { readonly keepModal?: boolean },
): Promise<void> => {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  if (!options?.keepModal) {
    await dismissBlockingModals(page);
  }
  await page.waitForTimeout(1500);
  // Stabilize fullPage height (lazy sections / fonts).
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 200);
    });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
};

const fillByNearbyLabel = async (
  root: Page | ReturnType<Page["locator"]>,
  label: RegExp,
  value: string,
): Promise<boolean> => {
  const labelNode = root
    .locator("label, legend, span, p, div")
    .filter({
      hasText: label,
    })
    .first();
  if (!(await labelNode.count())) return false;
  const container = labelNode.locator(
    "xpath=ancestor-or-self::*[.//input or .//textarea][1]",
  );
  const visibleInput = container
    .locator("input:visible, textarea:visible")
    .first();
  if (await visibleInput.count()) {
    await visibleInput.fill(value);
    return true;
  }
  const anyInput = container.locator("input, textarea").first();
  if (!(await anyInput.count())) return false;
  // Desktop fields can sit in `hidden md:block` while a mobile stepper clone exists.
  await anyInput.fill(value, { force: true });
  return true;
};

const fillSampleWeeklyFields = async (
  root: Page | ReturnType<Page["locator"]>,
): Promise<void> => {
  const filledWeek = await fillByNearbyLabel(root, /Week of/i, SAMPLE.weekOf);
  const filledHighlights = await fillByNearbyLabel(
    root,
    /Highlights/i,
    SAMPLE.highlights,
  );
  const filledBlockers = await fillByNearbyLabel(
    root,
    /Blockers/i,
    SAMPLE.blockers,
  );
  if (!filledWeek || !filledHighlights || !filledBlockers) {
    bugs.push(
      `Sample weekly fields incomplete (week=${filledWeek}, highlights=${filledHighlights}, blockers=${filledBlockers})`,
    );
  }
};

test.describe("Home article showcase screenshots", () => {
  test.describe.configure({ timeout: 240_000 });

  test("capture live home-article flows", async ({ page, context }) => {
    bugs.length = 0;
    await page.setViewportSize(VIEWPORT);

    // Marketing home (popular presets) — signed out
    await context.clearCookies();
    await gotoSettled(page, "/");
    await shot(page, "automations/01-home-popular-presets");

    await signInTestAccount(page, EMAIL);
    await gotoSettled(page, "/");
    await expect(
      page.getByText(/Getting started|Your Devices/i).first(),
    ).toBeVisible({
      timeout: 15_000,
    });
    await dismissBlockingModals(page);
    await page.waitForTimeout(500);
    await shot(page, "onboarding/01-home-checklist");
    await shot(page, "onboarding/02-mac-connected");
    await shot(page, "topics/12-mac-status");

    // Sample weekly workflow in Library
    await gotoSettled(page, "/library");
    const sampleCard = page
      .getByText(/Sample:\s*Weekly status update/i)
      .first();
    if (!(await sampleCard.count())) {
      bugs.push(
        "HOME-022-regression: Sample weekly workflow missing in Library",
      );
      await shot(page, "onboarding/03-sample-workflow");
      await shot(page, "topics/06-library");
    } else {
      await sampleCard.click();
      await page.waitForTimeout(1000);
      await fillSampleWeeklyFields(page);
      await page.waitForTimeout(400);
      await shot(page, "onboarding/03-sample-workflow");
      await shot(page, "topics/06-library");
    }

    // Send a task modal — Sample weekly → Claude → filled form
    await gotoSettled(page, "/?sendTask=1", { keepModal: true });
    const modal = page.locator(".modal").first();
    await expect(modal).toBeVisible({ timeout: 15_000 });
    const sampleInModal = modal.getByText(/Sample:\s*Weekly status update/i);
    try {
      await expect(sampleInModal.first()).toBeVisible({ timeout: 30_000 });
    } catch {
      bugs.push("Send-a-task library never loaded Sample weekly");
    }
    if (await sampleInModal.count()) {
      await modal
        .getByText(/Sample:\s*Weekly status update/i)
        .first()
        .click({ force: true });
      await page.waitForTimeout(800);
      const claude = modal.getByText("Claude (terminal)", { exact: true });
      if (await claude.count()) {
        await claude.click({ force: true });
        await page.waitForTimeout(1000);
      }
      // Library path should land on form (not auto-start). Custom task auto-start is a known bug.
      if (await modal.getByText(/Waiting for the first update/i).count()) {
        bugs.push(
          "AGENT-028: Send-a-task entered live session before form fill",
        );
      } else {
        await fillSampleWeeklyFields(modal);
        const prompt = modal.locator("textarea").first();
        if (await prompt.count()) {
          await prompt.fill(SAMPLE.sendPrompt);
        }
      }
    }
    await page.waitForTimeout(500);
    await shot(page, "topics/01-send-task");
    await shot(page, "topics/11-concept");
    await shot(page, "topics/05-mobile");

    // Automations — fill name on inline New automation form
    await gotoSettled(page, "/automations");
    const nameFilled = await fillByNearbyLabel(
      page,
      /^Name$/i,
      SAMPLE.automationName,
    );
    if (!nameFilled) {
      // Fallback: first text input under New automation
      const nameInput = page.locator('input[type="text"]').first();
      if (await nameInput.count()) {
        await nameInput.fill(SAMPLE.automationName);
      } else {
        bugs.push("Automations name field not found");
      }
    }
    await page.waitForTimeout(400);
    await shot(page, "automations/02-new-automation");
    await shot(page, "automations/03-automations-list");
    await shot(page, "topics/04-automations");

    // Job history / reports
    await gotoSettled(page, "/reports");
    await shot(page, "onboarding/04-job-history");
    await shot(page, "topics/07-reports");
    await shot(page, "topics/02-job-history");

    // Approvals / company admin / leadership
    await gotoSettled(page, "/admin/groups");
    await shot(page, "onboarding/05-company-rules");
    await shot(page, "topics/08-approvals");
    await shot(page, "topics/09-company-admin");
    await shot(page, "topics/10-leadership");

    await gotoSettled(page, "/marketplace");
    await shot(page, "topics/03-marketplace");

    if (bugs.length) {
      console.log("CAPTURE_BUGS:\n" + bugs.map((b) => `- ${b}`).join("\n"));
    } else {
      console.log("CAPTURE_BUGS: none");
    }

    for (const rel of [
      "automations/01-home-popular-presets",
      "automations/02-new-automation",
      "automations/03-automations-list",
      "onboarding/01-home-checklist",
      "onboarding/02-mac-connected",
      "onboarding/03-sample-workflow",
      "onboarding/04-job-history",
      "onboarding/05-company-rules",
      "topics/01-send-task",
      "topics/04-automations",
      "topics/07-reports",
      "topics/08-approvals",
      "topics/10-leadership",
      "topics/11-concept",
      "topics/12-mac-status",
    ]) {
      await expect
        .poll(async () => {
          const { access } = await import("node:fs/promises");
          try {
            await access(`public/showcases/${rel}.png`);
            return true;
          } catch {
            return false;
          }
        })
        .toBe(true);
    }
  });
});
