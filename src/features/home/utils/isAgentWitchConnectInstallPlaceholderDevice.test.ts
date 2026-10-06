import { describe, expect, it } from "vitest";

import {
  countLinkedAgentWitchComputers,
  isAgentWitchConnectInstallPlaceholderDevice,
} from "@/features/home/utils/isAgentWitchConnectInstallPlaceholderDevice";

describe("isAgentWitchConnectInstallPlaceholderDevice (HOME-067)", () => {
  it("treats unlabeled mint rows without a bundle as placeholders", () => {
    expect(
      isAgentWitchConnectInstallPlaceholderDevice({
        installBundleVersion: null,
        deviceLabel: null,
        displayName: null,
      }),
    ).toBe(true);
  });

  it("treats a registered computer as linked", () => {
    expect(
      isAgentWitchConnectInstallPlaceholderDevice({
        installBundleVersion: "267",
        deviceLabel: "Grey-Check",
        displayName: "Grey - Check",
      }),
    ).toBe(false);
  });

  it("counts only linked computers for the Connect gate", () => {
    expect(
      countLinkedAgentWitchComputers([
        {
          installBundleVersion: null,
          deviceLabel: null,
          displayName: null,
        },
        {
          installBundleVersion: "267",
          deviceLabel: "Studio",
          displayName: null,
        },
      ]),
    ).toBe(1);
  });
});
