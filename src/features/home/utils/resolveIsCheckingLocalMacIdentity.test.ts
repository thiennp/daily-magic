import { describe, expect, it } from "vitest";

import { resolveIsCheckingLocalMacIdentity } from "@/features/home/utils/resolveIsCheckingLocalMacIdentity";

describe("resolveIsCheckingLocalMacIdentity (HOME-057)", () => {
  it("keeps checking while a computer wake probe is still going to run", () => {
    expect(
      resolveIsCheckingLocalMacIdentity({
        isMacBrowser: true,
        identityStatus: "idle",
        shouldProbeWakeIdentity: true,
      }),
    ).toBe(true);
  });

  it("stops checking when the wake probe is skipped and status stays idle", () => {
    expect(
      resolveIsCheckingLocalMacIdentity({
        isMacBrowser: true,
        identityStatus: "idle",
        shouldProbeWakeIdentity: false,
      }),
    ).toBe(false);
  });

  it("keeps checking while the probe is loading", () => {
    expect(
      resolveIsCheckingLocalMacIdentity({
        isMacBrowser: true,
        identityStatus: "loading",
        shouldProbeWakeIdentity: false,
      }),
    ).toBe(true);
  });

  it("stops checking once identity is ready", () => {
    expect(
      resolveIsCheckingLocalMacIdentity({
        isMacBrowser: true,
        identityStatus: "ready",
        shouldProbeWakeIdentity: true,
      }),
    ).toBe(false);
  });

  it("does not check on a non-Mac browser", () => {
    expect(
      resolveIsCheckingLocalMacIdentity({
        isMacBrowser: false,
        identityStatus: "idle",
        shouldProbeWakeIdentity: true,
      }),
    ).toBe(false);
  });
});
