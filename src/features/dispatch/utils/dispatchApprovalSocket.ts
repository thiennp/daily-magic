import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  buildAgentWitchWebSocketUrl,
  createAgentWitchRequestId,
  sendAgentWitchPairingToken,
} from "@/features/wsTest/utils/agentWitchSocketUtils";

export const connectDispatchApprovalSocket = (
  onApprovalRequired: (payload: {
    readonly runId: string;
    readonly requesterEmail: string;
    readonly prompt: string;
  }) => void,
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
        typeof parsed === "object" &&
        parsed !== null &&
        "type" in parsed &&
        parsed.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED &&
        "payload" in parsed &&
        typeof parsed.payload === "object" &&
        parsed.payload !== null
      ) {
        const payload = parsed.payload as Record<string, unknown>;
        const runId = typeof payload.runId === "string" ? payload.runId : "";
        const prompt = typeof payload.prompt === "string" ? payload.prompt : "";
        const requesterEmail =
          typeof payload.requesterEmail === "string"
            ? payload.requesterEmail
            : "Teammate";

        if (runId.length > 0 && prompt.length > 0) {
          onApprovalRequired({ runId, prompt, requesterEmail });
        }
      }
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
