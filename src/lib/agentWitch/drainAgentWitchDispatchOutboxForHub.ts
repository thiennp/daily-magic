import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { drainAgentWitchDispatchOutboxForAgentClient } from "@/lib/agentWitch/drainAgentWitchDispatchOutboxForAgentClient";

export const drainAgentWitchDispatchOutboxForHub = async (
  hub: AgentWitchHub,
): Promise<void> => {
  const agents = hub.listAgentClients();

  for (const agentClient of agents) {
    await drainAgentWitchDispatchOutboxForAgentClient(agentClient);
  }
};
