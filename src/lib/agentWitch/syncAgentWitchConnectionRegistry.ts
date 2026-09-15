import {
  deleteAgentWitchConnection,
  touchAgentWitchConnection,
  upsertAgentWitchConnection,
} from "@/lib/agentWitch/agentWitchConnectionRegistry";
import type { AgentWitchRole } from "@/lib/agentWitch/types/AgentWitchRole.type";

export const syncAgentWitchConnectionRegistry = async (input: {
  readonly clientId: string;
  readonly role: AgentWitchRole;
  readonly userId?: string;
  readonly deviceId?: string;
}): Promise<void> => {
  if (
    input.role !== "agent" ||
    input.userId === undefined ||
    input.deviceId === undefined
  ) {
    return;
  }

  await upsertAgentWitchConnection({
    clientId: input.clientId,
    deviceId: input.deviceId,
    userId: input.userId,
  });
};

export const touchAgentWitchConnectionRegistry = async (
  clientId: string,
): Promise<void> => {
  await touchAgentWitchConnection(clientId);
};

export const removeAgentWitchConnectionRegistry = async (
  clientId: string,
): Promise<void> => {
  await deleteAgentWitchConnection(clientId);
};
