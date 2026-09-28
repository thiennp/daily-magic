"use client";

import AgentLiveProgressStepRow from "@/features/agent/AgentLiveProgressStepRow";
import { buildWorkflowRunStepTimelineSteps } from "@/features/dispatch/utils/buildWorkflowRunStepTimelineSteps";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

interface WorkflowRunStepTimelineProps {
  readonly steps: readonly WorkflowStepRunRecord[];
  readonly highlightStepIndex?: number | null;
  readonly isWorking?: boolean;
}

export default function WorkflowRunStepTimeline({
  steps,
  highlightStepIndex = null,
  isWorking = false,
}: WorkflowRunStepTimelineProps) {
  if (steps.length === 0) {
    return null;
  }

  const timelineSteps = buildWorkflowRunStepTimelineSteps({
    steps,
    highlightStepIndex,
  });

  return (
    <div className="mt-3" aria-label="Workflow steps">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Workflow steps
      </p>
      <ol className="mt-2 space-y-2">
        {timelineSteps.map((step) => (
          <AgentLiveProgressStepRow
            key={step.id}
            step={step}
            isWorking={isWorking && step.state === "active"}
            workingEllipsis="…"
          />
        ))}
      </ol>
    </div>
  );
}
