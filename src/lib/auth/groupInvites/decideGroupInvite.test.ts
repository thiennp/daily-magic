import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/groupInvites/ensureGroupInvitesSchema", () => ({
  ensureGroupInvitesSchema: async () => undefined,
}));

import { decideGroupInvite } from "@/lib/auth/groupInvites/decideGroupInvite";

const text = (call: number): string =>
  (sqlMock.mock.calls[call][0] as readonly string[]).join("?");

describe("decideGroupInvite", () => {
  beforeEach(() => sqlMock.mockReset());

  it("only the invitee can claim a pending invite", async () => {
    sqlMock.mockResolvedValueOnce([]);
    expect(
      await decideGroupInvite({
        inviteId: "i1",
        userId: "stranger",
        accept: true,
      }),
    ).toEqual({ ok: false, code: "not_found" });
    expect(text(0)).toContain("invitee_user_id =");
    expect(text(0)).toContain("status = 'pending'");
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("accepting adds the membership once", async () => {
    sqlMock
      .mockResolvedValueOnce([{ group_id: "g1", role: "user" }])
      .mockResolvedValueOnce([{ id: "m1" }]);
    expect(
      await decideGroupInvite({ inviteId: "i1", userId: "me", accept: true }),
    ).toEqual({ ok: true, groupId: "g1" });
    expect(text(1)).toContain("ON CONFLICT (group_id, user_id) DO NOTHING");
  });

  it("declining adds nobody", async () => {
    sqlMock.mockResolvedValueOnce([{ group_id: "g1", role: "user" }]);
    expect(
      await decideGroupInvite({ inviteId: "i1", userId: "me", accept: false }),
    ).toEqual({ ok: true, groupId: "g1" });
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
