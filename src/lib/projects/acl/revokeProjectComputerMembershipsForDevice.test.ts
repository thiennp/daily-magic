import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const clearSticky = vi.hoisted(() => vi.fn(async () => ({ clearedActorUserIds: [] })));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectComputerMembershipSchema", () => ({
  ensureProjectComputerMembershipSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/composer/clearStickyOnMembershipLeave", () => ({
  clearStickyOnMembershipLeave: clearSticky,
}));

import { revokeProjectComputerMembershipsForDevice } from "@/lib/projects/acl/revokeProjectComputerMembershipsForDevice";

describe("revokeProjectComputerMembershipsForDevice", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    clearSticky.mockClear();
  });

  it("revokes all active computer seats for a device", async () => {
    sqlMock.mockResolvedValueOnce([
      { id: "mem-a", project_id: "proj-1", project_display_name: "Mac" },
      { id: "mem-b", project_id: "proj-2", project_display_name: null },
    ]);
    const ids = await revokeProjectComputerMembershipsForDevice({
      deviceId: "dev-1",
    });
    expect(ids).toEqual(["mem-a", "mem-b"]);
    const q = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(q).toContain("member_kind = 'computer'");
    expect(q).toContain("status = 'revoked'");
    expect(clearSticky).toHaveBeenCalledTimes(2);
  });

  it("scopes revoke to one project when provided", async () => {
    sqlMock.mockResolvedValueOnce([
      { id: "mem-1", project_id: "proj-1", project_display_name: "Mac" },
    ]);
    await revokeProjectComputerMembershipsForDevice({
      deviceId: "dev-1",
      projectId: "proj-1",
    });
    const q = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(q).toContain("project_id =");
    expect(clearSticky).toHaveBeenCalledWith({
      projectId: "proj-1",
      membershipId: "mem-1",
      displayName: "Mac",
    });
  });
});
