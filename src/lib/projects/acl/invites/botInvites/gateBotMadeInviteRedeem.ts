import type { BotProjectInviteRedeemErrorCode } from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";
import { isBotMadeProjectInvite } from "@/lib/projects/acl/invites/botInvites/isBotMadeProjectInvite";
import { verifyBotMadeInviteRedeem } from "@/lib/projects/acl/invites/botInvites/verifyBotMadeInviteRedeem";
import { restoreProjectInviteUse } from "@/lib/projects/acl/invites/claimProjectInviteToken";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type BotMadeInviteRedeemGateResult =
  | {
      readonly ok: true;
      /** null = owner-made invite: the normal redeem path runs unchanged. */
      readonly botMade: {
        readonly ownerUserId: string;
        readonly inviter: ProjectMembershipRecord;
        readonly scopes: readonly ProjectAclScope[];
        readonly suggestedName: string;
      } | null;
    }
  | {
      readonly ok: false;
      readonly code: BotProjectInviteRedeemErrorCode | "display_name_required";
    };

/**
 * Owner invites pass straight through. A bot-made invite needs a nickname
 * (use restored so the bot can retry) and the full same-owner proof. A failed
 * proof does NOT restore the use: the single-use code is burned (fail closed),
 * there is no fallback to a pending owner-Approve request.
 */
export const gateBotMadeInviteRedeem = async (input: {
  readonly invite: ProjectInviteRecord;
  readonly actorUserId: string;
  readonly suggestedName: string | null;
}): Promise<BotMadeInviteRedeemGateResult> => {
  if (!isBotMadeProjectInvite(input.invite)) {
    return { ok: true, botMade: null };
  }
  if (input.suggestedName === null) {
    await restoreProjectInviteUse(input.invite.id);
    return { ok: false, code: "display_name_required" };
  }
  const verified = await verifyBotMadeInviteRedeem(input);
  if (!verified.ok) {
    return verified;
  }
  return {
    ok: true,
    botMade: {
      ownerUserId: verified.ownerUserId,
      inviter: verified.inviter,
      scopes: verified.scopes,
      suggestedName: input.suggestedName,
    },
  };
};
