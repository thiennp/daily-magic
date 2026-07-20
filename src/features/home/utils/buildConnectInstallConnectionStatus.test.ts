import { describe, expect, it } from "vitest";

import { buildConnectInstallConnectionStatus } from "@/features/home/utils/buildConnectInstallConnectionStatus";

describe("buildConnectInstallConnectionStatus", () => {
  it("returns null before the install command is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: false,
        isInstallConnectionFinished: false,
        linkError: null,
      }),
    ).toBeNull();
  });

  it("hides link errors until the install command is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: false,
        isInstallConnectionFinished: false,
        linkError: "Local API unreachable.",
      }),
    ).toBeNull();
  });

  it("returns waiting after the install command is copied", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: false,
        isInstallConnectionFinished: false,
        linkError: null,
      }),
    ).toEqual({
      message: "Waiting for your Mac to connect…",
      tone: "waiting",
    });
  });

  it("HOME-025: returns success when the Mac WebSocket is live", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: false,
        isInstallConnectionFinished: true,
        linkError: null,
      }),
    ).toEqual({
      message: "Your Mac is connected.",
      tone: "success",
    });
  });

  it("prefers connecting and error states after install is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isLinking: true,
        isInstallConnectionFinished: false,
        linkError: null,
      }),
    ).toBeNull();

    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: true,
        isInstallConnectionFinished: false,
        linkError: null,
      })?.tone,
    ).toBe("connecting");

    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isLinking: true,
        isInstallConnectionFinished: false,
        linkError: "Local API unreachable.",
      })?.tone,
    ).toBe("error");
  });
});
