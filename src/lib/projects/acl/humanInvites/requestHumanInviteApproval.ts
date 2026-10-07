import { claimHumanInviteForApproval } from "@/lib/projects/acl/humanInvites/claimHumanInviteForApproval";
import { classifyHumanInviteMiss } from "@/lib/projects/acl/humanInvites/classifyHumanInviteMiss";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import type { RedeemHumanInviteResult } from "@/lib/projects/acl/humanInvites/types/RedeemHumanInviteResult.type";

/**
 * 108 approval path of redeem (after owner/member/email-lock/name guards):
 * park the invite as 'accepted'. No membership — only owner Approve adds one.
 */
export const requestHumanInviteApproval = async (
  peeked: HumanInviteRecord,
  input: {
    readonly token: string;
    readonly claimantUserId: string;
    readonly claimantEmailNormalized: string | null;
    readonly name: string;
  },
): Promise<RedeemHumanInviteResult> => {
  const parked = await claimHumanInviteForApproval({
    token: input.token,
    claimantUserId: input.claimantUserId,
    claimantEmailNormalized: input.claimantEmailNormalized,
    projectDisplayName: input.name,
  });
  if (!parked.ok) {
    if (parked.code === "already_requested") {
      return {
        ok: false,
        code: "already_requested",
        projectId: peeked.projectId,
      };
    }
    return { ok: false, code: await classifyHumanInviteMiss(input.token) };
  }
  return {
    ok: true,
    awaitingApproval: true,
    inviteId: parked.invite.id,
    projectId: parked.invite.projectId,
    role: parked.invite.role,
    projectDisplayName: input.name,
  };
};
