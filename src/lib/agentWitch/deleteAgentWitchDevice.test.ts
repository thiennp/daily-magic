import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn().mockResolvedValue([]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { deleteAgentWitchDevice } from "@/lib/agentWitch/deleteAgentWitchDevice";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("deleteAgentWitchDevice", () => {
  beforeEach(() => {
    sqlMock.mockClear();
  });

  it("deletes the device row for that user", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "device-1" }]);

    const deleted = await deleteAgentWitchDevice({
      deviceId: "device-1",
      userId: "user-1",
    });

    expect(deleted).toBe(true);
    const sqlText = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(sqlText).toContain("DELETE FROM agent_witch_devices");
    expect(sqlText).not.toContain("revoked_at");
    expect(sqlMock.mock.calls[0]?.[1]).toBe("device-1");
    expect(sqlMock.mock.calls[0]?.[2]).toBe("user-1");
  });

  it("returns false when no row matches", async () => {
    sqlMock.mockResolvedValueOnce([]);

    const deleted = await deleteAgentWitchDevice({
      deviceId: "missing",
      userId: "user-1",
    });

    expect(deleted).toBe(false);
  });
});
