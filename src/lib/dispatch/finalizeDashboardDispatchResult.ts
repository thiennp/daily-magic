import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/dispatchClaudeRunForDashboardUser";

const readAgentRunId = (message: AgentWitchMessage): string | null => {
  const agentRunId = message.payload?.agentRunId;
  return typeof agentRunId === "string" && agentRunId.length > 0
    ? agentRunId
    : null;
};

export const finalizeDashboardDispatchResult = async (
  message: AgentWitchMessage,
  requestId: string,
): Promise<DispatchClaudeRunForDashboardResult> => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    return { ok: false, message };
  }

  const runId = readAgentRunId(message);
  if (runId === null) {
    return {
      ok: false,
      message: buildDispatchError(
        "Dispatch succeeded but no agent run id was returned.",
        requestId,
      ),
    };
  }

  const run = await getAgentRunById(runId);
  if (run === null) {
    return {
      ok: false,
      message: buildDispatchError("Dispatched run was not found.", requestId),
    };
  }

  return { ok: true, message, run };
};
