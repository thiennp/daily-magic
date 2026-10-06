import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

const baseProject = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: null,
  name: "Demo",
  folderPath: "/tmp",
  repoUrls: ["https://github.com/org/demo.git"],
  defaultBranch: "main",
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

describe("getProjectAclPayload repoUrls AuthZ", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
  });

  it("owner reads repoUrls + defaultBranch", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(baseProject);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_folder_refs")) return [];
      return [];
    });

    const payload = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(payload.ok).toBe(true);
    if (!payload.ok) return;
    expect(payload.repoUrls).toEqual(["https://github.com/org/demo.git"]);
    expect(payload.defaultBranch).toBe("main");
    expect(payload.relation).toBe("owner");
  });

  it("active member with project:meta reads repoUrls", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(baseProject);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) {
        return [
          {
            id: "mem-1",
            project_id: "proj-1",
            user_id: "member-1",
            role: "member",
            status: "active",
            team_label: null,
            scopes: ["acl:self", "project:meta", "peer_sync"],
            created_at: "2026-10-01T00:00:00.000Z",
            revoked_at: null,
          },
        ];
      }
      if (q.includes("FROM project_folder_refs")) return [];
      return [];
    });

    const payload = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    expect(payload.ok).toBe(true);
    if (!payload.ok) return;
    expect(payload.repoUrls).toEqual(["https://github.com/org/demo.git"]);
    expect(payload.defaultBranch).toBe("main");
    expect(payload.relation).toBe("member");
  });

  it("non-member cannot read repoUrls", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(baseProject);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });

    const payload = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "stranger-1",
    });
    expect(payload).toEqual({ ok: false, code: "forbidden" });
  });
});
