import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import type { AgentWitchHub } from "./agentWitchHub";
import { handleAgentHeartbeatMessageAsync } from "./handleAgentHeartbeatMessageAsync";
import { handleAgentPairMessageAsync } from "./handleAgentPairMessageAsync";
import { handleAgentWitchSyncMessage } from "./handleAgentWitchSyncMessage";
import { handleClaudeInputRequiredMessageAsync } from "@/lib/dispatch/handleClaudeInputRequiredMessageAsync";
import { handleClaudeInputRespondMessageAsync } from "@/lib/dispatch/handleClaudeInputRespondMessageAsync";
import { handleClaudeResultMessageAsync } from "@/lib/dispatch/handleClaudeResultMessageAsync";
import { handleClaudeRunMessageAsync } from "@/lib/dispatch/handleClaudeRunMessageAsync";
import {
  handleAgentAgentRunRelayResultAsync,
  handleDashboardAgentRunRelayAsync,
} from "@/lib/dispatch/handleDashboardAgentRunRelayAsync";
import { handleDispatchApprovalRespondAsync } from "@/lib/dispatch/handleDispatchApprovalRespond";
import { handleTerminalStreamMessageAsync } from "@/lib/dispatch/handleTerminalStreamMessageAsync";
import { handleWriterSessionChunkMessageAsync } from "@/lib/dispatch/handleWriterSessionChunkMessageAsync";
import { handleWriterSessionEndMessageAsync } from "@/lib/dispatch/handleWriterSessionEndMessageAsync";
import { handleWriterSessionReadyMessageAsync } from "@/lib/dispatch/handleWriterSessionReadyMessageAsync";
import { handleWriterSessionStartMessageAsync } from "@/lib/dispatch/handleWriterSessionStartMessageAsync";

const isTerminalStreamMessage = (type: string): boolean =>
  type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START ||
  type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK ||
  type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END;

const isDashboardAgentRunRequest = (type: string): boolean =>
  type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_LIST ||
  type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_GET;

const isAgentAgentRunResult = (type: string): boolean =>
  type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_LIST_RESULT ||
  type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_GET_RESULT;

export const routeAgentWitchMessageAsync = async (
  hub: AgentWitchHub,
  senderId: string,
  sender: AgentWitchHubClient | undefined,
  message: AgentWitchMessage,
): Promise<AgentWitchMessage | null> => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
    return handleAgentPairMessageAsync(hub, senderId, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT) {
    return handleAgentHeartbeatMessageAsync(hub, senderId, sender, message);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN) {
    return handleClaudeRunMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT) {
    return handleClaudeResultMessageAsync(hub, message, sender);
  }

  if (
    message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED
  ) {
    return handleClaudeInputRequiredMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND) {
    return handleClaudeInputRespondMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END) {
    return handleWriterSessionEndMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START) {
    return handleWriterSessionStartMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY) {
    return handleWriterSessionReadyMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK) {
    return handleWriterSessionChunkMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESPOND) {
    return handleDispatchApprovalRespondAsync(hub, message, sender);
  }

  if (isTerminalStreamMessage(message.type)) {
    return handleTerminalStreamMessageAsync(hub, message, sender);
  }

  if (isDashboardAgentRunRequest(message.type)) {
    return handleDashboardAgentRunRelayAsync(hub, message, sender);
  }

  if (isAgentAgentRunResult(message.type)) {
    return handleAgentAgentRunRelayResultAsync(hub, message, sender);
  }

  return handleAgentWitchSyncMessage(hub, senderId, message, sender);
};
