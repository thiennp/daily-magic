import { expect, test } from "@playwright/test";

test("BUG-008 styleguide has no horizontal page overflow at 1280px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/styleguide");

  await expect(
    page.getByRole("heading", { level: 1, name: "Component Styleguide" }),
  ).toBeVisible();

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
    };
  });

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
});
