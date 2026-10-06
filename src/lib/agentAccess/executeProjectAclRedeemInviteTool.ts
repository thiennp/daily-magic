import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { normalizeProjectInviteTokenArg } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { toPublicAccessErrorCode } from "@/lib/projects/acl/mapProjectAccessError";
import { buildProjectAclRedeemInviteMessage } from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";
import { isProjectAclRedeemPollJoin } from "@/lib/agentAccess/isProjectAclRedeemPollJoin";
import { readProjectAclRedeemInviteArgs } from "@/lib/agentAccess/readProjectAclRedeemInviteArgs";

export const executeProjectAclRedeemInviteTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "redeem_project_invite") {
    return null;
  }
  const { token, suggested, joinPlatform } = readProjectAclRedeemInviteArgs(
    input.args,
  );
  if (token === null || token.trim().length === 0) {
    return agentAccessTextResult(
      { ok: false, error: "token required.", code: "invalid_arguments" },
      true,
    );
  }
  const result = await redeemProjectInvite({
    token: normalizeProjectInviteTokenArg(token),
    actorUserId: input.actor.id,
    suggestedProjectDisplayName: suggested,
    joinPlatform,
  });
  if (!result.ok) {
    if (
      result.code === "display_name_taken" ||
      result.code === "display_name_invalid" ||
      result.code === "display_name_reserved" ||
      result.code === "display_name_required"
    ) {
      const code = toPublicAccessErrorCode(result.code);
      return agentAccessTextResult({ ok: false, error: code, code }, true);
    }
    // Generic error for invalid tokens (A7) — still distinguish already_* for auth'd agents.
    const error =
      result.code === "invalid_token" || result.code === "exhausted"
        ? "invalid_or_expired_invite"
        : result.code;
    return agentAccessTextResult({ ok: false, error, code: error }, true);
  }
  const poll = isProjectAclRedeemPollJoin({
    joinPlatform,
    membershipDeliveryMode:
      result.status === "active" ? result.membership.deliveryMode : undefined,
  });
  if (result.status === "active") {
    return agentAccessTextResult({
      ok: true,
      status: "active",
      namingRequired: false,
      projectId: result.projectId,
      requestId: result.request.id,
      membershipId: result.membership.id,
      projectDisplayName: result.membership.projectDisplayName,
      projectApiKey: result.projectApiKey,
      suggestedProjectDisplayName: result.suggestedProjectDisplayName,
      message: buildProjectAclRedeemInviteMessage({
        status: "active",
        poll,
        hasSuggestedName: true,
      }),
    });
  }
  return agentAccessTextResult({
    ok: true,
    status: "pending",
    namingRequired: true,
    projectId: result.projectId,
    requestId: result.request.id,
    suggestedProjectDisplayName: result.suggestedProjectDisplayName,
    message: buildProjectAclRedeemInviteMessage({
      status: "pending",
      poll,
      hasSuggestedName: result.suggestedProjectDisplayName !== null,
    }),
  });
};
