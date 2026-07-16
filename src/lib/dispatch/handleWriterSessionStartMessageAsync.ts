import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import {
  resolveClaudeRunAgentClient,
  resolveTargetDeviceId,
} from "@/lib/dispatch/resolveClaudeRunAgentClient";
import { createWriterSession } from "@/lib/dispatch/writerSessionRegistry";

export const handleWriterSessionStartMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can start writer sessions.",
      message.requestId,
    );
  }

  const writerAgent = message.payload?.writerAgent;
  if (!isHarnessWriterAgent(writerAgent)) {
    return buildDispatchError(
      "command.writer.session.start requires payload.writerAgent.",
      message.requestId,
    );
  }

  const payload = message.payload ?? {};
  const agentResolution = await resolveClaudeRunAgentClient({
    runtime,
    senderUserId: sender.userId,
    executorUserId: sender.userId,
    targetDeviceId: resolveTargetDeviceId(payload),
    requestId: message.requestId,
  });

  if (!agentResolution.ok) {
    return agentResolution.error;
  }

  if (agentResolution.agentClient === undefined) {
    return buildDispatchError(
      "No Mac is connected for your account.",
      message.requestId,
    );
  }

  const session = createWriterSession({
    ownerUserId: sender.userId,
    executorUserId: sender.userId,
    deviceId: agentResolution.deviceId,
    writerAgent,
    dashboardClientId: sender.id,
  });

  agentResolution.agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
    payload: {
      writerAgent,
      writerSessionId: session.writerSessionId,
      ...(agentResolution.deviceId !== null
        ? { targetDeviceId: agentResolution.deviceId }
        : {}),
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      writerAgent,
      writerSessionId: session.writerSessionId,
      started: true,
    },
    requestId: message.requestId,
  };
};
