import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { isLiveProjectOwnerDevice } from "@/lib/projects/acl/isLiveProjectOwnerDevice";

const queryText = (call: unknown[]): string =>
  (call[0] as readonly string[]).join("?");

describe("isLiveProjectOwnerDevice", () => {
  beforeEach(() => sqlMock.mockReset());

  it("matches user_projects.device_id for this project on a live owner device", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "p1" }]);
    expect(
      await isLiveProjectOwnerDevice({ projectId: "p1", deviceId: "d1" }),
    ).toBe(true);
    const call = sqlMock.mock.calls[0]!;
    const q = queryText(call);
    expect(q).toContain("FROM user_projects AS p");
    expect(q).toContain("JOIN agent_witch_devices AS d ON d.id = p.device_id");
    expect(q).toContain("p.id = ?");
    expect(q).toContain("p.device_id = ?");
    expect(q).toContain("d.user_id = p.owner_user_id");
    expect(q).toContain("d.revoked_at IS NULL");
    expect(call.slice(1)).toEqual(["p1", "d1"]);
  });

  it("returns false when the device is revoked or not the project's device", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await isLiveProjectOwnerDevice({ projectId: "p1", deviceId: "d9" }),
    ).toBe(false);
  });
});
