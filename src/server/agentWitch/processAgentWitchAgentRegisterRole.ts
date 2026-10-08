import type { WebSocket } from "ws";

import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { reinstateSupersededAgentWitchDevice } from "@/lib/agentWitch/reinstateSupersededAgentWitchDevice";
import { resolveAgentRegisterIdentityRejection } from "@/lib/agentWitch/resolveAgentRegisterIdentityRejection";
import { resolveAgentRegisterPlatform } from "@/lib/agentWitch/resolveAgentRegisterPlatform";
import { resolvePairingTokenFromRegisterPayload } from "@/lib/agentWitch/resolveAgentWitchRegisterPayload";
import { updateAgentWitchDevicePlatform } from "@/lib/agentWitch/updateAgentWitchDevicePlatform";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { processAgentWitchDeviceAuthOnRegister } from "@/server/agentWitch/processAgentWitchDeviceAuthOnRegister";
import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";
import { resolveAgentWitchAgentRegisterConnection } from "@/server/agentWitch/resolveAgentWitchAgentRegisterConnection";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";

const reinstateSupersededDeviceForToken = async (
  pairingToken: string,
): Promise<void> => {
  try {
    const device = await findAgentWitchDeviceByToken(pairingToken);
    if (
      device !== null &&
      device.revokedAt !== null &&
      device.supersededByDeviceId !== null &&
      device.supersededByDeviceId !== undefined
    ) {
      await reinstateSupersededAgentWitchDevice(device.id);
    }
  } catch (error) {
    console.error("[agent-witch] reinstate check failed", error);
  }
};

export const processAgentWitchAgentRegisterRole = async (
  hub: AgentWitchHub,
  socket: WebSocket,
  connectionState: AgentWitchConnectionState,
  message: AgentWitchMessage,
): Promise<boolean> => {
  const pairingToken = resolvePairingTokenFromRegisterPayload(message.payload);

  if (pairingToken === null) {
    sendAgentWitchSocketMessage(socket, {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Agent connections require payload.pairingToken from ~/.agent-witch/config.json.",
      },
      requestId: message.requestId,
    });
    socket.close();
    return false;
  }

  await reinstateSupersededDeviceForToken(pairingToken);

  await resolveAgentWitchAgentRegisterConnection(
    hub,
    connectionState,
    message,
    pairingToken,
  );

  const reportedPlatform = resolveAgentRegisterPlatform(message.payload);
  if (
    reportedPlatform !== null &&
    connectionState.deviceId !== undefined &&
    connectionState.deviceId.length > 0
  ) {
    await updateAgentWitchDevicePlatform({
      deviceId: connectionState.deviceId,
      platform: reportedPlatform,
    });
  }

  if (!isAgentWitchDevDashboardEnabled()) {
    const rejection = resolveAgentRegisterIdentityRejection({
      device: await findAgentWitchDeviceByToken(pairingToken),
      userId: connectionState.userId,
    });
    if (rejection !== null) {
      sendAgentWitchSocketMessage(socket, {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage: rejection.errorMessage,
          ...(rejection.errorCode !== undefined
            ? { errorCode: rejection.errorCode }
            : {}),
        },
        requestId: message.requestId,
      });
      socket.close();
      return false;
    }
  }

  return processAgentWitchDeviceAuthOnRegister(
    hub,
    socket,
    connectionState,
    message,
  );
};
