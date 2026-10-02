import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectPeers } from "@/lib/projects/acl/messaging/listProjectPeers";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";
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

describe("listProjectPeers member roster", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(listProjectPeersBaseProject);
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
        if (q.includes("SELECT email FROM users")) {
          return [{ email: "bot@agents.agentwitch.com" }];
        }
        return [{ name: "Thien", email: "thien@example.com" }];
      }
      if (q.includes("JOIN users") && q.includes("project_memberships")) {
        return [
          {
            id: "mem-nameless",
            project_display_name: null,
            team_label: null,
            email: "nameless@agents.agentwitch.com",
          },
          {
            id: "mem-zed",
            project_display_name: "Zed",
            team_label: "beta",
            email: "zed@agents.agentwitch.com",
          },
          {
            id: "mem-ada",
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
      membershipId: "mem-self",
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
    expect(result.peers.find((p) => p.isOwner)).toEqual({
      membershipId: null,
      projectDisplayName: "Thien",
      teamLabel: null,
      isAgent: false,
      isOwner: true,
    });
    expect(result.peers.find((p) => p.projectDisplayName === "Ada")).toMatchObject({
      membershipId: "mem-ada",
    });
    expect(
      result.peers.filter((p) => !p.isOwner).every((p) => p.isOwner === false),
    ).toBe(true);
  });
});
