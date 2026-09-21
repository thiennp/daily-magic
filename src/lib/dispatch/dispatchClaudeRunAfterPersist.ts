import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { dispatchClaudeRunLive } from "@/lib/dispatch/dispatchClaudeRunLive";
import { queueClaudeRunFromExecuteDispatch } from "@/lib/dispatch/queueClaudeRunFromExecuteDispatch";

export const dispatchClaudeRunAfterPersist = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient?: AgentWitchHubClient;
  readonly deviceId: string | null;
  readonly sender: AgentWitchHubClient;
  readonly prompt: string;
  readonly runId: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly includeNextActions: boolean;
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
  readonly compositionSnapshot?: ProjectCompositionSnapshotWire;
  readonly marketplaceTemplateId: string | null;
  readonly requestId?: string;
}): Promise<AgentWitchMessage> => {
  if (input.agentClient === undefined) {
    return queueClaudeRunFromExecuteDispatch({
      executorUserId: input.executorUserId,
      deviceId: input.deviceId,
      runId: input.runId,
      prompt: input.prompt,
      writerAgent: input.writerAgent,
      requestId: input.requestId,
      requesterUserId: input.requesterUserId,
      dispatchPolicy: input.dispatchPolicy,
      includeNextActions: input.includeNextActions,
      sessionContinuation: input.sessionContinuation,
      sourceRunId: input.sourceRunId,
      projectFolderPath: input.projectFolderPath,
      projectId: input.projectId,
      compositionSnapshot: input.compositionSnapshot,
      marketplaceTemplateId: input.marketplaceTemplateId,
    });
  }

  return dispatchClaudeRunLive({
    runtime: input.runtime,
    agentClient: input.agentClient,
    sender: input.sender,
    prompt: input.prompt,
    runId: input.runId,
    writerAgent: input.writerAgent,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    requesterUserId: input.requesterUserId,
    dispatchPolicy: input.dispatchPolicy,
    includeNextActions: input.includeNextActions,
    sessionContinuation: input.sessionContinuation,
    sourceRunId: input.sourceRunId,
    projectFolderPath: input.projectFolderPath,
    projectId: input.projectId,
    compositionSnapshot: input.compositionSnapshot,
    marketplaceTemplateId: input.marketplaceTemplateId,
    requestId: input.requestId,
  });
};
