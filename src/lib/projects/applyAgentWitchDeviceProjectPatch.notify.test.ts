import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const updateFolderMock = vi.hoisted(() => vi.fn());
const updateProjectMock = vi.hoisted(() => vi.fn());
const getProjectMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/updateUserProjectFolderPath", () => ({
  updateUserProjectFolderPath: (
    ownerUserId: unknown,
    projectId: unknown,
    folderPath: unknown,
    deviceId: unknown,
  ) => updateFolderMock(ownerUserId, projectId, folderPath, deviceId),
}));
vi.mock("@/lib/projects/updateUserProject", () => ({
  updateUserProject: (
    ownerUserId: unknown,
    projectId: unknown,
    input: unknown,
  ) => updateProjectMock(ownerUserId, projectId, input),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: (input: unknown) => scheduleMock(input),
}));

import { applyAgentWitchDeviceProjectPatch } from "@/lib/projects/applyAgentWitchDeviceProjectPatch";

describe("applyAgentWitchDeviceProjectPatch notify (Arch A)", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    updateFolderMock.mockReset();
    updateProjectMock.mockReset();
    getProjectMock.mockReset();
  });

  it("does not re-schedule at orchestrator; leaf writes own schedule", async () => {
    updateFolderMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      folderPath: "/new",
    });
    updateProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      folderPath: "/new",
      repoUrls: ["https://example.com/r.git"],
    });

    await applyAgentWitchDeviceProjectPatch({
      ownerUserId: "owner-1",
      deviceId: "dev-1",
      projectId: "proj-1",
      folderPath: "/new",
      repoUrls: ["https://example.com/r.git"],
      hasRepoUpdate: true,
    });

    expect(updateFolderMock).toHaveBeenCalledTimes(1);
    expect(updateProjectMock).toHaveBeenCalledTimes(1);
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
