import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import type AgentWitchHubDispatchRelayResult from "@/lib/agentWitch/types/AgentWitchHubDispatchRelayResult.type";

export const parseAgentWitchHubDispatchRelayResult = (
  value: unknown,
): AgentWitchHubDispatchRelayResult | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.ok !== "boolean") {
    return null;
  }

  if (record.message !== undefined && !isAgentWitchMessage(record.message)) {
    return null;
  }

  return value as AgentWitchHubDispatchRelayResult;
};
