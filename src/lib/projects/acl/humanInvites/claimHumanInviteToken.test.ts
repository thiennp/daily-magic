import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { claimHumanInviteToken } from "@/lib/projects/acl/humanInvites/claimHumanInviteToken";
import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";

const TOKEN = "a".repeat(22);

const inviteRow = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner",
  email: null,
  role: "member",
  max_uses: 1,
  uses_remaining: 0,
  expires_at: "2026-10-20T00:00:00.000Z",
  revoked_at: null,
  redeemed_at: "2026-10-05T10:00:00.000Z",
  redeemed_by_user_id: "user-1",
  created_at: "2026-10-05T09:00:00.000Z",
};

describe("claimHumanInviteToken", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns the claimed invite on a winning UPDATE", async () => {
    sqlMock.mockResolvedValueOnce([inviteRow]);
    const result = await claimHumanInviteToken({
      token: TOKEN,
      claimantUserId: "user-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.invite.id).toBe("inv-1");
    expect(result.invite.redeemedByUserId).toBe("user-1");
    const query = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(query).toContain("UPDATE project_human_invites");
    expect(query).toContain("uses_remaining = uses_remaining - 1");
    expect(sqlMock.mock.calls[0]?.[1]).toBe("user-1");
    expect(sqlMock.mock.calls[0]?.[2]).toBe(hashHumanInviteToken(TOKEN));
  });

  it("double accept: second claim gets invalid_token (0 rows)", async () => {
    sqlMock.mockResolvedValueOnce([inviteRow]);
    sqlMock.mockResolvedValueOnce([]);
    const first = await claimHumanInviteToken({
      token: TOKEN,
      claimantUserId: "user-1",
    });
    const second = await claimHumanInviteToken({
      token: TOKEN,
      claimantUserId: "user-2",
    });
    expect(first.ok).toBe(true);
    expect(second).toEqual({ ok: false, code: "invalid_token" });
  });

  it("rejects short tokens without hitting SQL", async () => {
    await expect(
      claimHumanInviteToken({ token: "short", claimantUserId: "u" }),
    ).resolves.toEqual({ ok: false, code: "invalid_token" });
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
