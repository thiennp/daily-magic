import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { wrapPromptWithAgentRunInputGuardrails } from "@/lib/dispatch/agentRunInputGuardrails.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";

export const dispatchClaudeRunToAgent = (
  runtime: AgentWitchHubRuntime,
  agentClient: AgentWitchHubClient,
  prompt: string,
  agentRunId: string,
  requestId?: string,
): void => {
  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    payload: {
      prompt: wrapPromptWithAgentRunInputGuardrails(prompt),
      agentRunId,
    },
    requestId,
  });
};

export const markAgentRunRunning = async (runId: string): Promise<void> => {
  await updateAgentRunStatus(runId, AgentRunStatus.RUNNING);
};

export const markAgentRunCompleted = async (
  runId: string,
  exitCode: number,
  output: string,
): Promise<void> => {
  await updateAgentRunStatus(
    runId,
    exitCode === 0 ? AgentRunStatus.COMPLETED : AgentRunStatus.FAILED,
    {
      resultExitCode: exitCode,
      resultOutput: output,
    },
  );
};

export const notifyDashboardUser = (
  runtime: AgentWitchHubRuntime,
  userId: string,
  message: AgentWitchMessage,
): void => {
  runtime.broadcastToDashboardUser(userId, message);
};
