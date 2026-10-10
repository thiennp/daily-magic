import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => rows,
}));

import { reinstateSupersededAgentWitchDevice } from "@/lib/agentWitch/reinstateSupersededAgentWitchDevice";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("reinstateSupersededAgentWitchDevice", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("heals a superseded row whose replacement was deleted, but only by reason", async () => {
    sqlMock
      .mockResolvedValueOnce([{ previous_revoked_at: "2026-10-10T12:00:00Z" }])
      .mockResolvedValueOnce([]);

    await expect(reinstateSupersededAgentWitchDevice("dev-1")).resolves.toBe(
      true,
    );

    const text = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    expect(text).toContain("dev.superseded_by_device_id IS NULL");
    expect(text).toContain("dev.revoked_reason = 'superseded'");
    expect(text).not.toContain("placeholder_sweep");
    expect(text).not.toContain("user_revoked");
    expect(text).toContain("revoked_reason = NULL");
  });

  it("does nothing when no row qualifies", async () => {
    sqlMock.mockResolvedValueOnce([]);

    await expect(reinstateSupersededAgentWitchDevice("dev-2")).resolves.toBe(
      false,
    );
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
