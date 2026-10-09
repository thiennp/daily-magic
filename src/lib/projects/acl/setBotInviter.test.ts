import { beforeEach, describe, expect, it, vi } from "vitest";

const actorMock = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const seatMock = vi.hoisted(() => vi.fn());
const ownedMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/resolveFolderRefActor", () => ({
  resolveFolderRefActor: actorMock,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: seatMock,
}));
vi.mock("@/lib/projects/acl/isBotOwnedBy", () => ({ isBotOwnedBy: ownedMock }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({ ownerUserId: "owner" }),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { setBotInviter } from "@/lib/projects/acl/setBotInviter";

const input = { projectId: "p1", membershipId: "m1", actorUserId: "me" };
const botRow = (invitedBy: string | null) => [
  { user_id: "bot", invited_by_user_id: invitedBy },
];

describe("setBotInviter", () => {
  beforeEach(() => {
    for (const m of [actorMock, sqlMock, seatMock, ownedMock]) m.mockReset();
    actorMock.mockResolvedValue({ ok: true, isOwner: false });
    seatMock.mockResolvedValue({ role: "member", memberKind: "human" });
  });

  it("lets any member claim an unclaimed assistant for themselves", async () => {
    sqlMock.mockResolvedValueOnce(botRow(null)).mockResolvedValue([]);
    expect(await setBotInviter(input)).toEqual({
      ok: true,
      inviterUserId: "me",
    });
  });

  it("only lets the bot's owner re-assign a claimed assistant", async () => {
    sqlMock.mockResolvedValue(botRow("u2"));
    ownedMock.mockResolvedValue(false);
    expect(await setBotInviter(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
    ownedMock.mockResolvedValue(true);
    expect((await setBotInviter({ ...input, inviterUserId: "owner" })).ok).toBe(
      true,
    );
  });

  it("rejects an inviter who is not the owner or an active member", async () => {
    sqlMock.mockResolvedValue(botRow(null));
    seatMock.mockResolvedValue(null);
    expect(
      await setBotInviter({ ...input, inviterUserId: "stranger" }),
    ).toEqual({
      ok: false,
      code: "invalid_inviter",
    });
  });
});
