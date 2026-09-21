import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_RECONNECTING_QUEUED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { enqueueAgentWitchDispatchOutbox } from "@/lib/agentWitch/enqueueAgentWitchDispatchOutbox";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";

export const queueClaudeRunInDispatchOutbox = async (input: {
  readonly executorUserId: string;
  readonly deviceId: string;
  readonly runId: string;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly requestId?: string;
  readonly includeNextActions?: boolean;
  readonly sessionContinuation?: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
  readonly compositionSnapshot?: ProjectCompositionSnapshotWire;
  readonly marketplaceTemplateId?: string | null;
}): Promise<void> => {
  await enqueueAgentWitchDispatchOutbox({
    userId: input.executorUserId,
    deviceId: input.deviceId,
    idempotencyKey: `writer-run:${input.runId}`,
    message: buildCommandClaudeRunDispatchMessage({
      prompt: input.prompt,
      agentRunId: input.runId,
      writerAgent: input.writerAgent,
      requestId: input.requestId,
      includeNextActions: input.includeNextActions,
      sessionContinuation: input.sessionContinuation,
      sourceRunId: input.sourceRunId,
      projectFolderPath: input.projectFolderPath,
      projectId: input.projectId,
      compositionSnapshot: input.compositionSnapshot,
      marketplaceTemplateId: input.marketplaceTemplateId,
    }),
  });
};

export const buildQueuedClaudeRunDispatchAck = (input: {
  readonly runId: string;
  readonly requestId?: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly dispatchPolicy?: DispatchPolicyValue;
  readonly approvalRunPayload?: boolean;
}): AgentWitchMessage => {
  const queuedMeta = {
    queued: true,
    errorMessage: MAC_RECONNECTING_QUEUED_ERROR,
    errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_QUEUED,
  };

  if (input.approvalRunPayload === true) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: {
        runId: input.runId,
        status: AgentRunStatus.RUNNING,
        ...queuedMeta,
      },
      requestId: input.requestId,
    };
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: input.runId,
      shellCanWrite: input.requesterUserId === input.executorUserId,
      ...(input.dispatchPolicy !== undefined
        ? { dispatchPolicy: input.dispatchPolicy }
        : {}),
      ...queuedMeta,
    },
    requestId: input.requestId,
  };
};
