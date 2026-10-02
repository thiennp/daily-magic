import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  listProjectPeers,
  listProjectPeersForOwnerActor,
} from "@/lib/projects/acl/messaging/listProjectPeers";
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
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

describe("listProjectPeers", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(baseProject);
  });

  it("forbids non-members", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });

    await expect(
      listProjectPeers({ projectId: "proj-1", actorUserId: "bot-1" }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
  });

  it("returns self, named peers first, and owner as isOwner", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (
        q.includes("FROM project_memberships") &&
        q.includes("user_id =") &&
        q.includes("status = 'active'") &&
        !q.includes("JOIN users")
      ) {
        return [
          {
            id: "mem-self",
            project_id: "proj-1",
            user_id: "bot-1",
            role: "member",
            status: "active",
            team_label: "alpha",
            scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
            project_display_name: "Buni",
            created_at: "2026-10-01T00:00:00.000Z",
            revoked_at: null,
          },
        ];
      }
      if (q.includes("FROM users") && q.includes("WHERE id =")) {
        // actor isAgent check OR owner profile
        if (q.includes("SELECT email FROM users")) {
          return [{ email: "bot@agents.agentwitch.com" }];
        }
        return [{ name: "Thien", email: "thien@example.com" }];
      }
      if (q.includes("JOIN users") && q.includes("project_memberships")) {
        return [
          {
            project_display_name: null,
            team_label: null,
            email: "nameless@agents.agentwitch.com",
          },
          {
            project_display_name: "Zed",
            team_label: "beta",
            email: "zed@agents.agentwitch.com",
          },
          {
            project_display_name: "Ada",
            team_label: null,
            email: "ada@agents.agentwitch.com",
          },
        ];
      }
      return [];
    });

    const result = await listProjectPeers({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.self).toEqual({
      projectDisplayName: "Buni",
      teamLabel: "alpha",
      isAgent: true,
    });
    expect(result.peers.map((p) => p.projectDisplayName)).toEqual([
      "Ada",
      "Thien",
      "Zed",
      null,
    ]);
    const owner = result.peers.find((p) => p.isOwner);
    expect(owner).toEqual({
      projectDisplayName: "Thien",
      teamLabel: null,
      isAgent: false,
      isOwner: true,
    });
    expect(result.peers.filter((p) => !p.isOwner).every((p) => p.isOwner === false)).toBe(
      true,
    );
  });

  it("owner actor lists members as peers and self as Owner name", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM users") && q.includes("WHERE id =")) {
        return [{ name: "Thien", email: "thien@example.com" }];
      }
      if (q.includes("JOIN users") && q.includes("project_memberships")) {
        return [
          {
            project_display_name: "Buni",
            team_label: null,
            email: "bot@agents.agentwitch.com",
          },
        ];
      }
      return [];
    });

    const result = await listProjectPeersForOwnerActor({
      projectId: "proj-1",
      ownerUserId: "owner-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.self).toEqual({
      projectDisplayName: "Thien",
      teamLabel: null,
      isAgent: false,
    });
    expect(result.peers).toEqual([
      {
        projectDisplayName: "Buni",
        teamLabel: null,
        isAgent: true,
        isOwner: false,
      },
    ]);
  });
});
