import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import {
  clearAgentWitchDevicePublicKey,
  getAgentWitchDevicePublicKey,
} from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("getAgentWitchDevicePublicKey / clearAgentWitchDevicePublicKey", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns the trimmed public_key when present", async () => {
    sqlMock.mockResolvedValueOnce([{ public_key: "  abc123  " }]);

    await expect(
      getAgentWitchDevicePublicKey({ deviceId: "device-1" }),
    ).resolves.toBe("abc123");

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain("SELECT public_key");
    expect(sqlText).toContain("revoked_at IS NULL");
    expect(sqlMock.mock.calls[0]?.[1]).toBe("device-1");
  });

  it("returns null when public_key is missing or blank", async () => {
    sqlMock.mockResolvedValueOnce([{ public_key: null }]);
    await expect(
      getAgentWitchDevicePublicKey({ deviceId: "device-1" }),
    ).resolves.toBeNull();

    sqlMock.mockResolvedValueOnce([{ public_key: "   " }]);
    await expect(
      getAgentWitchDevicePublicKey({ deviceId: "device-1" }),
    ).resolves.toBeNull();

    sqlMock.mockResolvedValueOnce([]);
    await expect(
      getAgentWitchDevicePublicKey({ deviceId: "missing" }),
    ).resolves.toBeNull();
  });

  it("clears public_key for the device id", async () => {
    sqlMock.mockResolvedValueOnce([]);

    await clearAgentWitchDevicePublicKey({ deviceId: "device-1" });

    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain("SET public_key = NULL");
    expect(sqlMock.mock.calls[0]?.[1]).toBe("device-1");
  });
});
