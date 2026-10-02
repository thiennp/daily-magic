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

describe("listProjectActivity auth + empty feed", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns empty events for owner after Neon activity drop", async () => {
    const result = await listProjectActivity({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result).toEqual({ ok: true, events: [], nextCursor: null });
    const auditReads = sqlMock.mock.calls.filter((call) =>
      String(call[0]).includes("project_access_audit"),
    );
    expect(auditReads).toHaveLength(0);
  });

  it("denies non-member and allows active member empty list", async () => {
    expect(
      await listProjectActivity({
        projectId: "proj-1",
        actorUserId: "stranger-1",
      }),
    ).toEqual({ ok: false, code: "forbidden" });
    const member = await listProjectActivity({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    expect(member).toEqual({ ok: true, events: [], nextCursor: null });
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
