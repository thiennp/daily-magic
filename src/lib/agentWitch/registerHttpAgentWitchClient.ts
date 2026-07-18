import { enqueueAgentWitchDeviceCommand } from "@/lib/agentWitch/agentWitchOutboundCommandQueue";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

const httpAgentClientId = (deviceId: string): string =>
  `http-agent:${deviceId}`;

/** Registers (or refreshes) an HTTP-polled Mac agent in the hub. */
export const registerHttpAgentWitchClient = (input: {
  readonly deviceId: string;
  readonly userId: string;
  readonly pairingToken: string;
  readonly deviceLabel: string | null;
}): AgentWitchHubClient => {
  const hub = getAgentWitchHub();
  const clientId = httpAgentClientId(input.deviceId);
  const existing = hub
    .listAgentClients()
    .find((client) => client.id === clientId);

  const send = (message: AgentWitchMessage): void => {
    enqueueAgentWitchDeviceCommand(input.deviceId, message);
  };

  const client: AgentWitchHubClient = {
    id: clientId,
    role: "agent",
    userId: input.userId,
    pairingToken: input.pairingToken,
    deviceId: input.deviceId,
    deviceLabel: input.deviceLabel ?? existing?.deviceLabel,
    lastHeartbeatAt: new Date().toISOString(),
    send,
  };

  hub.registerClient(client);
  return client;
};
