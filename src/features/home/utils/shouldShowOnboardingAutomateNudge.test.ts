import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import shouldShowOnboardingAutomateNudge from "@/features/home/utils/shouldShowOnboardingAutomateNudge";

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

describe("shouldShowOnboardingAutomateNudge", () => {
  it("returns true when required steps are done but automate is optional incomplete", () => {
    expect(
      shouldShowOnboardingAutomateNudge(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
          buildStep("automate", false, true),
        ],
        false,
      ),
    ).toBe(true);
  });

  it("returns false while required steps remain", () => {
    expect(
      shouldShowOnboardingAutomateNudge(
        [
          buildStep("pair", true),
          buildStep("workflow", false),
          buildStep("task", false),
          buildStep("automate", false, true),
        ],
        false,
      ),
    ).toBe(false);
  });

  it("returns false after setup is acknowledged (HOME-017)", () => {
    expect(
      shouldShowOnboardingAutomateNudge(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
          buildStep("automate", false, true),
        ],
        true,
      ),
    ).toBe(false);
  });
});
