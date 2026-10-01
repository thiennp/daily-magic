import { beforeEach, describe, expect, it, vi } from "vitest";

import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (projectId: string) =>
    projectId === "proj-1"
      ? {
          id: "proj-1",
          ownerUserId: "owner-1",
          deviceId: null,
          name: "Demo",
          folderPath: "/tmp",
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));

describe("expire stale project access requests", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("treats expired pending as none and allows a new request", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (
        q.includes("UPDATE project_access_requests") &&
        q.includes("expired")
      ) {
        return [];
      }
      if (q.includes("FROM project_memberships")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("pending")) {
        return [];
      }
      if (q.includes("FROM project_memberships") && q.includes("revoked")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        return [
          {
            id: "req-2",
            project_id: "proj-1",
            requester_user_id: "bot-1",
            invited_by_user_id: null,
            reason: null,
            requested_scopes: ["acl:self", "project:meta", "peer_sync"],
            status: "pending",
            decided_by_user_id: null,
            decided_at: null,
            created_at: "2026-10-01T00:00:00.000Z",
            expires_at: "2026-10-15T00:00:00.000Z",
          },
        ];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const status = await checkProjectMembershipStatus("proj-1", "bot-1");
    expect(status).toBe("none");

    const created = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
    });
    expect(created.ok).toBe(true);
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("SET status = 'expired'"),
      ),
    ).toBe(true);
  });
});
