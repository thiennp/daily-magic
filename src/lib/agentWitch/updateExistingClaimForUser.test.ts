import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { updateExistingClaimForUser } from "@/lib/agentWitch/updateExistingClaimForUser";

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

describe("updateExistingClaimForUser (HOME-059)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([claimedRow]);
  });

  it("does not stamp last_seen_at when reserving an install placeholder", async () => {
    await updateExistingClaimForUser({
      tokenHash: "hash-1",
      userId: "user-1",
      deviceLabel: null,
      unrevoke: false,
      recordLastSeen: false,
    });

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).not.toContain("last_seen_at = NOW()");
    expect(sqlText).toContain("device_label = COALESCE");
  });

  it("stamps last_seen_at on a real check-in update", async () => {
    await updateExistingClaimForUser({
      tokenHash: "hash-1",
      userId: "user-1",
      deviceLabel: "MKX52CMWN7",
      unrevoke: false,
    });

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain("last_seen_at = NOW()");
  });
});
