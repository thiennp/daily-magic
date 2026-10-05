import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectComputerMembershipSchema", () => ({
  ensureProjectComputerMembershipSchema: vi.fn(async () => undefined),
}));

import { upsertProjectComputerMembership } from "@/lib/projects/acl/upsertProjectComputerMembership";

const deviceRow = {
  id: "dev-1",
  user_id: "owner-1",
  display_name: "Thien's MacBook Pro",
  device_label: "mac.local",
  revoked_at: null,
};

const membershipRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "owner-1",
  role: "member",
  status: "active",
  member_kind: "computer",
  team_label: null,
  scopes: [],
  project_display_name: "Thien's MacBook Pro",
  device_id: "dev-1",
  created_at: "2026-10-05T00:00:00.000Z",
  revoked_at: null,
};

describe("upsertProjectComputerMembership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("inserts when no active computer seat exists", async () => {
    sqlMock
      .mockResolvedValueOnce([deviceRow])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([membershipRow]);

    const result = await upsertProjectComputerMembership({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "dev-1",
    });

    expect(result).toEqual({
      ok: true,
      membership: expect.objectContaining({
        memberKind: "computer",
        deviceId: "dev-1",
        projectDisplayName: "Thien's MacBook Pro",
      }),
    });
    const insertSql = String(sqlMock.mock.calls[2]?.[0] ?? "");
    expect(insertSql).toContain("INSERT INTO project_memberships");
  });

  it("updates display name when seat already active", async () => {
    sqlMock
      .mockResolvedValueOnce([deviceRow])
      .mockResolvedValueOnce([membershipRow])
      .mockResolvedValueOnce([
        { ...membershipRow, project_display_name: "Thien's MacBook Pro" },
      ]);

    const result = await upsertProjectComputerMembership({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "dev-1",
    });

    expect(result.ok).toBe(true);
    const updateSql = String(sqlMock.mock.calls[2]?.[0] ?? "");
    expect(updateSql).toContain("UPDATE project_memberships");
  });

  it("rejects another owner's device", async () => {
    sqlMock.mockResolvedValueOnce([{ ...deviceRow, user_id: "other" }]);
    const result = await upsertProjectComputerMembership({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "dev-1",
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("rejects missing or revoked device", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await upsertProjectComputerMembership({
        projectId: "proj-1",
        ownerUserId: "owner-1",
        deviceId: "missing",
      }),
    ).toEqual({ ok: false, code: "device_not_found" });
  });
});
