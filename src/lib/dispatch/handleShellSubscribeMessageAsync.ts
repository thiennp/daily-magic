import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { subscribeDashboardTerminal } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import {
  buildShellSubscriptionKey,
  getShellSession,
} from "@/lib/dispatch/shellSessionRegistry";

export const handleShellSubscribeMessageAsync = async (
  _runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can subscribe to a Mac shell.",
      message.requestId,
    );
  }

  const shellSessionId =
    typeof message.payload?.shellSessionId === "string"
      ? message.payload.shellSessionId
      : "";
  const session = getShellSession(shellSessionId);
  if (session === undefined) {
    return buildDispatchError("Unknown shell session.", message.requestId);
  }

  if (session.ownerUserId === sender.userId) {
    subscribeDashboardTerminal(
      sender.id,
      buildShellSubscriptionKey(shellSessionId),
    );
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { shellSessionId, subscribed: true, canWrite: true },
      requestId: message.requestId,
    };
  }

  if (session.activeRunId === null) {
    return buildDispatchError(
      "Shell session is not available for this dashboard client.",
      message.requestId,
    );
  }

  const run =
    getAgentRunSession(session.activeRunId) ??
    (await getAgentRunById(session.activeRunId));
  if (
    run === null ||
    (run.requesterUserId !== sender.userId &&
      run.executorUserId !== sender.userId)
  ) {
    return buildDispatchError(
      "Shell session is not available for this dashboard client.",
      message.requestId,
    );
  }

  subscribeDashboardTerminal(
    sender.id,
    buildShellSubscriptionKey(shellSessionId),
  );
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      shellSessionId,
      subscribed: true,
      canWrite: session.ownerUserId === sender.userId,
    },
    requestId: message.requestId,
  };
};
