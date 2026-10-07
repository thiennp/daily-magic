import { beforeEach, describe, expect, it, vi } from "vitest";

import { BOT_INVITE_PROJECT, BOT_MADE_INVITE_ROW } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { revokeProjectInvite } from "@/lib/projects/acl/invites/revokeProjectInvite";
import { toInviteListItem } from "@/lib/projects/acl/invites/toInviteListItem";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({ ensureProjectAclSchema: vi.fn() }));
vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById: vi.fn() }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({ writeProjectActivityEvent: vi.fn() }));

describe("bot-made invites stay under the owner's existing controls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUserProjectById).mockResolvedValue(BOT_INVITE_PROJECT);
    sqlMock.mockResolvedValue([{ ...BOT_MADE_INVITE_ROW, uses_remaining: 1, revoked_at: "2026-10-08T00:40:00.000Z" }]);
  });

  it("owner Revoke works on a bot-made invite (project-scoped, any creator)", async () => {
    const result = await revokeProjectInvite({ projectId: "proj-1", inviteId: "inv-bot-1", ownerUserId: "owner-1" });
    expect(result.ok).toBe(true);
    const update = String(sqlMock.mock.calls[0]?.[0]);
    expect(update).toContain("SET revoked_at = NOW()");
    expect(update).not.toContain("created_by_user_id");
  });

  it("the inviting bot cannot revoke through the owner route", async () => {
    const result = await revokeProjectInvite({ projectId: "proj-1", inviteId: "inv-bot-1", ownerUserId: "bot-inviter" });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("owner invite list marks bot-made invites with the inviter seat", () => {
    const item = toInviteListItem(mapProjectInviteRow({ ...BOT_MADE_INVITE_ROW, uses_remaining: 1 }));
    expect(item).toMatchObject({ inviteId: "inv-bot-1", invitedByMembershipId: "mem-inviter", autoApprove: false, maxUses: 1, copyAvailable: false });
    const legacy = toInviteListItem(mapProjectInviteRow({ ...BOT_MADE_INVITE_ROW, created_by_membership_id: undefined }));
    expect(legacy.invitedByMembershipId).toBeNull();
  });
});
