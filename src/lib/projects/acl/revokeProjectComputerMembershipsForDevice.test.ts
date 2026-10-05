import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectComputerMembershipSchema", () => ({
  ensureProjectComputerMembershipSchema: vi.fn(async () => undefined),
}));

import { revokeProjectComputerMembershipsForDevice } from "@/lib/projects/acl/revokeProjectComputerMembershipsForDevice";

describe("revokeProjectComputerMembershipsForDevice", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("revokes all active computer seats for a device", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "mem-a" }, { id: "mem-b" }]);
    const ids = await revokeProjectComputerMembershipsForDevice({
      deviceId: "dev-1",
    });
    expect(ids).toEqual(["mem-a", "mem-b"]);
    const q = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(q).toContain("member_kind = 'computer'");
    expect(q).toContain("status = 'revoked'");
  });

  it("scopes revoke to one project when provided", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "mem-1" }]);
    await revokeProjectComputerMembershipsForDevice({
      deviceId: "dev-1",
      projectId: "proj-1",
    });
    const q = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(q).toContain("project_id =");
  });
});
