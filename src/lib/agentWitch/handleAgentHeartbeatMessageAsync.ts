import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { buildAgentWitchHeartbeatAckPayload } from "@/lib/agentWitch/buildAgentWitchHeartbeatAckPayload";
import { deliverAgentWitchInstallBundleUpdateIfBehind } from "@/lib/agentWitch/deliverAgentWitchInstallBundleUpdateIfBehind";
import { resolveAgentWitchInstallDeviceLabelFromPayload } from "@/lib/agentWitch/resolveAgentWitchInstallDeviceLabelFromPayload";
import { runAgentWitchHeartbeatDeviceMaintenance } from "@/lib/agentWitch/runAgentWitchHeartbeatDeviceMaintenance";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const resolveHeartbeatEmail = (
  payload: Readonly<Record<string, unknown>> | undefined,
  senderEmail: string | undefined,
): string | null => {
  if (typeof payload?.email === "string" && payload.email.trim().length > 0) {
    return payload.email.trim().toLowerCase();
  }

  if (senderEmail !== undefined && senderEmail.trim().length > 0) {
    return senderEmail.trim().toLowerCase();
  }

  return null;
};

const resolveHeartbeatInstallBundleVersion = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string | null => {
  if (typeof payload?.installBundleVersion !== "string") {
    return null;
  }

  const trimmedVersion = payload.installBundleVersion.trim();
  return trimmedVersion.length > 0 ? trimmedVersion : null;
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

  const { hostname, installDeviceLabel } =
    resolveAgentWitchInstallDeviceLabelFromPayload(message.payload);
  const email = resolveHeartbeatEmail(message.payload, sender.email);
  const installBundleVersion = resolveHeartbeatInstallBundleVersion(
    message.payload,
  );
  const claimedPairing = await runtime.pairingStore.resolveClaimedPairing(
    sender.pairingToken,
  );

  await runtime.pairingStore.touchLastSeen(
    sender.pairingToken,
    installDeviceLabel,
  );
  runtime.updateClient(senderId, {
    lastHeartbeatAt: new Date().toISOString(),
    ...(installDeviceLabel !== null ? { deviceLabel: installDeviceLabel } : {}),
    ...(email !== null ? { email } : {}),
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
  const userId = sender.userId ?? claimedPairing?.userId;
  if (deviceId !== undefined && userId !== undefined) {
    await runAgentWitchHeartbeatDeviceMaintenance({
      runtime,
      userId,
      deviceId,
      hostname,
      installDeviceLabel,
      installBundleVersion,
      wakeError,
    });
  }

  deliverAgentWitchInstallBundleUpdateIfBehind(sender, installBundleVersion);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
    payload: buildAgentWitchHeartbeatAckPayload({
      installBundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    }),
  };
};
