import { expect, test } from "@playwright/test";

const ONBOARDING_GUIDES = [
  {
    slug: "onboard-in-15-minutes",
    title: "Onboard in 15 minutes — real screens, sample data",
    pictureCount: 4,
  },
  {
    slug: "company-onboard-in-30-minutes",
    title: "Company rollout in 30 minutes — seed before you invite",
    pictureCount: 2,
  },
] as const;

for (const guide of ONBOARDING_GUIDES) {
  test(`${guide.slug} renders onboarding picture figures`, async ({ page }) => {
    await page.goto(`/showcases/${guide.slug}`);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      guide.title,
    );

    const pictures = page.locator("figure picture");
    await expect(pictures).toHaveCount(guide.pictureCount);

    for (let index = 0; index < guide.pictureCount; index += 1) {
      const picture = pictures.nth(index);
      const img = picture.locator("img");
      const source = picture.locator("source");

      await expect(img).toHaveAttribute(
        "src",
        /\/showcases\/onboarding\/\d{2}-.+\.svg$/,
      );
      await expect(source).toHaveAttribute(
        "srcset",
        /\/showcases\/onboarding\/\d{2}-.+\.png$/,
      );
    }
  });
}
