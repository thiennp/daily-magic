import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const updateFolderMock = vi.hoisted(() => vi.fn());
const updateProjectMock = vi.hoisted(() => vi.fn());
const getProjectMock = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/updateUserProjectFolderPath", () => ({
  updateUserProjectFolderPath: (...args: unknown[]) => updateFolderMock(...args),
}));
vi.mock("@/lib/projects/updateUserProject", () => ({
  updateUserProject: (...args: unknown[]) => updateProjectMock(...args),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
}));
// The real upsertProjectFolderRef runs (folder ref leaf write); only its I/O is mocked.
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/isActiveProjectComputerMemberDevice", () => ({
  isActiveProjectComputerMemberDevice: async () => true,
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
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
    sqlMock.mockReset();
    getProjectMock.mockResolvedValue({ id: "proj-1", ownerUserId: "owner-1" });
  });

  it("does not re-schedule at orchestrator; leaf writes own schedule (folder ref = 1)", async () => {
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
    const now = new Date().toISOString();
    const refRow = { id: "ref-1", project_id: "proj-1", machine_or_device_ref: "dev-1" };
    sqlMock
      .mockResolvedValueOnce([]) // existing lookup
      .mockResolvedValueOnce([{ ...refRow, folder_path: "/new", created_at: now, updated_at: now }]);

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
    // Only the folder ref upsert (leaf) schedules; the orchestrator adds none.
    expect(scheduleMock).toHaveBeenCalledTimes(1);
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["folder_refs"],
      actorUserId: "owner-1",
    });
  });

  it("folder ref failure is logged, never fails the patch", async () => {
    const project = { id: "proj-1", ownerUserId: "owner-1", folderPath: "/new" };
    updateFolderMock.mockResolvedValue(project);
    sqlMock.mockRejectedValue(new Error("db down"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = await applyAgentWitchDeviceProjectPatch({
      ownerUserId: "owner-1",
      deviceId: "dev-1",
      projectId: "proj-1",
      folderPath: "/new",
      hasRepoUpdate: false,
    });

    expect(result).toBe(project);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(scheduleMock).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
