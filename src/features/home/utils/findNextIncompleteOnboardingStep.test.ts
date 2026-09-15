import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import findNextIncompleteOnboardingStep from "@/features/home/utils/findNextIncompleteOnboardingStep";

const buildStep = (id: string, done: boolean, label = id): OnboardingStep => ({
  id,
  label,
  done,
  href: "/",
});

describe("findNextIncompleteOnboardingStep", () => {
  it("returns the first incomplete required step in order", () => {
    const steps = [
      buildStep("pair", true),
      buildStep("task", false, "Send your first task"),
      { ...buildStep("workflow", false), optional: true },
    ];

    expect(findNextIncompleteOnboardingStep(steps)?.id).toBe("task");
  });

  it("returns null when every step is complete", () => {
    const steps = [
      buildStep("pair", true),
      buildStep("workflow", true),
      buildStep("task", true),
    ];

    expect(findNextIncompleteOnboardingStep(steps)).toBeNull();
  });

  it("skips optional steps when earlier required steps are done", () => {
    const steps = [
      buildStep("pair", true),
      buildStep("workflow", true),
      buildStep("task", true),
      { ...buildStep("automate", false), optional: true },
    ];

    expect(findNextIncompleteOnboardingStep(steps)).toBeNull();
  });
});
