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

  it("returns waiting after copy or selection", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: false,
        linkError: null,
      }),
    ).toEqual({
      message: "Waiting for your Mac to connect…",
      tone: "waiting",
    });
  });

  it("prefers connecting and error states", () => {
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
