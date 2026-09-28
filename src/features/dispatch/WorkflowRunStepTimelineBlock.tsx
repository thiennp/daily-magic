"use client";

import WorkflowRunStepTimeline from "@/features/dispatch/WorkflowRunStepTimeline";
import { useWorkflowRunSteps } from "@/features/dispatch/hooks/useWorkflowRunSteps";

interface WorkflowRunStepTimelineBlockProps {
  readonly workflowRunId: string;
  readonly highlightStepIndex: number;
  readonly isWorking?: boolean;
}

export default function WorkflowRunStepTimelineBlock({
  workflowRunId,
  highlightStepIndex,
  isWorking = false,
}: WorkflowRunStepTimelineBlockProps) {
  const { steps } = useWorkflowRunSteps(workflowRunId);

  return (
    <WorkflowRunStepTimeline
      steps={steps}
      highlightStepIndex={highlightStepIndex}
      isWorking={isWorking}
    />
  );
}
