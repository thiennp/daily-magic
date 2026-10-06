import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { buildProjectAclRedeemInviteMessage } from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";
import { isProjectAclRedeemPollJoin } from "@/lib/agentAccess/isProjectAclRedeemPollJoin";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { retypePendingRedeemJoinPlatform } from "@/lib/projects/acl/invites/retypePendingRedeemJoinPlatform";

/**
 * redeem_project_invite again with a joinType while the request is still
 * pending: re-types the existing request and replies for the new type
 * (status stays pending; no key). Null when there is no pending request to
 * re-type, so the caller keeps its original error.
 */
export const retypeProjectAclRedeemInvite = async (input: {
  readonly token: string;
  readonly actorUserId: string;
  readonly joinPlatform: string;
}): Promise<AgentAccessToolCallResult | null> => {
  const retyped = await retypePendingRedeemJoinPlatform(input);
  if (retyped === null) return null;
  const suggested = retyped.request.suggestedProjectDisplayName ?? null;
  return agentAccessTextResult({
    ok: true,
    status: "pending",
    namingRequired: true,
    projectId: retyped.request.projectId,
    requestId: retyped.request.id,
    suggestedProjectDisplayName: suggested,
    message: buildProjectAclRedeemInviteMessage({
      status: "pending",
      poll: isProjectAclRedeemPollJoin({
        joinPlatform: input.joinPlatform,
        invitePlatform: retyped.invitePlatform,
      }),
      hasSuggestedName: suggested !== null,
    }),
  });
};
