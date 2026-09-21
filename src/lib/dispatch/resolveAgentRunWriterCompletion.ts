import {
  AgentRunOutcomeCode,
  resolveAgentRunOutcomeFromWriterOutput,
  type AgentRunOutcomeCodeValue,
} from "@agent-witch/shared/dispatch";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { buildAgentRunOutcomeDenialReason } from "@/lib/dispatch/buildAgentRunOutcomeDenialReason";

export interface AgentRunWriterCompletion {
  readonly status: AgentRunStatusValue;
  readonly resultExitCode: number;
  readonly resultOutcomeCode: AgentRunOutcomeCodeValue | null;
  readonly denialReason: string | null;
}

export const resolveAgentRunWriterCompletion = (input: {
  readonly exitCode: number;
  readonly output: string;
}): AgentRunWriterCompletion => {
  const outcome = resolveAgentRunOutcomeFromWriterOutput(input.output);

  if (outcome !== null) {
    return {
      status: AgentRunStatus.FAILED,
      resultExitCode: input.exitCode === 0 ? 1 : input.exitCode,
      resultOutcomeCode: outcome.code,
      denialReason: buildAgentRunOutcomeDenialReason(outcome),
    };
  }

  return {
    status:
      input.exitCode === 0 ? AgentRunStatus.COMPLETED : AgentRunStatus.FAILED,
    resultExitCode: input.exitCode,
    resultOutcomeCode: null,
    denialReason: null,
  };
};

export const isRecoverableAgentRunOutcome = (
  code: AgentRunOutcomeCodeValue | null,
): boolean =>
  code === AgentRunOutcomeCode.SESSION_LIMIT ||
  code === AgentRunOutcomeCode.PROVIDER_QUOTA;
