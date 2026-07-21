import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  getSql: vi.fn(),
  asRowArray: (value: unknown) => value,
}));

import { upgradeAgentWitchDeviceLabelFromLegacyHostname } from "@/lib/agentWitch/upgradeAgentWitchDeviceLabelFromLegacyHostname";

describe("upgradeAgentWitchDeviceLabelFromLegacyHostname", () => {
  it("AGENT-048: skips non-composite labels without touching the database", async () => {
    await expect(
      upgradeAgentWitchDeviceLabelFromLegacyHostname({
        deviceId: "device-1",
        userId: "user-1",
        installDeviceLabel: "L92KQX615Q",
      }),
    ).resolves.toBeNull();
  });
});
