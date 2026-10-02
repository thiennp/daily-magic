import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  LEAVE_MEMBER_ROW,
  LEAVE_PROJECT,
} from "@/lib/projects/acl/leaveProjectMembership.fixtures";
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
    projectId === "proj-1" ? LEAVE_PROJECT : null,
  ),
}));

describe("leaveProjectMembership errors", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    revokeKeysMock.mockClear();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns alreadyLeft when membership already revoked", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) {
        return [
          {
            ...LEAVE_MEMBER_ROW,
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
});
