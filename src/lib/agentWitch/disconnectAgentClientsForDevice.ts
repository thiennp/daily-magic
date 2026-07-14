import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const disconnectAgentClientsForDevice = (
  hub: AgentWitchHub,
  userId: string,
  deviceId: string,
): void => {
  const clients = hub
    .listOnlineAgentClientsForUser(userId)
    .filter((client) => client.deviceId === deviceId);

  clients.forEach((client) => {
    client.send({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "This device was removed from your account.",
      },
    });
    hub.unregisterClient(client.id);
  });
};

export default disconnectAgentClientsForDevice;
