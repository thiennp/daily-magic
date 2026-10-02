import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { leaveProjectMembership } from "@/lib/projects/acl/leaveProjectMembership";

const sqlMock = vi.fn();
const revokeKeysMock = vi.fn(async () => 0);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership", () => ({
  revokeProjectApiKeysForMembership: (...args: unknown[]) =>
    revokeKeysMock(...args),
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

const memberRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync"],
  project_display_name: "Buni",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};

describe("leaveProjectMembership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    revokeKeysMock.mockClear();
    resetProjectAclSchemaEnsureForTests();
  });

  it("revokes active membership, disables webhooks, revokes keys, audits leave", async () => {
    const audits: string[] = [];
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
        return [memberRow];
      }
      if (q.includes("UPDATE project_memberships")) {
        return [
          {
            ...memberRow,
            status: "revoked",
            revoked_at: "2026-10-02T12:00:00.000Z",
          },
        ];
      }
      if (q.includes("UPDATE project_membership_webhooks")) return [];
      if (q.includes("INSERT INTO project_access_audit")) {
        const flat = strings.join("?");
        void flat;
        return [];
      }
      return [];
    });

    // Capture audit actions via write path: inspect sql calls for action literals
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
    expect(revokeKeysMock).toHaveBeenCalledWith(
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
    const auditActions = auditCalls.map((call) => {
      // neon tagged template: strings + values; action is a bound value
      const values = call.slice(1);
      return values.find(
        (v) => v === "leave" || v === "webhook.disable" || v === "revoke",
      );
    });
    expect(auditActions).toContain("webhook.disable");
    expect(auditActions).toContain("leave");
    expect(auditActions).not.toContain("revoke");
    void audits;
  });

  it("returns alreadyLeft when membership already revoked", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) {
        return [
          {
            ...memberRow,
            status: "revoked",
            revoked_at: "2026-10-01T00:00:00.000Z",
          },
        ];
      }
      return [];
    });

    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.alreadyLeft).toBe(true);
      expect(result.status).toBe("revoked");
    }
    expect(revokeKeysMock).not.toHaveBeenCalled();
  });

  it("rejects owner self-leave", async () => {
    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result).toEqual({ ok: false, code: "owner" });
  });

  it("rejects when no membership", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });
    const result = await leaveProjectMembership({
      projectId: "proj-1",
      actorUserId: "bot-1",
    });
    expect(result).toEqual({ ok: false, code: "not_active" });
  });

  it("returns not_found for unknown project", async () => {
    const result = await leaveProjectMembership({
      projectId: "missing",
      actorUserId: "bot-1",
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });

  it("allows leave from naming_required", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
        return [{ ...memberRow, status: "naming_required" }];
      }
      if (q.includes("UPDATE project_memberships")) {
        return [
          {
            ...memberRow,
            status: "revoked",
            revoked_at: "2026-10-02T12:00:00.000Z",
          },
        ];
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
