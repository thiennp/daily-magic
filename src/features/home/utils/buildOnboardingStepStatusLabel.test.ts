import { describe, expect, it } from "vitest";

import buildOnboardingStepStatusLabel from "@/features/home/utils/buildOnboardingStepStatusLabel";

describe("buildOnboardingStepStatusLabel", () => {
  it("returns Done for completed steps", () => {
    expect(
      buildOnboardingStepStatusLabel({
        id: "pair",
        label: "Connect your Mac",
        done: true,
        href: "/#your-setup",
      }),
    ).toBe("Done");
  });

  it("returns step-specific pending labels", () => {
    expect(
      buildOnboardingStepStatusLabel({
        id: "pair",
        label: "Connect your Mac",
        done: false,
        href: "/#your-setup",
      }),
    ).toBe("Not connected");

    expect(
      buildOnboardingStepStatusLabel({
        id: "group",
        label: "Join a team",
        done: false,
        href: "/admin/groups",
      }),
    ).toBe("Not joined");
  });
});
