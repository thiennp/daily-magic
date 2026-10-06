import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({ id: "proj-1", ownerUserId: "owner-1" }),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: async () => ({ scheduled: true }),
}));

import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const base = {
  projectId: "proj-1",
  ownerUserId: "owner-1",
  folderPath: "/Users/a/demo",
};

describe("upsertProjectFolderRef device ACL", () => {
  beforeEach(() => sqlMock.mockReset());

  it("rejects a non-member deviceId before any folder-ref SQL", async () => {
    const isComputerMember = vi.fn(async () => false);
    const result = await upsertProjectFolderRef({
      ...base,
      machineOrDeviceRef: "",
      deviceId: DEVICE,
      isComputerMember,
    });
    expect(result).toEqual({ ok: false, code: "folder_ref_device_not_member" });
    expect(isComputerMember).toHaveBeenCalledWith({
      projectId: "proj-1",
      deviceId: DEVICE,
    });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("stores the deviceId as the ref when the computer is a member", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        id: "ref-1",
        project_id: "proj-1",
        machine_or_device_ref: DEVICE,
        folder_path: "/Users/a/demo",
        created_at: "2026-10-06T00:00:00.000Z",
        updated_at: "2026-10-06T00:00:00.000Z",
      },
    ]);
    const result = await upsertProjectFolderRef({
      ...base,
      machineOrDeviceRef: DEVICE,
      isComputerMember: async () => true,
    });
    expect(result.ok).toBe(true);
    expect(sqlMock.mock.calls[1]).toContain(DEVICE);
  });
});
