import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  LEAVE_MEMBER_ROW,
  LEAVE_PROJECT,
  revokedLeaveMemberRow,
} from "@/lib/projects/acl/leaveProjectMembership.fixtures";
import { leaveProjectMembership } from "@/lib/projects/acl/leaveProjectMembership";
import { revokeProjectApiKeysForMembership } from "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership", () => ({
  revokeProjectApiKeysForMembership: vi.fn(async () => 0),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (projectId: string) =>
    projectId === "proj-1" ? LEAVE_PROJECT : null,
  ),
}));

describe("leaveProjectMembership happy path", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    vi.mocked(revokeProjectApiKeysForMembership).mockClear();
    resetProjectAclSchemaEnsureForTests();
  });

  it("revokes active membership, disables webhooks, revokes keys, audits leave", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
        return [LEAVE_MEMBER_ROW];
      }
      if (q.includes("UPDATE project_memberships")) {
        return [revokedLeaveMemberRow()];
      }
      if (q.includes("UPDATE project_membership_webhooks")) return [];
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.status).toBe("revoked");
      expect(result.membership.status).toBe("revoked");
      expect(result.alreadyLeft).toBeUndefined();
    }
    expect(revokeProjectApiKeysForMembership).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        membershipId: "mem-1",
        actorUserId: "bot-1",
        targetUserId: "bot-1",
      }),
    );

    const auditCalls = sqlMock.mock.calls.filter((call) =>
      String(call[0]).includes("INSERT INTO project_access_audit"),
    );
    expect(auditCalls.length).toBeGreaterThanOrEqual(2);
    const auditActions = auditCalls.map((call) =>
      call
        .slice(1)
        .find((v) => v === "leave" || v === "webhook.disable" || v === "revoke"),
    );
    expect(auditActions).toContain("webhook.disable");
    expect(auditActions).toContain("leave");
    expect(auditActions).not.toContain("revoke");
  });

  it("allows leave from naming_required", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
        return [{ ...LEAVE_MEMBER_ROW, status: "naming_required" }];
      }
      if (q.includes("UPDATE project_memberships")) {
        return [revokedLeaveMemberRow()];
      }
      if (q.includes("UPDATE project_membership_webhooks")) return [];
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
  });
});
