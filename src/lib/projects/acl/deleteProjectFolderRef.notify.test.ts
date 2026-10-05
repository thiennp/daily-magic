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

import { deleteProjectFolderRef } from "@/lib/projects/acl/deleteProjectFolderRef";

describe("deleteProjectFolderRef notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("schedules after delete success", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
    sqlMock.mockResolvedValueOnce([{ id: "ref-1" }]);
    await expect(
      deleteProjectFolderRef({
        projectId: "proj-1",
        refId: "ref-1",
        ownerUserId: "owner-1",
      }),
    ).resolves.toEqual({ ok: true });
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["folder_refs"],
      actorUserId: "owner-1",
    });
  });

  it("does not schedule when ref is missing", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
    sqlMock.mockResolvedValueOnce([]);
    await expect(
      deleteProjectFolderRef({
        projectId: "proj-1",
        refId: "missing",
        ownerUserId: "owner-1",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
