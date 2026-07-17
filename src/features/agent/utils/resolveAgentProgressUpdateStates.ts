import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const resolveAgentProgressUpdateStates = (input: {
  readonly updateCount: number;
  readonly isFinished: boolean;
  readonly isWorking: boolean;
  readonly needsInput: boolean;
}): readonly AgentLiveProgressStepState[] => {
  if (input.updateCount === 0) {
    return [];
  }

  return Array.from({ length: input.updateCount }, (_, index) => {
    const isLast = index === input.updateCount - 1;
    if (!isLast) {
      return "done";
    }
    if (input.needsInput || input.isWorking) {
      return "active";
    }
    if (input.isFinished) {
      return "done";
    }
    return "pending";
  });
};
