import { describe, expect, it } from "vitest";

import {
  ONBOARDING_SHOWCASE_SCREEN,
  buildShowcaseOnboardingImagePaths,
} from "@/features/showcases/onboardingShowcaseScreens.constant";
import { buildShowcaseOnboardingArticleImage } from "@/features/showcases/buildShowcaseOnboardingArticleImage";

describe("onboarding showcase screens", () => {
  it("builds png and svg paths for a screen id", () => {
    expect(
      buildShowcaseOnboardingImagePaths(
        ONBOARDING_SHOWCASE_SCREEN.HOME_CHECKLIST,
      ),
    ).toEqual({
      png: "/showcases/onboarding/01-home-checklist.png",
      svg: "/showcases/onboarding/01-home-checklist.svg",
    });
  });

  it("builds article images with screenId for picture fallback", () => {
    expect(
      buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.JOB_HISTORY,
        {
          alt: "Job history",
          caption: "Completed run",
        },
      ),
    ).toEqual({
      screenId: "04-job-history",
      src: "/showcases/onboarding/04-job-history.svg",
      alt: "Job history",
      caption: "Completed run",
    });
  });
});
