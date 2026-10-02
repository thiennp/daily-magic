import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { mintProjectAllowClaim } from "@/lib/projects/acl/mintProjectAllowClaim";
import { revokeProjectMembership } from "@/lib/projects/acl/revokeProjectMembership";
import { verifyProjectAllowClaim } from "@/lib/projects/acl/verifyProjectAllowClaim";

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

const memberRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync"],
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};

describe("project ACL revoke allow-claim", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    process.env.AUTH_SECRET = "test-secret-for-allow-claim";
  });

  it("revoke → deny allow-claim even before expiry", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("active")) {
        return [memberRow];
      }
      return [];
    });

    const minted = await mintProjectAllowClaim({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(minted.ok).toBe(true);

    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("UPDATE project_memberships")) {
        return [{ ...memberRow, status: "revoked", revoked_at: "2026-10-01" }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      if (q.includes("FROM project_memberships") && q.includes("active")) {
        return [];
      }
      return [];
    });

    const revoked = await revokeProjectMembership({
      projectId: "proj-1",
      membershipId: "mem-1",
      ownerUserId: "owner-1",
    });
    expect(revoked.ok).toBe(true);

    if (minted.ok) {
      const verified = await verifyProjectAllowClaim(minted.allowClaim);
      expect(verified.ok).toBe(false);
      if (!verified.ok) {
        expect(verified.code).toBe("revoked");
      }
    }
  });
});
