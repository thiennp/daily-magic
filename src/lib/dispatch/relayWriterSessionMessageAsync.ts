import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import { deliverAgentWitchCursorLoginIfAuthenticationRequired } from "@/lib/agentWitch/deliverAgentWitchCursorLoginIfAuthenticationRequired";
import { readAgentOutputTextFromMessagePayload } from "@/lib/agentWitch/readAgentOutputTextFromMessagePayload";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { buildWriterSessionTerminalSubscriptionKey } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import {
  authorizeWriterSessionPublisher,
  readWriterSessionId,
} from "@/lib/dispatch/writerSessionRegistry";

export const relayWriterSessionMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  const writerSessionId = readWriterSessionId(message.payload);
  if (writerSessionId.length === 0) {
    return buildDispatchError(
      "Writer session messages require payload.writerSessionId.",
      message.requestId,
    );
  }

  const session = authorizeWriterSessionPublisher(sender, writerSessionId);
  if (session === undefined) {
    return buildDispatchError(
      "Writer session is not active for this agent.",
      message.requestId,
    );
  }

  deliverAgentWitchCursorLoginIfAuthenticationRequired(
    sender,
    readAgentOutputTextFromMessagePayload(message.payload),
  );

  runtime.broadcastToSubscribedDashboardUser(
    session.ownerUserId,
    buildWriterSessionTerminalSubscriptionKey(writerSessionId),
    message,
  );

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
