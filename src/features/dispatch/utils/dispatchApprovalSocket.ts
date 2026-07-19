import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import {
  parseDispatchApprovalSocketMessage,
  type AgentRunInputRequest,
} from "./agentRunInputSocket";

export type { AgentRunInputRequest };

export { parseDispatchApprovalSocketMessage };

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
