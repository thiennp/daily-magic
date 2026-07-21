import { describe, expect, it } from "vitest";

import { buildConnectInstallConnectionStatus } from "@/features/home/utils/buildConnectInstallConnectionStatus";

describe("buildConnectInstallConnectionStatus", () => {
  it("returns null before the install command is engaged", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: false,
        isInstallConnectionFinished: false,
      }),
    ).toBeNull();
  });

  it("returns waiting after the install command is copied", () => {
    expect(
      buildConnectInstallConnectionStatus({
        installEngaged: true,
        isInstallConnectionFinished: false,
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
        isInstallConnectionFinished: true,
      }),
    ).toEqual({
      message: "Your Mac is connected.",
      tone: "success",
    });
  });
});
