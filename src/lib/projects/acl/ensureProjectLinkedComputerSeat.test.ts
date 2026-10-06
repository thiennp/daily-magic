import { beforeEach, describe, expect, it, vi } from "vitest";

const upsert = vi.fn();
vi.mock("@/lib/projects/acl/upsertProjectComputerMembership", () => ({
  upsertProjectComputerMembership: (...args: unknown[]) => upsert(...args),
}));

import { ensureProjectLinkedComputerSeat } from "@/lib/projects/acl/ensureProjectLinkedComputerSeat";

describe("ensureProjectLinkedComputerSeat", () => {
  beforeEach(() => {
    upsert.mockReset();
    upsert.mockResolvedValue({ ok: true, membership: {} });
  });

  it("no-ops when deviceId empty or seat already active", async () => {
    expect(
      await ensureProjectLinkedComputerSeat({
        projectId: "p1",
        ownerUserId: "u1",
        deviceId: null,
        members: [],
      }),
    ).toBe(false);
    expect(upsert).not.toHaveBeenCalled();

    expect(
      await ensureProjectLinkedComputerSeat({
        projectId: "p1",
        ownerUserId: "u1",
        deviceId: "dev-1",
        members: [{ memberKind: "computer", deviceId: "dev-1" }],
      }),
    ).toBe(false);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("upserts when linked device has no computer seat", async () => {
    expect(
      await ensureProjectLinkedComputerSeat({
        projectId: "p1",
        ownerUserId: "u1",
        deviceId: "dev-1",
        members: [{ memberKind: "bot", deviceId: null }],
      }),
    ).toBe(true);
    expect(upsert).toHaveBeenCalledWith({
      projectId: "p1",
      ownerUserId: "u1",
      deviceId: "dev-1",
    });
  });

  it("returns false when upsert fails", async () => {
    upsert.mockResolvedValue({ ok: false, code: "device_not_found" });
    expect(
      await ensureProjectLinkedComputerSeat({
        projectId: "p1",
        ownerUserId: "u1",
        deviceId: "dev-1",
        members: [],
      }),
    ).toBe(false);
  });
});
