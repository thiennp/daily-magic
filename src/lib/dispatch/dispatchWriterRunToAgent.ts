import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { appendAgentRunEvent } from "@/lib/dispatch/agentRunEventQueries";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";

export const dispatchClaudeRunToAgent = (
  _runtime: AgentWitchHubRuntime,
  agentClient: AgentWitchHubClient,
  prompt: string,
  agentRunId: string,
  writerAgent: HarnessWriterAgent,
  requestId?: string,
  includeNextActions = false,
  sessionContinuation = false,
  sourceRunId?: string,
  shellSessionId?: string,
  projectFolderPath?: string,
  projectId?: string,
  compositionSnapshot?: ProjectCompositionSnapshotWire,
  marketplaceTemplateId?: string | null,
): void => {
  void _runtime;
  agentClient.send(
    buildCommandClaudeRunDispatchMessage({
      prompt,
      agentRunId,
      writerAgent,
      requestId,
      includeNextActions,
      sessionContinuation,
      sourceRunId,
      shellSessionId,
      projectFolderPath,
      projectId,
      compositionSnapshot,
      marketplaceTemplateId,
    }),
  );
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
