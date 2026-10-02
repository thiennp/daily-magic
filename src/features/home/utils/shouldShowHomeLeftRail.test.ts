import { describe, expect, it } from "vitest";

import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";
import shouldShowHomeLeftRail from "@/features/home/utils/shouldShowHomeLeftRail";

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

describe("shouldShowHomeLeftRail", () => {
  it("returns true while the getting-started checklist is visible (HOME-064)", () => {
    expect(
      shouldShowHomeLeftRail(
        [
          buildStep("pair", true),
          buildStep("workflow", false),
          buildStep("task", false),
        ],
        false,
      ),
    ).toBe(true);
  });

  it("returns true when only the automate nudge is visible (HOME-064)", () => {
    expect(
      shouldShowHomeLeftRail(
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

  it("returns false when onboarding hints are hidden (HOME-064)", () => {
    expect(
      shouldShowHomeLeftRail(
        [
          buildStep("pair", true),
          buildStep("workflow", true),
          buildStep("task", true),
          buildStep("automate", true, true),
        ],
        true,
      ),
    ).toBe(false);
  });
});
