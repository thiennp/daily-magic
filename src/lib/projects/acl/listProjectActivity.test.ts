import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectActivity } from "@/lib/projects/acl/listProjectActivity";
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
          repoUrls: [],
          defaultBranch: null,
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async (_p: string, userId: string) =>
    userId === "member-1"
      ? {
          id: "mem-1",
          projectId: "proj-1",
          userId: "member-1",
          role: "member" as const,
          status: "active" as const,
          teamLabel: null,
          scopes: ["acl:self", "project:meta", "peer_sync"] as const,
          createdAt: "2026-10-01T00:00:00.000Z",
          revokedAt: null,
        }
      : null,
  ),
}));

describe("listProjectActivity auth + list", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns reverse-chrono events for owner and strips unsafe detail", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_access_audit")) {
        return [
          {
            id: "evt-2",
            project_id: "proj-1",
            actor_user_id: "owner-1",
            action: "approve",
            target_user_id: "bot-1",
            at: "2026-10-01T02:00:00.000Z",
            detail: { requestId: "req-1", membershipId: "mem-1", reason: "x" },
          },
        ];
      }
      return [];
    });
    const result = await listProjectActivity({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.events[0]).toMatchObject({
      action: "approve",
      detail: { requestId: "req-1", membershipId: "mem-1" },
    });
    expect(result.events[0].detail).not.toHaveProperty("reason");
  });

  it("denies non-member and allows active member", async () => {
    expect(
      await listProjectActivity({
        projectId: "proj-1",
        actorUserId: "stranger-1",
      }),
    ).toEqual({ ok: false, code: "forbidden" });
    sqlMock.mockImplementation(async () => []);
    const member = await listProjectActivity({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    expect(member.ok).toBe(true);
  });

  it("returns not_found for missing project", async () => {
    expect(
      await listProjectActivity({
        projectId: "missing",
        actorUserId: "owner-1",
      }),
    ).toEqual({ ok: false, code: "not_found" });
  });
});
