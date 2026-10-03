import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { LEAVE_PROJECT } from "@/lib/projects/acl/leaveProjectMembership.fixtures";
import { leaveProjectMembership } from "@/lib/projects/acl/leaveProjectMembership";
import { createLeaveSqlMockImplementation } from "@/lib/projects/acl/leaveProjectMembership.testUtils";
import { revokeProjectApiKeysForMembership } from "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock(
  "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership",
  () => ({
    revokeProjectApiKeysForMembership: vi.fn(async () => 0),
  }),
);

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

  it("revokes active membership, disables webhooks, revokes keys without audit INSERT", async () => {
    sqlMock.mockImplementation(createLeaveSqlMockImplementation());
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
    expect(auditCalls).toHaveLength(0);
    const purgeSql = sqlMock.mock.calls.map((call) => String(call[0]));
    expect(
      purgeSql.some((query) =>
        query.includes("DELETE FROM project_message_deliveries"),
      ),
    ).toBe(true);
    expect(
      purgeSql.some((query) => query.includes("DELETE FROM project_messages")),
    ).toBe(true);
    expect(
      purgeSql.some((query) =>
        query.includes("DELETE FROM project_membership_webhooks"),
      ),
    ).toBe(true);
    expect(
      purgeSql.some((query) =>
        query.includes("DELETE FROM project_membership_grok_routine_webhooks"),
      ),
    ).toBe(true);
    expect(
      purgeSql.some((query) =>
        query.includes("DELETE FROM project_grok_routine_wake_attempts"),
      ),
    ).toBe(true);
  });

  it("allows leave from naming_required", async () => {
    sqlMock.mockImplementation(
      createLeaveSqlMockImplementation({ status: "naming_required" }),
    );
    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
  });

  it("returns ok after revoke even if leave audit side effects throw", async () => {
    sqlMock.mockImplementation(
      createLeaveSqlMockImplementation({ throwOnAudit: true }),
    );
    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.status).toBe("revoked");
    }
  });
});
