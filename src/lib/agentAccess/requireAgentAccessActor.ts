import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { readBearerAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import {
  resolveAgentAccessActor,
  type AgentAccessActor,
} from "@/lib/agentAccess/resolveAgentAccessActor";

export const agentAccessTextResult = (
  value: unknown,
  isError = false,
): AgentAccessToolCallResult => ({
  isError,
  text: JSON.stringify(value),
});

export const agentAccessUnauthorized = (): AgentAccessToolCallResult =>
  agentAccessTextResult(
    {
      ok: false,
      error: "Bearer token required.",
      code: "unauthorized",
      hint: `No sign-in on this connection. Reconnect with sign-in at ${buildAgentAccessUrls().mcpConnectUrl}, or send Authorization: Bearer <token>.`,
    },
    true,
  );

export const requireAgentAccessActor = async (
  authorization: string | null,
): Promise<AgentAccessActor | AgentAccessToolCallResult> => {
  const token = readBearerAgentAccessToken(authorization);

  if (token === null) {
    return agentAccessUnauthorized();
  }

  const actor = await resolveAgentAccessActor(token);

  return actor ?? agentAccessUnauthorized();
};

export const isAgentAccessActor = (
  value: AgentAccessActor | AgentAccessToolCallResult,
): value is AgentAccessActor => "registrationMethod" in value;
