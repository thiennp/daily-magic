import type { WebSocket } from "ws";

import { admitAgentWitchPlaceholderCheckIn } from "@/lib/agentWitch/admitAgentWitchPlaceholderCheckIn";
import { resolveAgentWitchInstallDeviceLabelFromPayload } from "@/lib/agentWitch/resolveAgentWitchInstallDeviceLabelFromPayload";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";

/**
 * 6abb783e: refuses (and closes) the first WS registration of a pairing
 * placeholder that would go past the plan's computer limit. Returns true
 * when the connection was refused.
 */
export const refuseAgentRegisterOverComputerLimit = async (
  socket: WebSocket,
  message: AgentWitchMessage,
  pairingToken: string,
): Promise<boolean> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return false;
  }
  const admission = await admitAgentWitchPlaceholderCheckIn({
    pairingToken,
    deviceLabel: resolveAgentWitchInstallDeviceLabelFromPayload(message.payload)
      .installDeviceLabel,
  });
  if (admission.ok) {
    return false;
  }
  sendAgentWitchSocketMessage(socket, {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: {
      errorMessage: admission.errorMessage,
      errorCode: admission.code,
    },
    requestId: message.requestId,
  });
  socket.close();
  return true;
};
