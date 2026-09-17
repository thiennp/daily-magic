import { describe, expect, it } from "vitest";

import resolveProjectEditOnMacCta from "@/features/projects/utils/resolveProjectEditOnMacCta";

describe("resolveProjectEditOnMacCta", () => {
  it("enables hand-off when this Mac is live", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Alex's MacBook Pro",
      device: { isConnected: true, isOnline: true, presenceTier: "live" },
      deviceLastSeenAt: new Date().toISOString(),
      isThisMac: true,
    });

    expect(cta.state).toBe("enabled");
    expect(cta.buttonLabel).toBe("Edit on this Mac →");
    expect(cta.href).toContain("/project?id=proj-1");
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

  it("shows reconnecting for live_other_instance", () => {
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
    expect(cta.helperText).toContain("Reconnecting");
  });

  it("shows offline copy with last seen", () => {
    const cta = resolveProjectEditOnMacCta({
      projectId: "proj-1",
      deviceDisplayName: "Mac",
      device: { isConnected: false, isOnline: false, presenceTier: "offline" },
      deviceLastSeenAt: "2020-01-01T00:00:00.000Z",
      isThisMac: true,
    });

    expect(cta.state).toBe("offline");
    expect(cta.helperText).toContain("offline");
  });
});
