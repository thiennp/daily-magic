import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { CREATE_PROJECT_ASSISTANT_INVITE_TOOL_NAME } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import { botProjectInviteErrorBody } from "@/lib/projects/acl/invites/botInvites/botProjectInviteErrorBody";
import { botProjectInviteSuccessBody } from "@/lib/projects/acl/invites/botInvites/botProjectInviteSuccessBody";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";

const readArgs = (args: unknown): Readonly<Record<string, unknown>> =>
  args !== null && typeof args === "object"
    ? (args as Record<string, unknown>)
    : {};

/** MCP / invoke entry for DF-038 bot-made invites. Null = not this tool. */
export const executeCreateProjectAssistantInviteTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== CREATE_PROJECT_ASSISTANT_INVITE_TOOL_NAME) {
    return null;
  }
  const args = readArgs(input.args);
  if (typeof args.projectId !== "string" || args.projectId.trim().length === 0) {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const result = await createBotProjectInvite({
    projectId: args.projectId.trim(),
    actorUserId: input.actor.id,
    role: args.role,
    scopes: args.scopes,
    teamLabel: args.teamLabel,
    platform: args.platform,
  });
  return result.ok
    ? agentAccessTextResult(botProjectInviteSuccessBody(result))
    : agentAccessTextResult(botProjectInviteErrorBody(result).body, true);
};
