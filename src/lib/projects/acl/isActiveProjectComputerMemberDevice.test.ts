import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectComputerMembershipSchema", () => ({
  ensureProjectComputerMembershipSchema: async () => undefined,
}));

import { isActiveProjectComputerMemberDevice } from "@/lib/projects/acl/isActiveProjectComputerMemberDevice";

const queryText = (call: unknown[]): string =>
  (call[0] as readonly string[]).join("?");

describe("isActiveProjectComputerMemberDevice", () => {
  beforeEach(() => sqlMock.mockReset());

  it("scopes to active computer seats on this project with a live device", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "m1" }]);
    const ok = await isActiveProjectComputerMemberDevice({
      projectId: "p1",
      deviceId: "d1",
    });
    expect(ok).toBe(true);
    const call = sqlMock.mock.calls[0]!;
    const q = queryText(call);
    expect(q).toContain("m.project_id = ?");
    expect(q).toContain("m.device_id = ?");
    expect(q).toContain("m.member_kind = 'computer'");
    expect(q).toContain("m.status = 'active'");
    expect(q).toContain("d.revoked_at IS NULL");
    expect(call.slice(1)).toEqual(["p1", "d1"]);
  });

  it("returns false when no seat matches", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await isActiveProjectComputerMemberDevice({ projectId: "p1", deviceId: "d9" }),
    ).toBe(false);
  });
});
