import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { updateAgentWitchDeviceWakeError } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";

const resolveHeartbeatHostname = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string | null => {
  if (typeof payload?.hostname !== "string") {
    return null;
  }

  const trimmedHostname = payload.hostname.trim();
  return trimmedHostname.length > 0 ? trimmedHostname : null;
};

export const handleAgentHeartbeatMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  senderId: string,
  sender: AgentWitchHubClient | undefined,
  message: AgentWitchMessage,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent" || sender.pairingToken === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Only paired agent clients can send heartbeats.",
      },
      requestId: message.requestId,
    };
  }

  const hostname = resolveHeartbeatHostname(message.payload);
  const claimedPairing = await runtime.pairingStore.resolveClaimedPairing(
    sender.pairingToken,
  );

  await runtime.pairingStore.touchLastSeen(sender.pairingToken, hostname);
  runtime.updateClient(senderId, {
    lastHeartbeatAt: new Date().toISOString(),
    ...(hostname !== null ? { deviceLabel: hostname } : {}),
    ...(sender.deviceId === undefined && claimedPairing?.deviceId !== undefined
      ? { deviceId: claimedPairing.deviceId }
      : {}),
    ...(sender.userId === undefined && claimedPairing !== null
      ? { userId: claimedPairing.userId }
      : {}),
  });

  const wakeErrorRaw = message.payload?.wakeError;
  const wakeError =
    typeof wakeErrorRaw === "string" && wakeErrorRaw.trim().length > 0
      ? wakeErrorRaw.trim()
      : null;
  const deviceId = sender.deviceId ?? claimedPairing?.deviceId;
  if (deviceId !== undefined) {
    await updateAgentWitchDeviceWakeError({ deviceId, wakeError });
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
