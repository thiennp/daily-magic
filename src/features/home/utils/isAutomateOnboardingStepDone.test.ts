import { describe, expect, it } from "vitest";

import isAutomateOnboardingStepDone from "@/features/home/utils/isAutomateOnboardingStepDone";

describe("isAutomateOnboardingStepDone", () => {
  it("returns true when automate step is done", () => {
    expect(
      isAutomateOnboardingStepDone([
        { id: "automate", label: "Schedule", done: true, href: "/automations" },
      ]),
    ).toBe(true);
  });

  it("returns false when automate step is incomplete", () => {
    expect(
      isAutomateOnboardingStepDone([
        {
          id: "automate",
          label: "Schedule",
          done: false,
          href: "/automations",
        },
      ]),
    ).toBe(false);
  });
});
