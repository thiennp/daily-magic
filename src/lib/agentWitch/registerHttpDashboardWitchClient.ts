import { enqueueDashboardUserEvent } from "@/lib/agentWitch/agentWitchDashboardEventBuffer";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

const httpDashboardClientId = (userId: string): string =>
  `http-dashboard:${userId}`;

/** Registers (or refreshes) an HTTP/SSE dashboard client in the hub. */
export const registerHttpDashboardWitchClient = (input: {
  readonly userId: string;
  readonly email?: string | null;
}): AgentWitchHubClient => {
  const hub = getAgentWitchHub();
  const clientId = httpDashboardClientId(input.userId);

  const send = (message: AgentWitchMessage): void => {
    enqueueDashboardUserEvent(input.userId, message);
  };

  const client: AgentWitchHubClient = {
    id: clientId,
    role: "dashboard",
    userId: input.userId,
    ...(input.email !== undefined &&
    input.email !== null &&
    input.email.length > 0
      ? { email: input.email }
      : {}),
    lastHeartbeatAt: new Date().toISOString(),
    send,
  };

  hub.registerClient(client);
  return client;
};
