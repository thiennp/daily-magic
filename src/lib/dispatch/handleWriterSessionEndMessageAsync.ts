import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

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

  const agentClient = runtime.findAgentClientForUser(sender.userId);
  if (agentClient === undefined) {
    return buildDispatchError(
      "No Mac is connected for your account.",
      message.requestId,
    );
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
    payload: { writerAgent },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { writerAgent, ended: true },
    requestId: message.requestId,
  };
};
