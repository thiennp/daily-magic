import type { BotProjectInviteRedeemErrorCode } from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";
import { clampBotInviteGrant } from "@/lib/projects/acl/invites/botInvites/clampBotInviteGrant";
import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type BotMadeInviteRedeemGate =
  | {
      readonly ok: true;
      readonly ownerUserId: string;
      readonly inviter: ProjectMembershipRecord;
      readonly scopes: readonly ProjectAclScope[];
    }
  | { readonly ok: false; readonly code: BotProjectInviteRedeemErrorCode };

const fail = (code: BotProjectInviteRedeemErrorCode): BotMadeInviteRedeemGate => ({
  ok: false,
  code,
});

/**
 * Redeem-time proof for a bot-made invite (all server-side, nothing the
 * redeeming bot says about itself): redeemer is an agent user linked to the
 * bound owner; project owner unchanged; inviter membership still active and
 * still same-owner; scopes re-clamped to the inviter's CURRENT scopes.
 */
export const verifyBotMadeInviteRedeem = async (input: {
  readonly invite: ProjectInviteRecord;
  readonly actorUserId: string;
}): Promise<BotMadeInviteRedeemGate> => {
  const { invite } = input;
  const boundOwner = invite.boundOwnerUserId ?? null;
  if (!(await isAgentUserId(input.actorUserId))) {
    return fail("bot_invite_redeemer_not_bot");
  }
  const project = await getUserProjectById(invite.projectId);
  if (project === null || boundOwner === null || project.ownerUserId !== boundOwner) {
    return fail("bot_invite_owner_changed");
  }
  const inviter = await getActiveProjectMembership(
    invite.projectId,
    invite.createdByUserId,
  );
  const inviterLinked =
    inviter !== null &&
    inviter.id === invite.createdByMembershipId &&
    (await isBotLinkedToOwnerUser({
      botUserId: invite.createdByUserId,
      ownerUserId: boundOwner,
    }));
  if (inviter === null || !inviterLinked) {
    return fail("bot_invite_inviter_inactive");
  }
  const redeemerLinked = await isBotLinkedToOwnerUser({
    botUserId: input.actorUserId,
    ownerUserId: boundOwner,
  });
  if (!redeemerLinked) return fail("bot_invite_not_same_owner");
  const grant = clampBotInviteGrant({
    requestedScopes: invite.scopes,
    inviterRole: inviter.role,
    inviterScopes: inviter.scopes,
  });
  if (!grant.ok) return fail("bot_invite_scope_exceeds_inviter");
  return { ok: true, ownerUserId: boundOwner, inviter, scopes: grant.scopes };
};
