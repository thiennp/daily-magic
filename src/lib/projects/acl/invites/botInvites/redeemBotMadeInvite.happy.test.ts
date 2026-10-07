import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  BOT_INVITE_PENDING_ROW,
  BOT_INVITE_PROJECT,
  BOT_INVITER_MEMBERSHIP,
  BOT_MADE_INVITE_ROW,
  stubBotRedeemSql,
} from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({ ensureProjectAclSchema: vi.fn() }));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({ checkProjectMembershipStatus: vi.fn(async () => "none") }));
vi.mock("@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName", () => ({
  resolveRedeemSuggestedDisplayName: vi.fn(async () => ({ ok: true, name: "Bright Owl" })),
}));
vi.mock("@/lib/agentAccess/resolveAgentLinkedOwnerUserId", () => ({ resolveAgentLinkedOwnerUserId: vi.fn(async () => "owner-1") }));
vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById: vi.fn() }));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({ isAgentUserId: vi.fn() }));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({ getActiveProjectMembership: vi.fn() }));
vi.mock("@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser", () => ({ isBotLinkedToOwnerUser: vi.fn() }));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({ approveProjectAccessRequest: vi.fn() }));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({ writeProjectAccessAudit: vi.fn() }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({ writeProjectActivityEvent: vi.fn() }));

const seated = {
  ...BOT_INVITER_MEMBERSHIP,
  id: "mem-sibling",
  userId: "bot-sibling",
  projectDisplayName: "Bright Owl",
};
const redeem = () =>
  redeemProjectInvite({ token: "t".repeat(22), actorUserId: "bot-sibling", suggestedProjectDisplayName: "Bright Owl" });

describe("redeem of a bot-made invite: happy path + narrowness", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
    stubBotRedeemSql(sqlMock, [BOT_MADE_INVITE_ROW]);
    vi.mocked(getUserProjectById).mockResolvedValue(BOT_INVITE_PROJECT);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(BOT_INVITER_MEMBERSHIP);
    vi.mocked(isBotLinkedToOwnerUser).mockResolvedValue(true);
    vi.mocked(approveProjectAccessRequest).mockResolvedValue({
      ok: true,
      request: { ...mapProjectAccessRequestRow(BOT_INVITE_PENDING_ROW), status: "approved" },
      membership: seated,
      projectApiKey: "awc_proj_test",
    });
  });

  it("seats the same-owner bot as member on the owner's account, no owner Approve click", async () => {
    const result = await redeem();
    expect(result).toMatchObject({ ok: true, status: "active", membership: { id: "mem-sibling", role: "member" } });
    expect(vi.mocked(approveProjectAccessRequest)).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerUserId: "owner-1",
        requestId: "req-bot-1",
        approvalSource: "bot_invite",
        scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
      }),
    );
  });

  it("logs member.auto_approved as 'Invited by {inviting bot}' in the Access log", async () => {
    await redeem();
    expect(vi.mocked(writeProjectActivityEvent)).toHaveBeenCalledWith({
      projectId: "proj-1",
      type: "member.auto_approved",
      actor: { kind: "member", userId: "bot-inviter", label: "Quiet Fox" },
      target: { membershipId: "mem-sibling", userId: "bot-sibling", label: "Bright Owl" },
      detail: expect.objectContaining({ inviteId: "inv-bot-1", approvalSource: "bot_invite", memberKind: "bot" }),
    });
  });

  it("owner-made invite (checkbox off) + same-owner claimed bot still waits for Approve", async () => {
    const ownerInvite = { ...BOT_MADE_INVITE_ROW, created_by_user_id: "owner-1", created_by_membership_id: null, bound_owner_user_id: null };
    stubBotRedeemSql(sqlMock, [ownerInvite]);
    const result = await redeem();
    expect(result).toMatchObject({ ok: true, status: "pending" });
    expect(vi.mocked(approveProjectAccessRequest)).not.toHaveBeenCalled();
    expect(vi.mocked(isBotLinkedToOwnerUser)).not.toHaveBeenCalled();
  });
});
