import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import { deliverAgentWitchCursorLoginIfAuthenticationRequired } from "@/lib/agentWitch/deliverAgentWitchCursorLoginIfAuthenticationRequired";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { markAgentRunCompleted } from "@/lib/dispatch/dispatchWriterRunToAgent";
import { readOptionalPositiveSeconds } from "@/lib/dispatch/readOptionalPositiveSeconds";
import {
  readAgentRunReportFields,
  saveAgentRunReportSummary,
} from "@/lib/dispatch/saveAgentRunReportSummary";

export const handleClaudeResultMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  runtime.broadcastToDashboardUser(sender.userId, message);

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : null;

  // Only the run's executor may report its result (a forged id must not complete another run).
  if (agentRunId !== null) {
    const owned = await getAgentRunById(agentRunId);
    if (owned === null || owned.executorUserId !== sender.userId) {
      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: { errorMessage: "Agent run does not belong to this agent." },
        requestId: message.requestId,
      };
    }
  }

  if (agentRunId !== null) {
    const run = getAgentRunSession(agentRunId);
    if (
      run !== undefined &&
      run.requesterUserId.length > 0 &&
      run.requesterUserId !== sender.userId
    ) {
      runtime.broadcastToDashboardUser(run.requesterUserId, message);
    }
  }

  const exitCode =
    typeof message.payload?.exitCode === "number"
      ? message.payload.exitCode
      : -1;
  const output =
    typeof message.payload?.output === "string" ? message.payload.output : "";

  deliverAgentWitchCursorLoginIfAuthenticationRequired(sender, output);

  if (agentRunId !== null) {
    dispatchAgentRunInputRegistry.remove(agentRunId);
    const report = readAgentRunReportFields(message.payload);
    if (report !== null) {
      await saveAgentRunReportSummary({ runId: agentRunId, ...report }).catch(
        (error: unknown) => {
          console.warn(
            "[agent-witch] Could not save the run report summary:",
            error,
          );
        },
      );
    }
    await markAgentRunCompleted(runtime, agentRunId, exitCode, output, {
      estimateSeconds: readOptionalPositiveSeconds(
        message.payload?.estimateSeconds,
      ),
      actualSeconds: readOptionalPositiveSeconds(
        message.payload?.actualSeconds,
      ),
    });
    const { advanceOfficialWorkflowRunAfterAgentRun } =
      await import("@/lib/workflowOrchestration/advanceOfficialWorkflowRunAfterAgentRun");
    await advanceOfficialWorkflowRunAfterAgentRun(
      runtime,
      agentRunId,
      exitCode,
      output,
    );
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
