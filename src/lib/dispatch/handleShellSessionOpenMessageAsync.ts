import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import {
  buildShellSubscriptionKey,
  createShellSession,
} from "@/lib/dispatch/shellSessionRegistry";
import {
  resolveClaudeRunAgentClient,
  resolveTargetDeviceId,
} from "@/lib/dispatch/resolveClaudeRunAgentClient";
import { subscribeDashboardTerminal } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";

export const handleShellSessionOpenMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can open a Mac shell.",
      message.requestId,
    );
  }

  const payload = message.payload ?? {};
  const cols = typeof payload.cols === "number" ? payload.cols : 120;
  const rows = typeof payload.rows === "number" ? payload.rows : 32;
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

  const session = createShellSession({
    ownerUserId: sender.userId,
    deviceId: agentResolution.deviceId,
    mode: "interactive",
  });
  subscribeDashboardTerminal(
    sender.id,
    buildShellSubscriptionKey(session.shellSessionId),
  );

  agentResolution.agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPEN,
    payload: {
      shellSessionId: session.shellSessionId,
      mode: "interactive",
      cols,
      rows,
      ...(agentResolution.deviceId !== null
        ? { targetDeviceId: agentResolution.deviceId }
        : {}),
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      shellSessionId: session.shellSessionId,
      opened: true,
    },
    requestId: message.requestId,
  };
};
