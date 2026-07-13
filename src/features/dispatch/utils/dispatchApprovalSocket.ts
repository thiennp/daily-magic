import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  buildAgentWitchWebSocketUrl,
  createAgentWitchRequestId,
  sendAgentWitchPairingToken,
} from "@/features/wsTest/utils/agentWitchSocketUtils";

import {
  parseDispatchApprovalSocketMessage,
  type AgentRunInputRequest,
} from "./agentRunInputSocket";

export type { AgentRunInputRequest };

export const connectDispatchApprovalSocket = (
  onApprovalRequired: (payload: {
    readonly runId: string;
    readonly requesterEmail: string;
    readonly prompt: string;
  }) => void,
  onInputRequired?: (payload: AgentRunInputRequest) => void,
): { readonly disconnect: () => void; readonly socket: WebSocket | null } => {
  const wsUrl = buildAgentWitchWebSocketUrl();
  if (wsUrl.length === 0) {
    return { disconnect: () => undefined, socket: null };
  }

  const socket = new WebSocket(wsUrl);

  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
        payload: { role: "dashboard" },
      }),
    );
    sendAgentWitchPairingToken(socket);
  });

  socket.addEventListener("message", (event) => {
    try {
      const parsed: unknown = JSON.parse(String(event.data));
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("type" in parsed)
      ) {
        return;
      }

      parseDispatchApprovalSocketMessage(parsed as Record<string, unknown>, {
        onApprovalRequired,
        onInputRequired,
      });
    } catch {
      return;
    }
  });

  return {
    disconnect: () => {
      socket.close();
    },
    socket,
  };
};

export const sendDispatchApprovalResponse = (
  socket: WebSocket,
  runId: string,
  decision: "approve" | "deny",
  denialReason?: string,
): void => {
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESPOND,
      payload: {
        runId,
        decision,
        ...(denialReason !== undefined ? { denialReason } : {}),
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export { sendAgentRunInputResponse } from "./agentRunInputSocket";
