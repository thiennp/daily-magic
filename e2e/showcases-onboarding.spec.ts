import { expect, test } from "@playwright/test";

const ONBOARDING_GUIDES = [
  {
    slug: "onboard-in-15-minutes",
    title: "Onboard in 15 minutes — walk through with real screens",
    figureCount: 4,
  },
  {
    slug: "company-onboard-in-30-minutes",
    title: "Company rollout in 30 minutes — seed before you invite",
    figureCount: 2,
  },
] as const;

for (const guide of ONBOARDING_GUIDES) {
  test(`${guide.slug} renders showcase figure images`, async ({ page }) => {
    await page.goto(`/showcases/${guide.slug}`);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      guide.title,
    );

    const figures = page.locator("figure img");
    await expect(figures).toHaveCount(guide.figureCount);

    for (let index = 0; index < guide.figureCount; index += 1) {
      const img = figures.nth(index);

      await expect(img).toHaveAttribute(
        "src",
        /\/showcases\/onboarding\/\d{2}-.+\.svg$/,
      );

      const response = await page.request.get(
        (await img.getAttribute("src")) ?? "",
      );
      expect(response.ok()).toBe(true);
    }
  });
}

test("automate-for-yourself-or-your-team renders automation figures", async ({
  page,
}) => {
  await page.goto("/showcases/automate-for-yourself-or-your-team");

  const figures = page.locator("figure img");
  await expect(figures).toHaveCount(3);

  for (let index = 0; index < 3; index += 1) {
    const img = figures.nth(index);
    await expect(img).toHaveAttribute(
      "src",
      /\/showcases\/automations\/\d{2}-.+\.svg$/,
    );

    const response = await page.request.get(
      (await img.getAttribute("src")) ?? "",
    );
    expect(response.ok()).toBe(true);
  }
});

test("first-agent-task-in-5-minutes renders topic figure", async ({ page }) => {
  await page.goto("/showcases/first-agent-task-in-5-minutes");

  const img = page.locator("figure img").first();
  await expect(img).toHaveAttribute(
    "src",
    "/showcases/topics/01-send-task.svg",
  );

  const response = await page.request.get(
    (await img.getAttribute("src")) ?? "",
  );
  expect(response.ok()).toBe(true);
});
