import { beforeEach, describe, expect, it, vi } from "vitest";

const setLinked = vi.hoisted(() => vi.fn());
const getProjectMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/setUserProjectLinkedDevice", () => ({
  setUserProjectLinkedDevice: setLinked,
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: vi.fn(async () => ({ scheduled: true })),
}));

import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";
import { applyAgentWitchDeviceProjectPatch } from "@/lib/projects/applyAgentWitchDeviceProjectPatch";

describe("Connect path routes device_id through seat choke point", () => {
  beforeEach(() => {
    setLinked.mockReset();
    getProjectMock.mockReset();
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      deviceId: null,
      folderPath: null,
    });
    setLinked.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "dev-1",
      name: "infusion",
      folderPath: "/Users/t/code",
      repoUrls: [],
      defaultBranch: null,
      lastUsedAt: null,
      createdAt: "2026-10-05T00:00:00.000Z",
      updatedAt: "2026-10-05T00:00:00.000Z",
    });
  });

  it("updateUserProjectFolderPath bind/rebind calls setUserProjectLinkedDevice", async () => {
    await updateUserProjectFolderPath(
      "owner-1",
      "proj-1",
      "/Users/t/code",
      "dev-1",
    );
    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-1",
      folderPath: "/Users/t/code",
    });
  });

  it("applyAgentWitchDeviceProjectPatch bind uses folder-path choke", async () => {
    await applyAgentWitchDeviceProjectPatch({
      ownerUserId: "owner-1",
      deviceId: "dev-1",
      projectId: "proj-1",
      folderPath: "/Users/t/code",
      hasRepoUpdate: false,
    });
    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-1",
      folderPath: "/Users/t/code",
    });
  });
});
