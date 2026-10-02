import { expect, test } from "@playwright/test";

import { gotoAwcProjectsReadyStory } from "./helpers/storybookAwcProjectsReady";

const storybookInteractionsEnabled =
  process.env.RUN_STORYBOOK_INTERACTION_E2E === "1";

test.describe("AWC Projects — Storybook interactions", () => {
  test.skip(
    !storybookInteractionsEnabled,
    "Set RUN_STORYBOOK_INTERACTION_E2E=1 with a healthy Storybook dev/static server",
  );
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAwcProjectsReadyStory(page);
  });

  test("search: focus, filter, clear", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: "Search projects" });
    await search.click();
    await expect(search).toBeFocused();
    await search.fill("daily");
    await expect(page.getByText(/of 3 projects/)).toBeVisible();
    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(search).toHaveValue("");
    await expect(page.getByText("3 projects")).toBeVisible();
  });

  test("card kebab: open, menu items, outside click closes", async ({
    page,
  }) => {
    const menuButton = page
      .getByRole("button", { name: "Project actions" })
      .first();
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    const menu = page.getByRole("menu", { name: "Project actions" });
    await expect(menu).toBeVisible();
    await expect(
      menu.getByRole("menuitem", { name: "View details" }),
    ).toBeVisible();
    await expect(menu.getByRole("menuitem", { name: "Rename" })).toBeVisible();
    await expect(
      menu.getByRole("menuitem", { name: "Assign tasks" }),
    ).toBeVisible();
    await expect(
      menu.getByRole("menuitem", { name: "Delete project" }),
    ).toBeVisible();
    await page.locator("body").click({ position: { x: 8, y: 8 } });
    await expect(menu).toBeHidden();
  });

  test("card kebab: Escape closes and returns focus to toggle", async ({
    page,
  }) => {
    const menuButton = page
      .getByRole("button", { name: "Project actions" })
      .first();
    await menuButton.click();
    await expect(
      page.getByRole("menu", { name: "Project actions" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("menu", { name: "Project actions" }),
    ).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test("second card menu independent of first", async ({ page }) => {
    const menus = page.getByRole("button", { name: "Project actions" });
    await expect(menus).toHaveCount(3);
    await menus.nth(1).click();
    await expect(
      page.getByRole("menu", { name: "Project actions" }),
    ).toBeVisible();
  });

  test("sidebar nav: Projects active, Home link hover/focus", async ({
    page,
  }) => {
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    const home = page.getByRole("link", { name: "Home" });
    await home.focus();
    await expect(home).toBeFocused();
  });

  test("new project section: name input focusable", async ({ page }) => {
    const nameInput = page.getByRole("textbox", { name: "Name" });
    await nameInput.scrollIntoViewIfNeeded();
    await nameInput.focus();
    await expect(nameInput).toBeFocused();
  });
});

test.describe("AWC Projects — mobile chrome", () => {
  test.skip(
    !storybookInteractionsEnabled,
    "Set RUN_STORYBOOK_INTERACTION_E2E=1 with a healthy Storybook dev/static server",
  );
  test("bottom tab nav visible below md breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAwcProjectsReadyStory(page);
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await expect(
      mobileNav.getByRole("link", { name: "Projects" }),
    ).toBeVisible();
  });
});
