import { expect, test } from "@playwright/test";

const LEADERSHIP_GUIDES = [
  {
    slug: "automate-recurring-work-without-headcount",
    title: "Automate recurring work without hiring another coordinator",
  },
  {
    slug: "standardize-ai-work-across-the-team",
    title: "One playbook for the team—with approval when it matters",
  },
] as const;

for (const guide of LEADERSHIP_GUIDES) {
  test(`${guide.slug} renders leadership guide`, async ({ page }) => {
    await page.goto(`/showcases/${guide.slug}`);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      guide.title,
    );
    await expect(page.getByText("For leadership")).toBeVisible();
  });
}

test("/showcases lists For leadership section", async ({ page }) => {
  await page.goto("/showcases");

  await expect(
    page.getByRole("heading", { level: 2, name: "For leadership" }),
  ).toBeVisible();
});
