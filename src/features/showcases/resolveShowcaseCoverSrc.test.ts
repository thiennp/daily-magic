import { describe, expect, it } from "vitest";

import { AUTOMATION_SHOWCASE_SCREEN } from "@/features/showcases/automationShowcaseScreens.constant";
import { resolveShowcaseCoverSrc } from "@/features/showcases/resolveShowcaseCoverSrc";
import { ONBOARDING_SHOWCASE_SCREEN } from "@/features/showcases/onboardingShowcaseScreens.constant";
import { SHOWCASE_TOPIC_SCREEN } from "@/features/showcases/showcaseTopicScreens.constant";

describe("resolveShowcaseCoverSrc (SHOWCASES-013/014)", () => {
  it("uses curated SVGs for card covers so labels stay readable", () => {
    expect(
      resolveShowcaseCoverSrc({
        automationScreenId: AUTOMATION_SHOWCASE_SCREEN.HOME_POPULAR_PRESETS,
        src: "/showcases/automations/01-home-popular-presets.png",
        alt: "Popular workflow preset cards",
        caption: "Popular workflows",
      }),
    ).toBe("/showcases/automations/01-home-popular-presets.svg");

    expect(
      resolveShowcaseCoverSrc({
        topicScreenId: SHOWCASE_TOPIC_SCREEN.APPROVALS,
        src: "/showcases/topics/08-approvals.png",
        alt: "Sensitive task waiting for manager approval.",
        caption: "Sensitive task waiting for manager approval.",
      }),
    ).toBe("/showcases/topics/08-approvals.svg");

    expect(
      resolveShowcaseCoverSrc({
        screenId: ONBOARDING_SHOWCASE_SCREEN.SAMPLE_WORKFLOW,
        src: "/showcases/onboarding/03-sample-workflow.png",
        alt: "Weekly status workflow",
        caption: "Weekly status",
      }),
    ).toBe("/showcases/onboarding/03-sample-workflow.svg");
  });
});
