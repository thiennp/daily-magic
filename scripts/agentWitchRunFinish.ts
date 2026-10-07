import { writeProjectHistoryAiSession } from "@agent-witch/live-project-history";
import { resolveAgentRunWriterCompletion } from "@/lib/dispatch/resolveAgentRunWriterCompletion";

import { DispatchPolicy } from "./dispatch/DispatchPolicy.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import type AgentRunRecord from "./dispatch/types/AgentRunRecord.type";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { saveAgentRunLocal } from "./agentWitchLocalRunStore";

interface BuildFinishedRunInput {
  readonly agentRunId: string;
  readonly originalPrompt: string;
  readonly exitCode: number;
  readonly output: string;
  readonly layout: AgentWitchLocalLayout;
  /** Set when the run was started for a project (from dispatch payload). */
  readonly projectId?: string;
  readonly writerAgent?: string;
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

/**
 * Persist the profile-level run record, and when projectId is known write the
 * C1 History AI session under project-data/<projectId>/tasks/<agentRunId>.json
 * (only if local History is ON — gated inside writeProjectHistoryAiSession).
 */
export const persistFinishedAgentRun = (
  layout: AgentWitchLocalLayout,
  input: BuildFinishedRunInput,
): AgentRunRecord => {
  const run = buildFinishedAgentRunRecord(input);
  saveAgentRunLocal(layout, run);

  const projectId = input.projectId?.trim() ?? "";
  if (projectId.length > 0) {
    const promptSummary = extractUserTaskFromWrappedPrompt(
      input.originalPrompt,
    );
    writeProjectHistoryAiSession({
      projectId,
      taskId: input.agentRunId,
      agentRunId: input.agentRunId,
      status: run.status,
      promptSummary,
      resultSummary: input.output,
      createdAt: run.createdAt,
      completedAt: run.completedAt,
      writerAgent: input.writerAgent ?? null,
      threadKey: null,
    });
  }

  return run;
};
