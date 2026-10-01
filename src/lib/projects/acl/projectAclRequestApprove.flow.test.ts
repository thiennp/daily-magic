import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
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
          deviceId: "mac-1",
          name: "Demo",
          folderPath: "/tmp/demo",
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));

const requestRow = {
  id: "req-1",
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
};

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

describe("project ACL request→approve", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("request → approve → active; non-member denied get_project_acl", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("active")) {
        return [];
      }
      if (q.includes("FROM project_access_requests") && q.includes("pending")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        return [requestRow];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const requested = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
    });
    expect(requested.ok).toBe(true);

    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("WITH approved_request AS")) {
        return [
          {
            request_row: requestRow,
            member_row: memberRow,
          },
        ];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
    });
    expect(approved.ok).toBe(true);

    const denied = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "stranger",
    });
    expect(denied.ok).toBe(false);
  });
});
