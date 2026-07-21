import { describe, expect, it } from "vitest";

import { resolveAgentWitchInstallDeviceLabel } from "@/lib/agentWitch/resolveAgentWitchInstallDeviceLabel";

describe("resolveAgentWitchInstallDeviceLabel", () => {
  it("AGENT-048: different macOS users get different install labels", () => {
    const userA = resolveAgentWitchInstallDeviceLabel({
      hostname: "L92KQX615Q",
      macOsUsername: "userA",
    });
    const userB = resolveAgentWitchInstallDeviceLabel({
      hostname: "L92KQX615Q",
      macOsUsername: "userB",
    });

    expect(userA).toBe("L92KQX615Q#usera");
    expect(userB).toBe("L92KQX615Q#userb");
    expect(userA).not.toBe(userB);
  });

  it("AGENT-006: same macOS user reconnect keeps the same install label", () => {
    expect(
      resolveAgentWitchInstallDeviceLabel({
        hostname: "L92KQX615Q",
        macOsUsername: "thiennguyen",
      }),
    ).toBe(
      resolveAgentWitchInstallDeviceLabel({
        hostname: "L92KQX615Q",
        macOsUsername: "ThienNguyen",
      }),
    );
  });

  it("AGENT-006: legacy hostname-only payloads stay bare", () => {
    expect(
      resolveAgentWitchInstallDeviceLabel({ hostname: "Studio-Mac" }),
    ).toBe("Studio-Mac");
  });
});
