import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";

export const executeProjectAclRedeemInviteTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "redeem_project_invite") {
    return null;
  }
  const token =
    input.args !== null &&
    typeof input.args === "object" &&
    typeof (input.args as { token?: unknown }).token === "string"
      ? (input.args as { token: string }).token
      : null;
  if (token === null || token.trim().length === 0) {
    return agentAccessTextResult(
      { ok: false, error: "token required.", code: "invalid_arguments" },
      true,
    );
  }
  const result = await redeemProjectInvite({
    token,
    actorUserId: input.actor.id,
  });
  if (!result.ok) {
    // Generic error for invalid tokens (A7) — still distinguish already_* for auth'd agents.
    const error =
      result.code === "invalid_token" || result.code === "exhausted"
        ? "invalid_or_expired_invite"
        : result.code;
    return agentAccessTextResult({ ok: false, error, code: error }, true);
  }
  return agentAccessTextResult({
    ok: true,
    status: "pending",
    namingRequired: true,
    projectId: result.projectId,
    requestId: result.request.id,
    message:
      "Invite redeemed. Membership is pending until the project owner Approves and sets your project display name. No scoped key yet.",
  });
};
