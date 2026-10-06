import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { isAwcTestAutoConnectEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoConnectEnabled";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";

/**
 * Invite autoApprove applies only to claimed bots (linked owner_user_id).
 * Test auto-connect may override outside production (invite-redeem only).
 * Agents still need a display name.
 */
export const shouldAutoApproveInviteRedeem = async (input: {
  readonly actorUserId: string;
  readonly inviteAutoApprove: boolean;
  readonly suggestedDisplayName: string | null;
}): Promise<boolean> => {
  const requesterIsAgent = await isAgentUserId(input.actorUserId);
  const hasName = input.suggestedDisplayName !== null;
  const testOverride = isAwcTestAutoConnectEnabled();
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
