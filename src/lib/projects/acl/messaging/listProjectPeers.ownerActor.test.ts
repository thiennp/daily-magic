import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectPeersForOwnerActor } from "@/lib/projects/acl/messaging/listProjectPeers";
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

describe("listProjectPeersForOwnerActor", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(listProjectPeersBaseProject);
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
            id: "mem-buni",
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
      membershipId: null,
      projectDisplayName: "Thien",
      teamLabel: null,
      isAgent: false,
    });
    expect(result.peers).toEqual([
      {
        membershipId: "mem-buni",
        projectDisplayName: "Buni",
        teamLabel: null,
        isAgent: true,
        isOwner: false,
      },
    ]);
  });
});
