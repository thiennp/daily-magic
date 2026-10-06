import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { isAwcTestAutoApproveJoinsEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoApproveJoinsEnabled";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";

/**
 * Invite autoApprove applies only to claimed bots (linked owner_user_id).
 * Test flag may override outside production. Agents still need a display name.
 */
export const shouldAutoApproveInviteRedeem = async (input: {
  readonly actorUserId: string;
  readonly inviteAutoApprove: boolean;
  readonly suggestedDisplayName: string | null;
}): Promise<boolean> => {
  const requesterIsAgent = await isAgentUserId(input.actorUserId);
  const hasName = input.suggestedDisplayName !== null;
  const testOverride = isAwcTestAutoApproveJoinsEnabled();
  const linkedOwnerId = requesterIsAgent
    ? await resolveAgentLinkedOwnerUserId(input.actorUserId)
    : input.actorUserId;
  const inviteAutoApproveAllowed =
    input.inviteAutoApprove && linkedOwnerId !== null;
  return (
    (inviteAutoApproveAllowed || testOverride) &&
    (!requesterIsAgent || hasName)
  );
};
