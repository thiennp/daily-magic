import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
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

describe("approve auto-applies pending suggestion", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("auto-applies when owner omits projectDisplayName", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("pending")) {
        return [{
          ...ACL_APPROVE_REQUEST_ROW,
          status: "pending",
          suggested_project_display_name: "Soft Vale",
        }];
      }
      if (q.includes("WITH approved_request AS")) {
        expect(values).toContain("Soft Vale");
        return [{
          request_row: {
            ...ACL_APPROVE_REQUEST_ROW,
            status: "approved",
            suggested_project_display_name: "Soft Vale",
          },
          member_row: {
            ...ACL_APPROVE_MEMBER_ROW,
            project_display_name: "Soft Vale",
          },
        }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
      approvalSource: "owner",
    });
    expect(approved.ok).toBe(true);
    if (!approved.ok) return;
    expect(approved.membership.projectDisplayName).toBe("Soft Vale");
  });
});
