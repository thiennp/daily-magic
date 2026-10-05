import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const getProjectMock = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
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

import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";

describe("upsertProjectFolderRef notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("schedules folder_refs after insert success", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
    sqlMock
      .mockResolvedValueOnce([]) // existing lookup
      .mockResolvedValueOnce([
        {
          id: "ref-1",
          project_id: "proj-1",
          machine_or_device_ref: "mac-1",
          folder_path: "/tmp/x",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    const result = await upsertProjectFolderRef({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      machineOrDeviceRef: "mac-1",
      folderPath: "/tmp/x",
    });
    expect(result.ok).toBe(true);
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["folder_refs"],
      actorUserId: "owner-1",
    });
  });

  it("does not schedule on forbidden", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "other",
    });
    const result = await upsertProjectFolderRef({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      machineOrDeviceRef: "mac-1",
      folderPath: "/tmp/x",
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
