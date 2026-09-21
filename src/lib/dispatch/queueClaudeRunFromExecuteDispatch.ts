import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  buildQueuedClaudeRunDispatchAck,
  queueClaudeRunInDispatchOutbox,
} from "@/lib/dispatch/queueClaudeRunInDispatchOutbox";

export const queueClaudeRunFromExecuteDispatch = async (input: {
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly runId: string;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly requestId?: string;
  readonly requesterUserId: string;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly includeNextActions: boolean;
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
  readonly compositionSnapshot?: ProjectCompositionSnapshotWire;
  readonly marketplaceTemplateId?: string | null;
}): Promise<AgentWitchMessage> => {
  if (input.deviceId === null || input.deviceId.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "No Mac is available to run this task.",
        agentRunId: input.runId,
      },
      requestId: input.requestId,
    };
  }

  await queueClaudeRunInDispatchOutbox({
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    runId: input.runId,
    prompt: input.prompt,
    writerAgent: input.writerAgent,
    requestId: input.requestId,
    includeNextActions: input.includeNextActions,
    sessionContinuation: input.sessionContinuation,
    sourceRunId: input.sourceRunId,
    projectFolderPath: input.projectFolderPath,
    projectId: input.projectId,
    compositionSnapshot: input.compositionSnapshot,
    marketplaceTemplateId: input.marketplaceTemplateId,
  });

  return buildQueuedClaudeRunDispatchAck({
    runId: input.runId,
    requestId: input.requestId,
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    dispatchPolicy: input.dispatchPolicy,
  });
};
