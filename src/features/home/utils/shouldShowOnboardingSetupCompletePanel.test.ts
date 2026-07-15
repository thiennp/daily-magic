import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import shouldShowOnboardingSetupCompletePanel from "@/features/home/utils/shouldShowOnboardingSetupCompletePanel";

const buildStep = (id: string, done: boolean): OnboardingStep => ({
  id,
  label: id,
  done,
  href: "/",
});

describe("shouldShowOnboardingSetupCompletePanel", () => {
  it("returns true when required steps are done and setup is not acknowledged", () => {
    expect(
      shouldShowOnboardingSetupCompletePanel(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
        ],
        false,
      ),
    ).toBe(true);
  });

  it("returns false after setup is acknowledged", () => {
    expect(
      shouldShowOnboardingSetupCompletePanel(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
        ],
        true,
      ),
    ).toBe(false);
  });
});
