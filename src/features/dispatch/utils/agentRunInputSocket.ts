import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";

import { clearPendingInputForRun } from "@/features/dispatch/agentRunInputStore";
import { readEndedAgentRunId } from "@/features/dispatch/utils/readEndedAgentRunId";
import { parseAgentRunInputRequest } from "@/features/dispatch/utils/parseAgentRunInputContext";
import type { AgentRunInputContext } from "@/lib/dispatch/agentRunInputContext.type";

export interface AgentRunInputRequest {
  readonly agentRunId: string;
  readonly question: string;
  readonly partialOutput: string;
  readonly context?: AgentRunInputContext;
}

export type DispatchApprovalRequiredPayload = {
  readonly runId: string;
  /** Requester name, label or email; null when the server sent none. */
  readonly requesterEmail: string | null;
  readonly prompt: string;
  /** S0: ISO time the 15-minute approval window ends; null on old servers. */
  readonly approvalExpiresAt: string | null;
  /** Optional richer card fields (API tip d0832fdd). */
  readonly tool: string | null;
  readonly computerName: string | null;
  readonly projectFolder: string | null;
};

const optionalTrimmedString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const parseDispatchApprovalSocketMessage = (
  parsed: Record<string, unknown>,
  handlers: {
    readonly onApprovalRequired: (
      payload: DispatchApprovalRequiredPayload,
    ) => void;
    readonly onInputRequired?: (payload: AgentRunInputRequest) => void;
    readonly onRunEnd?: (agentRunId: string) => void;
  },
): void => {
  const payload = parsed.payload as Record<string, unknown>;
  const isPayloadObj = typeof payload === "object" && payload !== null;
  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED &&
    isPayloadObj
  ) {
    const runId = typeof payload.runId === "string" ? payload.runId : "";
    const prompt = typeof payload.prompt === "string" ? payload.prompt : "";
    const requesterEmail = optionalTrimmedString(payload.requesterEmail);
    const approvalExpiresAt =
      typeof payload.approvalExpiresAt === "string"
        ? payload.approvalExpiresAt
        : null;

    if (runId.length > 0 && prompt.length > 0) {
      handlers.onApprovalRequired({
        runId,
        prompt,
        requesterEmail,
        approvalExpiresAt,
        tool: optionalTrimmedString(payload.tool),
        computerName: optionalTrimmedString(payload.computerName),
        projectFolder: optionalTrimmedString(payload.projectFolder),
      });
    }
  }

  if (
    handlers.onInputRequired !== undefined &&
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED &&
    isPayloadObj
  ) {
    const request = parseAgentRunInputRequest(payload);
    if (request !== null) {
      handlers.onInputRequired(request);
    }
  }

  if (handlers.onRunEnd !== undefined && isPayloadObj) {
    const endedRunId = readEndedAgentRunId(parsed.type, payload);
    if (endedRunId !== null) {
      handlers.onRunEnd(endedRunId);
    }
  }
};

export const sendAgentRunInputResponse = (
  socket: WebSocket,
  agentRunId: string,
  response: string,
): void => {
  // afae8216: an answered question no longer offers "Open question".
  clearPendingInputForRun(agentRunId);
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND,
      payload: {
        agentRunId,
        response,
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
