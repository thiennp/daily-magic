import { canAutoApproveBotForOwnerMembership } from "@/lib/projects/acl/canAutoApproveBotForOwnerMembership";
import { MEMBER_OWNER_BOT_AUTO_APPROVE_REASON } from "@/lib/projects/acl/canAutoApproveBotForOwnerMembership";
import { getActiveHumanMembershipRole } from "@/lib/projects/acl/getActiveHumanMembershipRole";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  isAgentSameProjectOwner,
  resolveAgentLinkedOwnerUserId,
} from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";

export type AgentAccessAutoApproveDecision =
  | { readonly autoApprove: false }
  | {
      readonly autoApprove: true;
      readonly reason: "same_owner" | typeof MEMBER_OWNER_BOT_AUTO_APPROVE_REASON;
    };

/**
 * Same-owner (linked owner_user_id === project owner) or active human
 * member/owner seat for that linked owner. Agents still need a display name.
 */
export const shouldAutoApproveAgentAccessRequest = async (input: {
  readonly projectId: string;
  readonly agentUserId: string;
  readonly projectOwnerUserId: string;
  readonly suggestedDisplayName: string | null;
}): Promise<AgentAccessAutoApproveDecision> => {
  const requesterIsAgent = await isAgentUserId(input.agentUserId);
  if (requesterIsAgent && input.suggestedDisplayName === null) {
    return { autoApprove: false };
  }

  const sameOwner = await isAgentSameProjectOwner({
    agentUserId: input.agentUserId,
    projectOwnerUserId: input.projectOwnerUserId,
  });
  if (sameOwner) {
    return { autoApprove: true, reason: "same_owner" };
  }

  const linkedOwnerUserId = await resolveAgentLinkedOwnerUserId(
    input.agentUserId,
  );
  if (linkedOwnerUserId == null) {
    return { autoApprove: false };
  }

  const humanRole = await getActiveHumanMembershipRole(
    input.projectId,
    linkedOwnerUserId,
  );
  if (humanRole === null || !canAutoApproveBotForOwnerMembership(humanRole)) {
    return { autoApprove: false };
  }

  return {
    autoApprove: true,
    reason: MEMBER_OWNER_BOT_AUTO_APPROVE_REASON,
  };
};
