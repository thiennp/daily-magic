import { describe, expect, it } from "vitest";

import { parseRegisterInstallBody } from "@/lib/agentWitch/parseRegisterInstallBody";

describe("parseRegisterInstallBody", () => {
  it("AGENT-051: accepts installBundleVersion from update register-install", () => {
    const token = "a".repeat(64);

    expect(
      parseRegisterInstallBody({
        pairingToken: token,
        deviceLabel: "Mac-Light-S#owner",
        installBundleVersion: "54",
      }),
    ).toEqual({
      pairingToken: token,
      deviceLabel: "Mac-Light-S#owner",
      installBundleVersion: "54",
    });
  });
});
