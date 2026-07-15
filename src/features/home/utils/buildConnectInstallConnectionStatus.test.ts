import { describe, expect, it } from "vitest";

import { buildConnectInstallConnectionStatus } from "@/features/home/utils/buildConnectInstallConnectionStatus";

describe("buildConnectInstallConnectionStatus", () => {
  it("returns null before the install command is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: false,
        linkError: null,
      }),
    ).toBeNull();
  });

  it("hides link errors until the install command is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: false,
        linkError: "Local API unreachable.",
      }),
    ).toBeNull();
  });

  it("returns waiting after the install command is copied", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: false,
        linkError: null,
      }),
    ).toEqual({
      message: "Waiting for your Mac to get ready…",
      tone: "waiting",
    });
  });

  it("prefers connecting and error states after install is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: true,
        linkError: null,
      }),
    ).toBeNull();

    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: true,
        linkError: null,
      })?.tone,
    ).toBe("connecting");

    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: true,
        linkError: "Local API unreachable.",
      })?.tone,
    ).toBe("error");
  });
});
