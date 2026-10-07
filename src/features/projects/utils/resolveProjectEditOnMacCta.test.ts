import { describe, expect, it } from "vitest";

import resolveProjectEditOnMacCta from "@/features/projects/utils/resolveProjectEditOnMacCta";

describe("resolveProjectEditOnMacCta", () => {
  it("enables hand-off when this computer is live", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Alex's MacBook Pro",
      device: { isConnected: true, isOnline: true, presenceTier: "live" },
      deviceLastSeenAt: new Date().toISOString(),
      isThisMac: true,
    });

    expect(cta.state).toBe("enabled");
    expect(cta.buttonLabel).toBe("Edit on this computer");
    expect(cta.href).toBe("agentwitch-local://status?project=proj-1");
    expect(cta.helperText).toBeNull();
  });

  it("blocks when viewer is on the wrong Mac", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Jamie's Mac mini",
      device: { isConnected: true, isOnline: true, presenceTier: "live" },
      deviceLastSeenAt: new Date().toISOString(),
      isThisMac: false,
    });

    expect(cta.state).toBe("wrong_mac");
    expect(cta.href).toBeNull();
    expect(cta.helperText).toContain("Jamie's Mac mini");
  });

  it("offers Connect while reconnecting", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Mac",
      device: {
        isConnected: false,
        isOnline: true,
        presenceTier: "live_other_instance",
      },
      deviceLastSeenAt: new Date().toISOString(),
      isThisMac: true,
    });

    expect(cta.state).toBe("reconnecting");
    expect(cta.buttonLabel).toBe("Connect this computer");
    expect(cta.href).toBe("/#awc-connect");
  });

  it("offers Connect (not greyed Edit) while offline", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Mac",
      device: { isConnected: false, isOnline: false, presenceTier: "offline" },
      deviceLastSeenAt: "2020-01-01T00:00:00.000Z",
      isThisMac: true,
    });

    expect(cta.state).toBe("offline");
    expect(cta.buttonLabel).toBe("Connect this computer");
    expect(cta.href).toBe("/#awc-connect");
  });

  it("offers Connect when no computer is linked", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "",
      device: null,
      deviceLastSeenAt: null,
      isThisMac: false,
    });

    expect(cta.state).toBe("unknown_device");
    expect(cta.buttonLabel).toBe("Connect this computer");
    expect(cta.href).toBe("/#awc-connect");
  });
});
