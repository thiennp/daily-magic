import { beforeEach, describe, expect, it, vi } from "vitest";

const getProject = vi.hoisted(() => vi.fn());
const resolveActor = vi.hoisted(() => vi.fn());
const upsertRef = vi.hoisted(() => vi.fn());
const updateFolder = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/resolveFolderRefActor", () => ({
  resolveFolderRefActor: resolveActor,
}));
vi.mock("@/lib/projects/acl/upsertProjectFolderRef", () => ({
  upsertProjectFolderRef: upsertRef,
}));
vi.mock("@/lib/projects/updateUserProjectFolderPath", () => ({
  updateUserProjectFolderPath: updateFolder,
}));

import { applyAgentWitchDeviceProjectPatch } from "@/lib/projects/applyAgentWitchDeviceProjectPatch";

const input = {
  ownerUserId: "member-1",
  deviceId: "dev-m",
  projectId: "p1",
  folderPath: "/Users/me/app",
  hasRepoUpdate: true,
};

describe("applyAgentWitchDeviceProjectPatch for a member's computer", () => {
  beforeEach(() => {
    getProject.mockReset();
    resolveActor.mockReset();
    upsertRef.mockReset();
    updateFolder.mockReset();
    getProject.mockResolvedValue({
      id: "p1",
      ownerUserId: "owner-1",
      folderPath: "/Users/owner/app",
    });
  });

  it("registers a folder ref and leaves the owner's project folder alone", async () => {
    resolveActor.mockResolvedValue({ ok: true, isOwner: false });
    upsertRef.mockResolvedValue({ ok: true });

    const result = await applyAgentWitchDeviceProjectPatch(input);

    expect(upsertRef).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "p1",
        ownerUserId: "member-1",
        deviceId: "dev-m",
        folderPath: "/Users/me/app",
      }),
    );
    expect(updateFolder).not.toHaveBeenCalled();
    expect(result?.folderPath).toBe("/Users/me/app");
  });

  it("rejects a user who is not an active member", async () => {
    resolveActor.mockResolvedValue({ ok: false, code: "forbidden" });
    await expect(applyAgentWitchDeviceProjectPatch(input)).resolves.toBeNull();
    expect(upsertRef).not.toHaveBeenCalled();
  });

  it("returns null when the folder ref cannot be saved", async () => {
    resolveActor.mockResolvedValue({ ok: true, isOwner: false });
    upsertRef.mockResolvedValue({ ok: false, code: "folder_ref_failed" });
    await expect(applyAgentWitchDeviceProjectPatch(input)).resolves.toBeNull();
  });
});
