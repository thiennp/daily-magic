import { describe, expect, it } from "vitest";

import buildHomeSetupNextStep from "@/features/home/utils/buildHomeSetupNextStep";

describe("buildHomeSetupNextStep", () => {
  it("prompts install when no paired device", () => {
    expect(
      buildHomeSetupNextStep({
        hasPairedDevice: false,
      }),
    ).toMatchObject({
      activeStep: "install-mac",
      headline: "Next: install Agent Witch on this Mac",
    });
  });

  it("shows ready state when a Mac is paired", () => {
    expect(
      buildHomeSetupNextStep({
        hasPairedDevice: true,
      }),
    ).toMatchObject({
      activeStep: "ready",
      headline: "Your Mac is connected",
    });
  });
});
