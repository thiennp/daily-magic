import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { applyBotInviteIsolation } from "@/lib/projects/acl/applyBotInviteIsolation";

const join = { membership: { id: "m1" }, request: { inviteId: "i1" } };
const updatedInviter = (): unknown => sqlMock.mock.calls[1]?.slice(1)[0];

describe("applyBotInviteIsolation", () => {
  beforeEach(() => sqlMock.mockReset());

  it("a joining assistant belongs to the person who created the invite", async () => {
    sqlMock
      .mockResolvedValueOnce([
        {
          created_by_user_id: "alice",
          bound_owner_user_id: null,
          isolate_bots: false,
        },
      ])
      .mockResolvedValue([]);
    await applyBotInviteIsolation(join);
    expect(updatedInviter()).toBe("alice");
  });

  it("an invite made by a bot belongs to the person the bot acts for, not the bot", async () => {
    sqlMock
      .mockResolvedValueOnce([
        {
          created_by_user_id: "bot-user",
          bound_owner_user_id: "owner",
          isolate_bots: false,
        },
      ])
      .mockResolvedValue([]);
    await applyBotInviteIsolation(join);
    expect(updatedInviter()).toBe("owner");
  });
});
