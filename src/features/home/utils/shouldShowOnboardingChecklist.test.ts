import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import shouldShowOnboardingChecklist from "@/features/home/utils/shouldShowOnboardingChecklist";

const buildStep = (id: string, done: boolean): OnboardingStep => ({
  id,
  label: id,
  done,
  href: "/",
});

describe("shouldShowOnboardingChecklist", () => {
  it("returns true while required steps remain", () => {
    expect(
      shouldShowOnboardingChecklist(
        [
          buildStep("pair", true),
          buildStep("workflow", false),
          buildStep("task", false),
        ],
        false,
      ),
    ).toBe(true);
  });

  it("returns false when required steps are complete", () => {
    expect(
      shouldShowOnboardingChecklist(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
        ],
        false,
      ),
    ).toBe(false);
  });

  it("returns false after setup is acknowledged (HOME-017)", () => {
    expect(
      shouldShowOnboardingChecklist(
        [
          buildStep("pair", true),
          buildStep("workflow", false),
          buildStep("task", false),
        ],
        true,
      ),
    ).toBe(false);
  });
});
