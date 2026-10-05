import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const clearAgentWitchDevicePublicKey = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/agentWitch/updateAgentWitchDeviceAuthFields", () => ({
  clearAgentWitchDevicePublicKey: (...args: readonly unknown[]) =>
    clearAgentWitchDevicePublicKey(...args),
}));

import { rotatePairingTokenOnExistingDevice } from "@/lib/agentWitch/rotatePairingTokenOnExistingDevice";

const claimedRow = {
  id: "device-1",
  user_id: "user-1",
  device_label: "MKX52CMWN7#owner",
  display_name: "Studio Mac",
  dispatch_policy: null,
  claimed_at: "2026-09-28T00:00:00.000Z",
  last_seen_at: "2026-10-05T00:00:00.000Z",
  revoked_at: null,
};

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("rotatePairingTokenOnExistingDevice", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    clearAgentWitchDevicePublicKey.mockReset();
    clearAgentWitchDevicePublicKey.mockResolvedValue(undefined);
  });

  it("clears the pinned public_key when rotating a pairing token onto an existing device", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([claimedRow]);

    const rotated = await rotatePairingTokenOnExistingDevice({
      deviceId: "device-1",
      userId: "user-1",
      tokenHash: "new-token-hash",
      deviceLabel: "MKX52CMWN7#owner",
    });

    expect(rotated?.id).toBe("device-1");
    expect(clearAgentWitchDevicePublicKey).toHaveBeenCalledWith({
      deviceId: "device-1",
    });

    expect(sqlMock).toHaveBeenCalledTimes(2);
    const assignSql = sqlTextOf(sqlMock.mock.calls[1] ?? []);
    expect(assignSql).toContain("public_key = NULL");
    expect(assignSql).toContain("token_hash =");
    expect(assignSql).toContain("device_label = COALESCE");
    expect(assignSql).not.toContain("last_handshake_at");
    expect(assignSql).not.toContain("install_bundle_version");
    expect(assignSql).not.toContain("display_name =");
  });

  it("does not clear public_key when the ownership UPDATE matches no row", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const rotated = await rotatePairingTokenOnExistingDevice({
      deviceId: "device-1",
      userId: "other-user",
      tokenHash: "new-token-hash",
      deviceLabel: null,
    });

    expect(rotated).toBeNull();
    expect(clearAgentWitchDevicePublicKey).not.toHaveBeenCalled();
  });
});
