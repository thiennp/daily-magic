import { expect, type Page } from "@playwright/test";

const STORYBOOK_BASE =
  process.env.STORYBOOK_BASE_URL?.trim() ?? "http://127.0.0.1:6016";

const PROJECTS_READY_URL = `${STORYBOOK_BASE.replace(/\/$/, "")}/iframe.html?id=awc-pages--projects-ready&viewMode=story`;

export const gotoAwcProjectsReadyStory = async (page: Page): Promise<void> => {
  await page.goto(PROJECTS_READY_URL, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.waitForTimeout(5_500);
  await page.locator(".sb-show-errordisplay").waitFor({
    state: "hidden",
    timeout: 90_000,
  });
  await page.locator("#storybook-root").waitFor({
    state: "visible",
    timeout: 90_000,
  });
  await expect(
    page.getByRole("searchbox", { name: "Search projects" }),
  ).toBeVisible({
    timeout: 30_000,
  });
};
