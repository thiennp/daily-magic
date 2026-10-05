import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn().mockResolvedValue([]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

import { revokePendingInstallDevicesForUser } from "@/lib/agentWitch/revokePendingInstallDevicesForUser";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("revokePendingInstallDevicesForUser (HOME-059)", () => {
  beforeEach(() => {
    sqlMock.mockClear();
  });

  it("HOME-065: revokes all placeholders when the account already has a live Mac", async () => {
    await revokePendingInstallDevicesForUser({
      userId: "user-1",
      hasLiveMac: true,
    });

    expect(sqlMock).toHaveBeenCalledTimes(1);
    const revokeSql = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(revokeSql).toContain("SET revoked_at = NOW()");
    expect(revokeSql).not.toContain("ORDER BY newest.claimed_at DESC");
  });

  it("revokes extra unlabeled install placeholders and keeps the newest", async () => {
    await revokePendingInstallDevicesForUser({ userId: "user-1" });

    expect(sqlMock).toHaveBeenCalledTimes(2);
    const revokeSql = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(revokeSql).toContain("install_bundle_version IS NULL");
    expect(revokeSql).toContain("public_key IS NULL");
    expect(revokeSql).toContain("last_handshake_at IS NULL");
    expect(revokeSql).toContain("btrim(device.device_label)");
    expect(revokeSql).toContain("ORDER BY newest.claimed_at DESC");
    expect(revokeSql).not.toContain("last_seen_at IS NULL");
    expect(sqlMock.mock.calls[0]?.[1]).toBe("user-1");

    const clearSeenSql = sqlTextOf(sqlMock.mock.calls[1] ?? []);
    expect(clearSeenSql).toContain("SET last_seen_at = NULL");
    expect(clearSeenSql).toContain("install_bundle_version IS NULL");
    expect(clearSeenSql).not.toContain("last_seen_at IS NULL");
  });

  it("keeps live re-paired computers: SQL still requires empty label/handshake/bundle even when public_key is null", async () => {
    await revokePendingInstallDevicesForUser({
      userId: "user-1",
      hasLiveMac: true,
    });

    const revokeSql = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    // A re-pair clears public_key but keeps label/handshake/bundle/display_name.
    // Placeholder revoke must still require those to be empty, or a live Mac
    // would be revoked after re-pair.
    expect(revokeSql).toContain("public_key IS NULL");
    expect(revokeSql).toContain("last_handshake_at IS NULL");
    expect(revokeSql).toContain("install_bundle_version IS NULL");
    expect(revokeSql).toContain("btrim(device.device_label)");
    expect(revokeSql).toContain("btrim(device.display_name)");
  });
});
