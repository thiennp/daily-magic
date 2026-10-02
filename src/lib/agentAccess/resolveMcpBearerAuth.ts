import { readBearerAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessUnauthorized } from "@/lib/agentAccess/requireAgentAccessActor";
import {
  resolveAgentAccessActor,
  type AgentAccessActor,
} from "@/lib/agentAccess/resolveAgentAccessActor";
import { readBearerProjectApiKey } from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";
import {
  resolveProjectApiKeyActor,
  type ProjectApiKeyAuth,
} from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor";

export type McpBearerAuth =
  | {
      readonly kind: "agent_access";
      readonly actor: AgentAccessActor;
      readonly token: string;
    }
  | {
      readonly kind: "project_api_key";
      readonly actor: AgentAccessActor;
      readonly token: string;
      readonly projectAuth: ProjectApiKeyAuth;
    };

export type McpBearerAuthResult = McpBearerAuth | AgentAccessToolCallResult;

export const isMcpBearerAuth = (
  value: McpBearerAuthResult,
): value is McpBearerAuth => "kind" in value;

/** Resolve MCP Authorization as agent-access aw_… or active awc_proj_ key. */
export const resolveMcpBearerAuth = async (
  authorization: string | null,
): Promise<McpBearerAuthResult> => {
  const agentToken = readBearerAgentAccessToken(authorization);
  if (agentToken !== null) {
    const actor = await resolveAgentAccessActor(agentToken);
    if (actor === null) {
      return agentAccessUnauthorized();
    }
    return { kind: "agent_access", actor, token: agentToken };
  }

  const projectToken = readBearerProjectApiKey(authorization);
  if (projectToken !== null) {
    const projectAuth = await resolveProjectApiKeyActor(projectToken);
    if (projectAuth === null) {
      return agentAccessUnauthorized();
    }
    return {
      kind: "project_api_key",
      actor: projectAuth.actor,
      token: projectToken,
      projectAuth,
    };
  }

  return agentAccessUnauthorized();
};
