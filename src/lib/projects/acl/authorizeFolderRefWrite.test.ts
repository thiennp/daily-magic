import { beforeEach, describe, expect, it, vi } from "vitest";

const resolveActor = vi.hoisted(() => vi.fn());
const seatingOwner = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/resolveFolderRefActor", () => ({
  resolveFolderRefActor: resolveActor,
}));
vi.mock("@/lib/projects/acl/seatOwnerPickedComputer", () => ({
  checkFolderRefAclSeatingOwnerDevice: seatingOwner,
}));

import { authorizeFolderRefWrite } from "@/lib/projects/acl/authorizeFolderRefWrite";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const base = {
  projectId: "p1",
  actorUserId: "u2",
  machineOrDeviceRef: DEVICE,
  deviceId: DEVICE,
};

describe("authorizeFolderRefWrite", () => {
  beforeEach(() => {
    resolveActor.mockReset();
    seatingOwner.mockReset();
  });

  it("passes an owner to the seat-aware project-computer check", async () => {
    resolveActor.mockResolvedValue({ ok: true, isOwner: true });
    seatingOwner.mockResolvedValue({ ok: true, ref: DEVICE });
    expect(
      await authorizeFolderRefWrite({ ...base, ownerUserId: "u2" }),
    ).toEqual({
      ok: true,
      ref: DEVICE,
    });
  });

  it("lets a member use a computer they registered", async () => {
    resolveActor.mockResolvedValue({ ok: true, isOwner: false });
    const isActorDevice = vi.fn(async () => true);
    expect(
      await authorizeFolderRefWrite({
        ...base,
        ownerUserId: "u2",
        isActorDevice,
      }),
    ).toEqual({ ok: true, ref: DEVICE });
    expect(isActorDevice).toHaveBeenCalledWith({
      userId: "u2",
      deviceId: DEVICE,
    });
  });

  it("refuses a member's folder on someone else's computer or a free-text label", async () => {
    resolveActor.mockResolvedValue({ ok: true, isOwner: false });
    expect(
      await authorizeFolderRefWrite({
        ...base,
        ownerUserId: "u2",
        isActorDevice: async () => false,
      }),
    ).toEqual({ ok: false, code: "folder_ref_device_not_member" });
    expect(
      await authorizeFolderRefWrite({
        ...base,
        ownerUserId: "u2",
        machineOrDeviceRef: "my laptop",
        deviceId: null,
      }),
    ).toEqual({ ok: false, code: "folder_ref_invalid_device" });
  });

  it("refuses viewers and outsiders", async () => {
    resolveActor.mockResolvedValue({ ok: false, code: "forbidden" });
    expect(
      await authorizeFolderRefWrite({ ...base, ownerUserId: "u2" }),
    ).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
