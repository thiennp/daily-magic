import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  ACL_APPROVE_MEMBER_ROW,
  ACL_APPROVE_REQUEST_ROW,
} from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  isAgentUserId: vi.fn(async () => true),
  loadUserProfilesByIds: vi.fn(async () => new Map()),
}));
vi.mock("@/lib/projects/acl/projectApiKeys/mintProjectApiKey", () => ({
  mintProjectApiKey: vi.fn(async () => ({
    ok: true,
    keyId: "key-1",
    plaintext: "awc_proj_test",
    prefix: "awc_proj_",
    last4: "test",
    scopes: ["acl:self"],
  })),
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
          repoUrls: [],
          defaultBranch: null,
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));

describe("project ACL request→approve", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("request → approve → active; non-member denied get_project_acl", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("active")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("pending")) return [];
      if (q.includes("INSERT INTO project_access_requests")) return [ACL_APPROVE_REQUEST_ROW];
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
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("pending")) {
        return [{ ...ACL_APPROVE_REQUEST_ROW, status: "pending" }];
      }
      if (q.includes("WITH approved_request AS")) {
        return [{
          request_row: { ...ACL_APPROVE_REQUEST_ROW, status: "approved" },
          member_row: ACL_APPROVE_MEMBER_ROW,
        }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
      projectDisplayName: "Buni",
    });
    expect(approved.ok).toBe(true);

    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("active")) return [];
      return [];
    });
    const denied = await getProjectAclPayload({
      projectId: "proj-1",
      actorUserId: "stranger",
    });
    expect(denied.ok).toBe(false);
  });
});
