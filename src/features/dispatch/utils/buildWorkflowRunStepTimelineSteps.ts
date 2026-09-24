import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const resolveWorkflowStepVisualState = (input: {
  readonly step: WorkflowStepRunRecord;
  readonly highlightStepIndex: number | null;
}): AgentLiveProgressStepState => {
  const { step, highlightStepIndex } = input;

  if (step.status === "completed") {
    return "done";
  }
  if (step.status === "failed") {
    return "failed";
  }
  if (step.status === "skipped") {
    return "skipped";
  }
  if (
    step.status === "running" ||
    step.status === "waiting_human" ||
    highlightStepIndex === step.stepIndex
  ) {
    return "active";
  }
  return "pending";
};

const formatWorkflowStepDetail = (
  step: WorkflowStepRunRecord,
): string | null => {
  if (step.nodeKind === "human") {
    return step.status === "waiting_human"
      ? "Waiting for you"
      : "Your checkpoint";
  }
  if (step.status === "running") {
    return "Agent running on your Mac";
  }
  if (step.status === "completed") {
    return "Finished";
  }
  return null;
};

export const buildWorkflowRunStepTimelineSteps = (input: {
  readonly steps: readonly WorkflowStepRunRecord[];
  readonly highlightStepIndex?: number | null;
}): readonly AgentLiveProgressStep[] => {
  const highlightStepIndex = input.highlightStepIndex ?? null;

  return input.steps.map((step) => ({
    id: step.id,
    label: step.title,
    detail: formatWorkflowStepDetail(step),
    state: resolveWorkflowStepVisualState({ step, highlightStepIndex }),
  }));
};
