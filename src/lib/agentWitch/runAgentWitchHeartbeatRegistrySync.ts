import {
  syncAgentWitchConnectionRegistry,
  touchAgentWitchConnectionRegistry,
} from "@/lib/agentWitch/syncAgentWitchConnectionRegistry";

export const runAgentWitchHeartbeatRegistrySync = async (input: {
  readonly senderId: string;
  readonly userId?: string;
  readonly deviceId?: string;
}): Promise<void> => {
  if (input.userId !== undefined && input.deviceId !== undefined) {
    await syncAgentWitchConnectionRegistry({
      clientId: input.senderId,
      role: "agent",
      userId: input.userId,
      deviceId: input.deviceId,
    });
  }

  await touchAgentWitchConnectionRegistry(input.senderId);
};
