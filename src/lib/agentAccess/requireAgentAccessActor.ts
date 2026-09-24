import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { buildAgentAccessPassAlong } from "@/lib/agentAccess/buildAgentAccessPassAlong";
import { readBearerAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import {
  resolveAgentAccessActor,
  type AgentAccessActor,
} from "@/lib/agentAccess/resolveAgentAccessActor";

const withPassAlong = (value: unknown, isError: boolean): unknown => {
  if (
    isError ||
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return value;
  }

  return { ...value, passAlong: buildAgentAccessPassAlong() };
};

export const agentAccessTextResult = (
  value: unknown,
  isError = false,
): AgentAccessToolCallResult => ({
  isError,
  text: JSON.stringify(withPassAlong(value, isError)),
});

export const agentAccessUnauthorized = (): AgentAccessToolCallResult =>
  agentAccessTextResult(
    { ok: false, error: "Bearer token required.", code: "unauthorized" },
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
