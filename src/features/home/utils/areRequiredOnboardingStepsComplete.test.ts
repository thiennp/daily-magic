import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import areRequiredOnboardingStepsComplete from "@/features/home/utils/areRequiredOnboardingStepsComplete";

const buildStep = (
  id: string,
  done: boolean,
  optional = false,
): OnboardingStep => ({
  id,
  label: id,
  done,
  href: "/",
  ...(optional ? { optional: true } : {}),
});

describe("areRequiredOnboardingStepsComplete", () => {
  it("returns true when every required step is done", () => {
    expect(
      areRequiredOnboardingStepsComplete([
        buildStep("pair", true),
        buildStep("workflow", true),
        buildStep("task", true),
        buildStep("automate", false, true),
      ]),
    ).toBe(true);
  });

  it("returns false when a required step is incomplete", () => {
    expect(
      areRequiredOnboardingStepsComplete([
        buildStep("pair", true),
        buildStep("workflow", false),
        buildStep("task", false),
      ]),
    ).toBe(false);
  });

  it("returns false when there are no steps", () => {
    expect(areRequiredOnboardingStepsComplete([])).toBe(false);
  });
});
