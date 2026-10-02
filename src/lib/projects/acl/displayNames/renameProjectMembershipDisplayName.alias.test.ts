import { beforeEach, describe, expect, it, vi } from "vitest";

import { renameProjectMembershipDisplayName } from "@/lib/projects/acl/displayNames/renameProjectMembershipDisplayName";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { storeProjectDisplayNameAlias } from "@/lib/projects/acl/displayNames/storeProjectDisplayNameAlias";
import { notifyProjectPeersOfMembershipRename } from "@/lib/projects/acl/messaging/notifyProjectPeersOfMembershipRename";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";
import { ACL_APPROVE_MEMBER_ROW } from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));
vi.mock("@/lib/projects/acl/displayNames/storeProjectDisplayNameAlias", () => ({
  storeProjectDisplayNameAlias: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/messaging/notifyProjectPeersOfMembershipRename", () => ({
  notifyProjectPeersOfMembershipRename: vi.fn(async () => ({ notifiedPeerCount: 0 })),
}));

describe("renameProjectMembershipDisplayName alias + peer.renamed", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(storeProjectDisplayNameAlias).mockClear();
    vi.mocked(notifyProjectPeersOfMembershipRename).mockClear();
  });

  it("stores previous name alias and emits peer.renamed", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE") || q.includes("CREATE INDEX")) {
        return [];
      }
      if (q.includes("FROM project_memberships") && q.includes("SELECT *")) {
        return [{ ...ACL_APPROVE_MEMBER_ROW, project_display_name: "Ada" }];
      }
      if (q.includes("UPDATE project_memberships") && q.includes("project_display_name")) {
        return [{ ...ACL_APPROVE_MEMBER_ROW, project_display_name: "Ada Prime" }];
      }
      return [];
    });
    const result = await renameProjectMembershipDisplayName({
      projectId: "proj-1",
      membershipId: "mem-1",
      ownerUserId: "owner-1",
      projectDisplayName: "Ada Prime",
    });
    expect(result.ok).toBe(true);
    expect(storeProjectDisplayNameAlias).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        membershipId: "mem-1",
        previousDisplayName: "Ada",
      }),
    );
    expect(notifyProjectPeersOfMembershipRename).toHaveBeenCalledWith(
      expect.objectContaining({
        previousDisplayName: "Ada",
        projectDisplayName: "Ada Prime",
      }),
    );
  });
});
