import type { WebSocket } from "ws";

import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import {
  resolvePairingTokenFromRegisterPayload,
  resolveRoleFromRegisterPayload,
} from "@/lib/agentWitch/resolveAgentWitchRegisterPayload";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchRole } from "@/lib/agentWitch/types/AgentWitchRole.type";
import type { AuthActorFromCookies } from "@/lib/auth/resolveAuthActorFromCookieHeader";

import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";
import { replayPendingDispatchApprovalsForUser } from "@/lib/dispatch/replayPendingDispatchApprovalsForUser";
import { replayPendingAgentRunInputsForUser } from "@/lib/dispatch/replayPendingAgentRunInputsForUser";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

export interface AgentWitchConnectionState {
  registered: boolean;
  role: AgentWitchRole;
  userId?: string;
  email?: string;
  pairingToken?: string;
  deviceId?: string;
  deviceLabel?: string;
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

  const resolvedRole = resolveRoleFromRegisterPayload(message.payload);

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
    const pairingToken = resolvePairingTokenFromRegisterPayload(
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
    const [claimedPairing, device] = await Promise.all([
      hub.pairingStore.resolveClaimedPairing(pairingToken),
      findAgentWitchDeviceByToken(pairingToken),
    ]);
    connectionState.userId = claimedPairing?.userId ?? device?.userId;

    const hostname =
      typeof message.payload?.hostname === "string"
        ? message.payload.hostname.trim()
        : "";
    const activeDevice = device?.revokedAt === null ? device : null;
    connectionState.deviceId = activeDevice?.id ?? claimedPairing?.deviceId;
    connectionState.deviceLabel =
      hostname.length > 0 ? hostname : (activeDevice?.deviceLabel ?? undefined);
  }

  if (resolvedRole !== null) {
    if (connectionState.registered) {
      unregisterClient();
      connectionState.registered = false;
    }

    registerClient();

    if (
      connectionState.role === "agent" &&
      connectionState.pairingToken !== undefined
    ) {
      await hub.pairingStore.touchLastSeen(
        connectionState.pairingToken,
        connectionState.deviceLabel ?? null,
      );
    }

    if (
      connectionState.role === "dashboard" &&
      connectionState.userId !== undefined
    ) {
      void replayPendingDispatchApprovalsForUser(hub, connectionState.userId);
      replayPendingAgentRunInputsForUser(hub, connectionState.userId);
    }
  }

  return true;
};
