import { resolveAgentRunWriterCompletion } from "@/lib/dispatch/resolveAgentRunWriterCompletion";

import { DispatchPolicy } from "./dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "./dispatch/types/AgentRunRecord.type";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { saveAgentRunLocal } from "./agentWitchLocalRunStore";

interface BuildFinishedRunInput {
  readonly agentRunId: string;
  readonly originalPrompt: string;
  readonly exitCode: number;
  readonly output: string;
  readonly layout: AgentWitchLocalLayout;
}

export const buildFinishedAgentRunRecord = (
  input: BuildFinishedRunInput,
): AgentRunRecord => {
  const now = new Date().toISOString();
  const executorUserId = input.layout.profileEmail ?? "local-agent";
  const completion = resolveAgentRunWriterCompletion({
    exitCode: input.exitCode,
    output: input.output,
  });

  return {
    id: input.agentRunId,
    groupId: null,
    requesterUserId: executorUserId,
    executorUserId,
    prompt: input.originalPrompt,
    status: completion.status,
    dispatchPolicy: DispatchPolicy.OPEN,
    resultOutput: input.output,
    resultExitCode: completion.resultExitCode,
    resultOutcomeCode: completion.resultOutcomeCode,
    denialReason: completion.denialReason,
    createdAt: now,
    updatedAt: now,
    startedAt: now,
    completedAt: now,
    approvalExpiresAt: null,
    capabilityId: null,
    capabilityVersionId: null,
  };
};

export const persistFinishedAgentRun = (
  layout: AgentWitchLocalLayout,
  input: BuildFinishedRunInput,
): AgentRunRecord => {
  const run = buildFinishedAgentRunRecord(input);
  saveAgentRunLocal(layout, run);
  return run;
};
