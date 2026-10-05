import { beforeEach, describe, expect, it, vi } from "vitest";

const upsert = vi.hoisted(() => vi.fn());
const revoke = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/upsertProjectComputerMembership", () => ({
  upsertProjectComputerMembership: upsert,
}));
vi.mock("@/lib/projects/acl/revokeProjectComputerMembershipsForDevice", () => ({
  revokeProjectComputerMembershipsForDevice: revoke,
}));

import { syncProjectComputerMembership } from "@/lib/projects/acl/syncProjectComputerMembership";

describe("syncProjectComputerMembership", () => {
  beforeEach(() => {
    upsert.mockReset().mockResolvedValue({ ok: true });
    revoke.mockReset().mockResolvedValue([]);
  });

  it("upserts when binding a new device", async () => {
    await syncProjectComputerMembership({
      projectId: "p1",
      ownerUserId: "u1",
      previousDeviceId: null,
      nextDeviceId: "d1",
    });
    expect(revoke).not.toHaveBeenCalled();
    expect(upsert).toHaveBeenCalledWith({
      projectId: "p1",
      ownerUserId: "u1",
      deviceId: "d1",
    });
  });

  it("revokes old and upserts new on retarget", async () => {
    await syncProjectComputerMembership({
      projectId: "p1",
      ownerUserId: "u1",
      previousDeviceId: "d-old",
      nextDeviceId: "d-new",
    });
    expect(revoke).toHaveBeenCalledWith({
      deviceId: "d-old",
      projectId: "p1",
    });
    expect(upsert).toHaveBeenCalledWith({
      projectId: "p1",
      ownerUserId: "u1",
      deviceId: "d-new",
    });
  });

  it("revokes only when unbinding", async () => {
    await syncProjectComputerMembership({
      projectId: "p1",
      ownerUserId: "u1",
      previousDeviceId: "d1",
      nextDeviceId: null,
    });
    expect(revoke).toHaveBeenCalledWith({ deviceId: "d1", projectId: "p1" });
    expect(upsert).not.toHaveBeenCalled();
  });

  it("re-upserts when device unchanged (refresh name)", async () => {
    await syncProjectComputerMembership({
      projectId: "p1",
      ownerUserId: "u1",
      previousDeviceId: "d1",
      nextDeviceId: "d1",
    });
    expect(revoke).not.toHaveBeenCalled();
    expect(upsert).toHaveBeenCalledWith({
      projectId: "p1",
      ownerUserId: "u1",
      deviceId: "d1",
    });
  });
});
