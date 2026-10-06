import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { normalizeProjectInviteTokenArg } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { toPublicAccessErrorCode } from "@/lib/projects/acl/mapProjectAccessError";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

const readSuggestedDisplayName = (args: unknown): string | null => {
  if (args === null || typeof args !== "object") {
    return null;
  }
  const record = args as {
    suggestedProjectDisplayName?: unknown;
    projectDisplayName?: unknown;
  };
  if (typeof record.suggestedProjectDisplayName === "string") {
    return record.suggestedProjectDisplayName;
  }
  // Alias accepted for convenience (catalog documents suggestedProjectDisplayName).
  if (typeof record.projectDisplayName === "string") {
    return record.projectDisplayName;
  }
  return null;
};

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
  const suggested = readSuggestedDisplayName(input.args);
  const result = await redeemProjectInvite({
    token: normalizeProjectInviteTokenArg(token),
    actorUserId: input.actor.id,
    suggestedProjectDisplayName: suggested,
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
      message:
        "Invite redeemed and membership is active (invite auto-approve). Call get_my_project_access; skip wait for Approve. Immediately create your Grok webhook-triggered routine for this project if missing (if Grok Bot shows your user a confirm card, they approve it). Then post the routine's Webhook URL and Webhook key links in your user's chat so they can copy both; have the project owner click Add wake link at Access › People › Members › {name} › Grok wake link and paste them there, never into chat. Also give them this direct link filled with projectId and membershipId from this response: " +
          buildAgentAccessUrls().origin +
          "/projects/{projectId}#wake-link-{membershipId}. You cannot see the key. Prefer rotate_project_api_key if you need a fresh awc_proj_ key.",
    });
  }
  return agentAccessTextResult({
    ok: true,
    status: "pending",
    namingRequired: true,
    projectId: result.projectId,
    requestId: result.request.id,
    suggestedProjectDisplayName: result.suggestedProjectDisplayName,
    message:
      result.suggestedProjectDisplayName !== null
        ? "Invite redeemed. Membership is pending until the project owner Approves. Your suggested nickname was stored for owner prefill (owner may change it). No scoped key yet. Call get_my_project_access. As soon as status is active, immediately create your Grok webhook-triggered routine if missing, post the Webhook URL and Webhook key links in your user's chat, have the project owner paste at Access › People › Members › {name} › Grok wake link (Add wake link) — never into chat — and give them the direct wake-link URL with projectId and membershipId filled in; do not wait to be asked."
        : "Invite redeemed. Membership is pending until the project owner Approves and sets your project display name. No scoped key yet. Call get_my_project_access. As soon as status is active, immediately create your Grok webhook-triggered routine if missing, post the Webhook URL and Webhook key links in your user's chat, have the project owner paste at Access › People › Members › {name} › Grok wake link (Add wake link) — never into chat — and give them the direct wake-link URL with projectId and membershipId filled in; do not wait to be asked.",
  });
};
