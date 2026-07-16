import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import {
  getWriterSession,
  readWriterSessionId,
  removeWriterSession,
} from "@/lib/dispatch/writerSessionRegistry";

export const handleWriterSessionEndMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can end writer sessions.",
      message.requestId,
    );
  }

  const writerAgent = message.payload?.writerAgent;
  if (!isHarnessWriterAgent(writerAgent)) {
    return buildDispatchError(
      "command.writer.session.end requires payload.writerAgent.",
      message.requestId,
    );
  }

  const writerSessionId = readWriterSessionId(message.payload);
  if (writerSessionId.length > 0) {
    const session = getWriterSession(writerSessionId);
    if (
      session === undefined ||
      session.ownerUserId !== sender.userId ||
      session.writerAgent !== writerAgent
    ) {
      return buildDispatchError(
        "Writer session is not active for this dashboard client.",
        message.requestId,
      );
    }

    removeWriterSession(writerSessionId);
  }

  const agentClient = runtime.findAgentClientForUser(sender.userId);
  if (agentClient === undefined) {
    return buildDispatchError(
      "No Mac is connected for your account.",
      message.requestId,
    );
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
    payload: {
      writerAgent,
      ...(writerSessionId.length > 0 ? { writerSessionId } : {}),
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      writerAgent,
      ...(writerSessionId.length > 0 ? { writerSessionId } : {}),
      ended: true,
    },
    requestId: message.requestId,
  };
};
