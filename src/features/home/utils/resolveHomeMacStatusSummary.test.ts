import { describe, expect, it } from "vitest";

import { resolveHomeMacStatusSummary } from "@/features/home/utils/resolveHomeMacStatusSummary";

describe("resolveHomeMacStatusSummary", () => {
  it("reports none when there are no devices", () => {
    expect(resolveHomeMacStatusSummary([]).tone).toBe("none");
  });

  it("reports online when a device is live", () => {
    const summary = resolveHomeMacStatusSummary([
      { isConnected: true, isOnline: true, presenceTier: "live" },
    ]);

    expect(summary.tone).toBe("online");
    expect(summary.label).toBe("Mac online");
  });

  it("reports reconnecting when only live_other_instance presence exists", () => {
    const summary = resolveHomeMacStatusSummary([
      {
        isConnected: false,
        isOnline: true,
        presenceTier: "live_other_instance",
      },
    ]);

    expect(summary.tone).toBe("sleeping");
    expect(summary.label).toBe("Mac reconnecting");
  });

  it("reports sleeping when only recent presence exists", () => {
    const summary = resolveHomeMacStatusSummary([
      { isConnected: false, isOnline: true, presenceTier: "recent" },
    ]);

    expect(summary.tone).toBe("sleeping");
  });
});
