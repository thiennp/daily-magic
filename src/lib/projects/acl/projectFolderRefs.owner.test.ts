import { beforeEach, describe, expect, it, vi } from "vitest";

import { deleteProjectFolderRef } from "@/lib/projects/acl/deleteProjectFolderRef";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
    deviceId: "mac-1",
    name: "Demo",
    folderPath: "/tmp/demo",
    repoUrls: [],
    defaultBranch: null,
    lastUsedAt: null,
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
  })),
}));

describe("project folder refs owner-only", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("allows owner upsert and rejects non-owner", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("SELECT * FROM project_folder_refs")) return [];
      if (q.includes("INSERT INTO project_folder_refs")) {
        return [
          {
            id: "ref-1",
            project_id: "proj-1",
            machine_or_device_ref: "mac-a",
            folder_path: "/Users/a/proj",
            created_at: "2026-10-01T00:00:00.000Z",
            updated_at: "2026-10-01T00:00:00.000Z",
          },
        ];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const ok = await upsertProjectFolderRef({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      machineOrDeviceRef: "mac-a",
      folderPath: "/Users/a/proj",
    });
    expect(ok.ok).toBe(true);

    const denied = await upsertProjectFolderRef({
      projectId: "proj-1",
      ownerUserId: "bot-1",
      machineOrDeviceRef: "mac-a",
      folderPath: "/Users/a/proj",
    });
    expect(denied.ok).toBe(false);
    if (!denied.ok) {
      expect(denied.code).toBe("forbidden");
    }
  });

  it("allows owner delete", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("DELETE FROM project_folder_refs")) {
        return [{ id: "ref-1" }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const result = await deleteProjectFolderRef({
      projectId: "proj-1",
      refId: "ref-1",
      ownerUserId: "owner-1",
    });
    expect(result.ok).toBe(true);
  });
});
