import {
  buildInviterChoices,
  type InviterChoice,
} from "@/lib/projects/acl/buildInviterChoices";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { loadViewerOwnedBotUserIds } from "@/lib/projects/acl/loadViewerOwnedBotUserIds";

export type BotClaimFlags = {
  readonly canClaimBot?: boolean;
  readonly canChangeInviter?: boolean;
  readonly inviterChoices?: readonly InviterChoice[];
};

/**
 * Claim feature: an assistant nobody invited (older seats) can be claimed by
 * the owner or the person who owns it; the person who owns the bot can change its inviter.
 * Run BEFORE decorateBotManagement (needs invitedByUserId, which that strips).
 */
export const decorateBotClaim = async (
  members: readonly MembershipView[],
  viewer: {
    readonly userId: string;
    readonly canWrite: boolean;
    readonly ownerUserId: string;
  },
): Promise<readonly MembershipView[]> => {
  const bots = members.filter((m) => m.memberKind === "bot");
  const owned = await loadViewerOwnedBotUserIds({
    viewerUserId: viewer.userId,
    botUserIds: bots.map((m) => m.userId),
  });
  const isOwner = viewer.userId === viewer.ownerUserId;
  // Same rule as setBotInviter: the owner, or the person who owns the bot.
  const claimable = (m: MembershipView): boolean =>
    viewer.canWrite &&
    (m.invitedByUserId ?? null) === null &&
    (isOwner || owned.has(m.userId));
  if (!bots.some((m) => claimable(m) || owned.has(m.userId))) return members;
  const choices = await buildInviterChoices({
    members,
    ownerUserId: viewer.ownerUserId,
    viewerUserId: viewer.userId,
  });
  return members.map((m) => {
    if (m.memberKind !== "bot") return m;
    const canClaimBot = claimable(m);
    const canChangeInviter = owned.has(m.userId);
    return canClaimBot || canChangeInviter
      ? { ...m, canClaimBot, canChangeInviter, inviterChoices: choices }
      : m;
  });
};
