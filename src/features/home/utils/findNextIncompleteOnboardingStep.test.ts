import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import findNextIncompleteOnboardingStep from "@/features/home/utils/findNextIncompleteOnboardingStep";

const buildStep = (
  id: string,
  done: boolean,
  label = id,
): OnboardingStep => ({
  id,
  label,
  done,
  href: "/",
});

describe("findNextIncompleteOnboardingStep", () => {
  it("returns the first incomplete step in order", () => {
    const steps = [
      buildStep("pair", true),
      buildStep("workflow", false, "Create your first workflow or agent"),
      buildStep("task", false, "Send your first task"),
    ];

    expect(findNextIncompleteOnboardingStep(steps)?.id).toBe("workflow");
  });

  it("returns null when every step is complete", () => {
    const steps = [
      buildStep("pair", true),
      buildStep("workflow", true),
      buildStep("task", true),
    ];

    expect(findNextIncompleteOnboardingStep(steps)).toBeNull();
  });
});
