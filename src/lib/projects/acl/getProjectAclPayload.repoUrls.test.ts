import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { getProjectAclPayloadRepoUrlsBaseProject } from "@/lib/projects/acl/getProjectAclPayload.repoUrls.fixtures";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
const baseProject = getProjectAclPayloadRepoUrlsBaseProject;

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

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
      if (q.includes("FROM users")) {
        return [{ name: "Owner Name", email: "owner@example.com" }];
      }
      if (q.includes("FROM project_memberships") || q.includes("JOIN users")) {
        return [];
      }
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
    expect(payload.self).toBeDefined();
    expect(payload.peers).toEqual([]);
  });

  it("active member with project:meta reads repoUrls", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(baseProject);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_folder_refs")) return [];
      if (q.includes("JOIN users") && q.includes("project_memberships")) {
        return [];
      }
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
            project_display_name: null,
            created_at: "2026-10-01T00:00:00.000Z",
            revoked_at: null,
          },
        ];
      }
      if (q.includes("SELECT email FROM users")) {
        return [{ email: "member@agents.agentwitch.com" }];
      }
      if (q.includes("FROM users") && q.includes("WHERE id =")) {
        return [{ name: "Owner Name", email: "owner@example.com" }];
      }
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
    expect(payload.self.projectDisplayName).toBeNull();
    expect(payload.peers.some((p) => p.isOwner)).toBe(true);
  });
});
