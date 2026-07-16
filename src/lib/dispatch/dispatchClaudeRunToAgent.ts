import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { appendAgentRunEvent } from "@/lib/dispatch/agentRunEventQueries";
import { wrapPromptForAgentRun } from "@/lib/dispatch/wrapPromptForAgentRun";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const dispatchClaudeRunToAgent = (
  runtime: AgentWitchHubRuntime,
  agentClient: AgentWitchHubClient,
  prompt: string,
  agentRunId: string,
  writerAgent: HarnessWriterAgent,
  requestId?: string,
  includeNextActions = false,
): void => {
  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    payload: {
      prompt: wrapPromptForAgentRun(prompt, { includeNextActions }),
      agentRunId,
      writerAgent,
    },
    requestId,
  });
};

export const markAgentRunRunning = async (
  runtime: AgentWitchHubRuntime,
  runId: string,
): Promise<AgentRunRecord | null> => {
  const run = await updateAgentRunStatus(runId, AgentRunStatus.RUNNING);
  if (run !== null) {
    await appendAgentRunEvent({
      agentRunId: runId,
      kind: "status.running",
      payload: { status: run.status },
    });
    broadcastAgentRunRecord(runtime, run);
  }
  return run;
};

export const markAgentRunCompleted = async (
  runtime: AgentWitchHubRuntime,
  runId: string,
  exitCode: number,
  output: string,
): Promise<AgentRunRecord | null> => {
  const status =
    exitCode === 0 ? AgentRunStatus.COMPLETED : AgentRunStatus.FAILED;
  const run = await updateAgentRunStatus(runId, status, {
    resultExitCode: exitCode,
    resultOutput: output,
  });
  if (run !== null) {
    await appendAgentRunEvent({
      agentRunId: runId,
      kind: "terminal.end",
      payload: { exitCode, output },
    });
    await appendAgentRunEvent({
      agentRunId: runId,
      kind: `status.${status}`,
      payload: { status, exitCode },
    });
    broadcastAgentRunRecord(runtime, run);
  }
  return run;
};

export const notifyDashboardUser = (
  runtime: AgentWitchHubRuntime,
  userId: string,
  message: AgentWitchMessage,
): void => {
  runtime.broadcastToDashboardUser(userId, message);
};
