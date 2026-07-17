import { describe, expect, it } from "vitest";

import {
  ONBOARDING_SHOWCASE_ARTICLES,
  listOnboardingShowcaseArticleImages,
} from "@/features/showcases/listOnboardingShowcaseArticles";
import { buildShowcaseOnboardingPngPath } from "@/features/showcases/onboardingShowcaseScreens.constant";

describe("onboarding showcase articles", () => {
  it("uses screenId on every onboarding guide image", () => {
    for (const article of ONBOARDING_SHOWCASE_ARTICLES) {
      const images = listOnboardingShowcaseArticleImages(article);

      expect(images.length).toBeGreaterThan(0);

      for (const image of images) {
        expect(image.screenId).toBeTruthy();
        expect(image.src).toBe(buildShowcaseOnboardingPngPath(image.screenId!));
      }
    }
  });
});
