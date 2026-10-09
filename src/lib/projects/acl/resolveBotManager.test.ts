import { beforeEach, describe, expect, it, vi } from "vitest";

const actorMock = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/resolveFolderRefActor", () => ({
  resolveFolderRefActor: actorMock,
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { resolveBotManager } from "@/lib/projects/acl/resolveBotManager";

const row = (invitedBy: string | null) => ({
  id: "bot-1",
  project_id: "p1",
  user_id: "bot-user",
  role: "member",
  status: "active",
  member_kind: "bot",
  invited_by_user_id: invitedBy,
  created_at: "2026-10-09T00:00:00Z",
});
const input = { projectId: "p1", membershipId: "bot-1", actorUserId: "u2" };

describe("resolveBotManager", () => {
  beforeEach(() => {
    actorMock.mockReset();
    sqlMock.mockReset();
  });

  it("lets the owner manage any assistant", async () => {
    actorMock.mockResolvedValue({ ok: true, isOwner: true });
    sqlMock.mockResolvedValue([row("someone-else")]);
    expect((await resolveBotManager(input)).ok).toBe(true);
  });

  it("lets a member manage only the assistant they invited", async () => {
    actorMock.mockResolvedValue({ ok: true, isOwner: false });
    sqlMock.mockResolvedValueOnce([row("u2")]);
    expect((await resolveBotManager(input)).ok).toBe(true);
    sqlMock.mockResolvedValueOnce([row("someone-else")]);
    expect(await resolveBotManager(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
  });

  it("reports a missing assistant and a refused actor", async () => {
    actorMock.mockResolvedValue({ ok: true, isOwner: true });
    sqlMock.mockResolvedValue([]);
    expect(await resolveBotManager(input)).toEqual({
      ok: false,
      code: "not_found",
    });
    actorMock.mockResolvedValue({ ok: false, code: "forbidden" });
    expect(await resolveBotManager(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
