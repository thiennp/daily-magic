import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { mayControlOwnedBotWakeLink } from "@/lib/projects/acl/webhooks/mayControlOwnedBotWakeLink";

describe("mayControlOwnedBotWakeLink", () => {
  beforeEach(() => sqlMock.mockReset());

  it("requires a live credential and a caller who is still owner or member", async () => {
    sqlMock.mockResolvedValue([{ "?column?": 1 }]);
    expect(
      await mayControlOwnedBotWakeLink({
        projectId: "p1",
        membershipId: "m1",
        callerUserId: "u1",
      }),
    ).toBe(true);
    const text = (sqlMock.mock.calls[0][0] as readonly string[]).join("?");
    expect(text).toContain("t.revoked_at IS NULL");
    expect(text).toContain("h.status = 'active'");
    expect(text).toContain("up.owner_user_id");
  });

  it("is false when nothing matches", async () => {
    sqlMock.mockResolvedValue([]);
    expect(
      await mayControlOwnedBotWakeLink({
        projectId: "p1",
        membershipId: "m1",
        callerUserId: "u1",
      }),
    ).toBe(false);
  });
});
