import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  BOT_INVITE_PROJECT,
  BOT_INVITER_MEMBERSHIP,
  BOT_MADE_INVITE_ROW,
  stubBotRedeemSql,
} from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({ ensureProjectAclSchema: vi.fn() }));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({ checkProjectMembershipStatus: vi.fn(async () => "none") }));
vi.mock("@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName", () => ({
  resolveRedeemSuggestedDisplayName: vi.fn(async (i: { suggestedProjectDisplayName?: string | null }) => ({
    ok: true, name: i.suggestedProjectDisplayName ?? null,
  })),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById: vi.fn() }));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({ isAgentUserId: vi.fn() }));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({ getActiveProjectMembership: vi.fn() }));
vi.mock("@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser", () => ({ isBotLinkedToOwnerUser: vi.fn() }));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({ approveProjectAccessRequest: vi.fn() }));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({ writeProjectAccessAudit: vi.fn() }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({ writeProjectActivityEvent: vi.fn() }));

const redeem = (name: string | null = "Bright Owl") =>
  redeemProjectInvite({ token: "t".repeat(22), actorUserId: "bot-sibling", suggestedProjectDisplayName: name });
const restored = () => sqlMock.mock.calls.some((c) => String(c[0]).includes("uses_remaining + 1"));
const linkedFor = (allowed: readonly string[]) =>
  vi.mocked(isBotLinkedToOwnerUser).mockImplementation(async (i) => allowed.includes(`${i.botUserId}>${i.ownerUserId}`));

describe("redeem of a bot-made invite: server-side same-owner proof", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stubBotRedeemSql(sqlMock, [BOT_MADE_INVITE_ROW]);
    vi.mocked(getUserProjectById).mockResolvedValue(BOT_INVITE_PROJECT);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(BOT_INVITER_MEMBERSHIP);
    linkedFor(["bot-inviter>owner-1", "bot-sibling>owner-1"]);
  });

  // Every rejection must leave the bot unseated: approve never runs.
  afterEach(() => {
    expect(vi.mocked(approveProjectAccessRequest)).not.toHaveBeenCalled();
  });

  it("human redeemer → bot_invite_redeemer_not_bot, code burned", async () => {
    vi.mocked(isAgentUserId).mockResolvedValue(false);
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_redeemer_not_bot" });
    expect(restored()).toBe(false);
  });

  it("bot claimed by a different owner (or unclaimed) → bot_invite_not_same_owner, burned", async () => {
    linkedFor(["bot-inviter>owner-1", "bot-sibling>owner-2"]);
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_not_same_owner" });
    expect(restored()).toBe(false);
    expect(vi.mocked(isBotLinkedToOwnerUser)).toHaveBeenCalledWith({ botUserId: "bot-sibling", ownerUserId: "owner-1" });
  });

  it("chained to a different owner (project owner ≠ bound owner) → bot_invite_owner_changed", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue({ ...BOT_INVITE_PROJECT, ownerUserId: "owner-2" });
    linkedFor(["bot-inviter>owner-2", "bot-sibling>owner-2"]);
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_owner_changed" });
  });

  it("inviter revoked/left (no active seat) → bot_invite_inviter_inactive", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_inviter_inactive" });
  });

  it("inviter re-joined under a new seat or was unclaimed → bot_invite_inviter_inactive", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue({ ...BOT_INVITER_MEMBERSHIP, id: "mem-new" });
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_inviter_inactive" });
    vi.mocked(getActiveProjectMembership).mockResolvedValue(BOT_INVITER_MEMBERSHIP);
    linkedFor(["bot-sibling>owner-1"]);
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_inviter_inactive" });
  });

  it("inviter lost scopes since create → bot_invite_scope_exceeds_inviter", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue({ ...BOT_INVITER_MEMBERSHIP, scopes: ["acl:self"] });
    expect(await redeem()).toEqual({ ok: false, code: "bot_invite_scope_exceeds_inviter" });
  });

  it("no nickname → display_name_required and the use is restored for a retry", async () => {
    expect(await redeem(null)).toEqual({ ok: false, code: "display_name_required" });
    expect(restored()).toBe(true);
  });

  it("expired, reused or owner-revoked code (claim UPDATE misses) → invalid_token", async () => {
    stubBotRedeemSql(sqlMock, []);
    expect(await redeem()).toEqual({ ok: false, code: "invalid_token" });
    const claim = sqlMock.mock.calls.find((c) => String(c[0]).includes("uses_remaining - 1"));
    const where = String(claim?.[0]);
    ["revoked_at IS NULL", "expires_at > NOW()", "uses_remaining > 0"].forEach((frag) => expect(where).toContain(frag));
  });
});
