import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { insertAgentWitchDeviceClaim } from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";

const claimedRow = {
  id: "device-1",
  user_id: "user-1",
  platform: "mac",
  device_label: null,
  display_name: null,
  dispatch_policy: null,
  claimed_at: "2026-09-28T00:00:00.000Z",
  last_seen_at: null,
  revoked_at: null,
};

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("insertAgentWitchDeviceClaim (HOME-059)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([claimedRow]);
  });

  it("leaves last_seen_at unset for a Connect this computer placeholder", async () => {
    const device = await insertAgentWitchDeviceClaim({
      userId: "user-1",
      tokenHash: "hash-1",
      deviceLabel: null,
      recordLastSeen: false,
    });

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain(
      "INSERT INTO agent_witch_devices (user_id, token_hash, device_label, platform)",
    );
    expect(sqlText).not.toContain("last_seen_at)");
    expect(device.lastSeenAt).toBeNull();
  });

  it("stamps last_seen_at when a real check-in claims the device", async () => {
    await insertAgentWitchDeviceClaim({
      userId: "user-1",
      tokenHash: "hash-1",
      deviceLabel: "MKX52CMWN7",
    });

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain("last_seen_at)");
    expect(sqlText).toContain("NOW()");
  });
});
