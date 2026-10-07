import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { completeProjectHistoryPageRequest } from "@/lib/projects/acl/messaging/messenger/projectHistoryPageRequestRegistry";
import { summarizeProjectHistoryPageTraffic } from "@/lib/projects/acl/messaging/messenger/summarizeProjectHistoryPageTraffic";

/**
 * Hub handler for project.history.page.result from the project computer.
 * Completes the in-memory pending request. Bodies stay in transit only —
 * never written to Neon, relay tables, or traffic-log summaries.
 */
export const handleProjectHistoryPageResultMessage = async (
  _runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only paired project computers can publish history page results.",
      },
      requestId: message.requestId,
    };
  }

  // Scrubbed summary only — never log entry bodies.
  console.info(
    "[hosted-device-hub-proxy]",
    summarizeProjectHistoryPageTraffic({
      type: message.type,
      requestId: message.requestId,
      payload: message.payload,
    }),
  );

  const completed = completeProjectHistoryPageRequest(
    message.requestId,
    message.payload,
  );

  if (!completed) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { ignored: true, reason: "no_pending_request" },
      requestId: message.requestId,
    };
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
