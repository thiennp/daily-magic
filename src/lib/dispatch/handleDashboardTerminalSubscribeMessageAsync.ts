import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import {
  buildRunTerminalSubscriptionKey,
  buildWriterSessionTerminalSubscriptionKey,
  subscribeDashboardTerminal,
} from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { getWriterSession } from "@/lib/dispatch/writerSessionRegistry";

export const handleDashboardTerminalSubscribeMessageAsync = async (
  _runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can subscribe to terminal streams.",
      message.requestId,
    );
  }

  const payload = message.payload ?? {};
  const runId = typeof payload.runId === "string" ? payload.runId : "";
  const writerSessionId =
    typeof payload.writerSessionId === "string" ? payload.writerSessionId : "";

  if (runId.length > 0) {
    const run = await getAgentRunForParticipant(runId, sender.userId);
    if (run === null) {
      return buildDispatchError(
        "Agent run is not available for this dashboard client.",
        message.requestId,
      );
    }

    subscribeDashboardTerminal(
      sender.id,
      buildRunTerminalSubscriptionKey(runId),
    );
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { runId, subscribed: true },
      requestId: message.requestId,
    };
  }

  if (writerSessionId.length > 0) {
    const session = getWriterSession(writerSessionId);
    if (session === undefined || session.ownerUserId !== sender.userId) {
      return buildDispatchError(
        "Writer session is not available for this dashboard client.",
        message.requestId,
      );
    }

    subscribeDashboardTerminal(
      sender.id,
      buildWriterSessionTerminalSubscriptionKey(writerSessionId),
    );
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { writerSessionId, subscribed: true },
      requestId: message.requestId,
    };
  }

  return buildDispatchError(
    "dashboard.terminal.subscribe requires payload.runId or payload.writerSessionId.",
    message.requestId,
  );
};
