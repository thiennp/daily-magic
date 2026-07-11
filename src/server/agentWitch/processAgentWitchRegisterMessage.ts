import type { WebSocket } from "ws";

import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchRole } from "@/lib/agentWitch/types/AgentWitchRole.type";
import type { AuthActorFromCookies } from "@/lib/auth/resolveAuthActorFromCookieHeader";

import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";
import { replayPendingDispatchApprovalsForUser } from "@/lib/dispatch/replayPendingDispatchApprovalsForUser";

export interface AgentWitchConnectionState {
  registered: boolean;
  role: AgentWitchRole;
  userId?: string;
  email?: string;
  pairingToken?: string;
}

export interface AgentWitchWebSocketAuthContext {
  readonly dashboardActor: AuthActorFromCookies | null;
}

export const processAgentWitchRegisterMessage = async (
  hub: AgentWitchHub,
  socket: WebSocket,
  authContext: AgentWitchWebSocketAuthContext,
  connectionState: AgentWitchConnectionState,
  message: AgentWitchMessage,
  registerClient: () => void,
  unregisterClient: () => void,
): Promise<boolean> => {
  if (message.type !== AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER) {
    return true;
  }

  const resolvedRole = hub.resolveRoleFromRegisterPayload(message.payload);

  if (resolvedRole === "dashboard") {
    if (authContext.dashboardActor === null) {
      sendAgentWitchSocketMessage(socket, {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage:
            "Dashboard connections require an authenticated browser session.",
        },
        requestId: message.requestId,
      });
      socket.close();
      return false;
    }

    connectionState.role = "dashboard";
    connectionState.userId = authContext.dashboardActor.id;
    connectionState.email = authContext.dashboardActor.email;
  }

  if (resolvedRole === "agent") {
    const pairingToken = hub.resolvePairingTokenFromRegisterPayload(
      message.payload,
    );

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

    connectionState.role = "agent";
    connectionState.pairingToken = pairingToken;
    connectionState.userId =
      await hub.resolveUserIdForAgentRegister(pairingToken);
  }

  if (resolvedRole !== null) {
    if (connectionState.registered) {
      unregisterClient();
      connectionState.registered = false;
    }

    registerClient();

    if (
      connectionState.role === "dashboard" &&
      connectionState.userId !== undefined
    ) {
      void replayPendingDispatchApprovalsForUser(hub, connectionState.userId);
    }
  }

  return true;
};
