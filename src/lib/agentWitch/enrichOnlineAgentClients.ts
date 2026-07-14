import type { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export async function enrichOnlineAgentClients(
  pairingStore: AgentWitchPairingStore,
  clients: readonly AgentWitchHubClient[],
): Promise<readonly AgentWitchHubClient[]> {
  return Promise.all(
    clients.map(async (client) => {
      if (client.role !== "agent" || client.pairingToken === undefined) {
        return client;
      }

      const needsUserId = client.userId === undefined;
      const needsDeviceId = client.deviceId === undefined;
      if (!needsUserId && !needsDeviceId) {
        return client;
      }

      const claimedPairing =
        needsUserId || needsDeviceId
          ? await pairingStore.resolveClaimedPairing(client.pairingToken)
          : null;

      const resolvedUserId = client.userId ?? claimedPairing?.userId;
      const resolvedDeviceId = client.deviceId ?? claimedPairing?.deviceId;
      const device =
        resolvedUserId === undefined || resolvedDeviceId === undefined
          ? await findAgentWitchDeviceByToken(client.pairingToken)
          : null;
      const activeDevice = device?.revokedAt === null ? device : null;
      const userId = resolvedUserId ?? activeDevice?.userId;
      const deviceId = resolvedDeviceId ?? activeDevice?.id;

      if (userId === client.userId && deviceId === client.deviceId) {
        return client;
      }

      return {
        ...client,
        ...(userId !== undefined ? { userId } : {}),
        ...(deviceId !== undefined ? { deviceId } : {}),
      };
    }),
  );
}
