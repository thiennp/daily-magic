import { describe, expect, it } from "vitest";

import buildHomeSetupNextStep from "@/features/home/utils/buildHomeSetupNextStep";

describe("buildHomeSetupNextStep", () => {
  it("prompts install and account link when no paired device", () => {
    expect(
      buildHomeSetupNextStep({
        hasPairedDevice: false,
        pairingStatus: "not_connected",
      }),
    ).toMatchObject({
      activeStep: "install-mac",
      headline: "Next: install Agent Witch on this Mac",
    });
  });

  it("prompts browser pairing when the Mac is linked but the browser is not paired", () => {
    expect(
      buildHomeSetupNextStep({
        hasPairedDevice: true,
        pairingStatus: "not_connected",
      }),
    ).toMatchObject({
      activeStep: "pair-browser",
      headline: "Next: pair this browser for rules and sharing",
    });
  });

  it("shows ready state when the Mac and browser are paired", () => {
    expect(
      buildHomeSetupNextStep({
        hasPairedDevice: true,
        pairingStatus: "paired",
      }),
    ).toMatchObject({
      activeStep: "ready",
      headline: "Your Mac and browser are connected",
    });
  });
});
