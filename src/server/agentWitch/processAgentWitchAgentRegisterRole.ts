import type { WebSocket } from "ws";

import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { resolvePairingTokenFromRegisterPayload } from "@/lib/agentWitch/resolveAgentWitchRegisterPayload";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { processAgentWitchDeviceAuthOnRegister } from "@/server/agentWitch/processAgentWitchDeviceAuthOnRegister";
import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";
import { resolveAgentWitchAgentRegisterConnection } from "@/server/agentWitch/resolveAgentWitchAgentRegisterConnection";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";

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

  await resolveAgentWitchAgentRegisterConnection(
    hub,
    connectionState,
    message,
    pairingToken,
  );

  if (!isAgentWitchDevDashboardEnabled()) {
    const device = await findAgentWitchDeviceByToken(pairingToken);
    if (
      device === null ||
      device.revokedAt !== null ||
      connectionState.userId === undefined
    ) {
      sendAgentWitchSocketMessage(socket, {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage:
            "This Mac identity is not linked. Run the install command from Home while signed in.",
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
