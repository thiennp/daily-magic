import { describe, expect, it } from "vitest";

import { buildWorkflowRunStepTimelineSteps } from "@/features/dispatch/utils/buildWorkflowRunStepTimelineSteps";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const buildStep = (
  overrides: Partial<WorkflowStepRunRecord> &
    Pick<WorkflowStepRunRecord, "stepIndex" | "status" | "title">,
): WorkflowStepRunRecord => ({
  id: `step-${overrides.stepIndex}`,
  workflowRunId: "wr-1",
  nodeId: `node-${overrides.stepIndex}`,
  nodeKind: overrides.nodeKind ?? "agent",
  agentRunId: null,
  output: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  completedAt: null,
  ...overrides,
});

describe("buildWorkflowRunStepTimelineSteps", () => {
  it("marks completed, active, and pending steps for a mid-run workflow", () => {
    const steps = buildWorkflowRunStepTimelineSteps({
      highlightStepIndex: 1,
      steps: [
        buildStep({
          stepIndex: 0,
          status: "completed",
          title: "Gather context",
          nodeKind: "agent",
        }),
        buildStep({
          stepIndex: 1,
          status: "waiting_human",
          title: "Approve deploy",
          nodeKind: "human",
        }),
        buildStep({
          stepIndex: 2,
          status: "pending",
          title: "Ship change",
          nodeKind: "agent",
        }),
      ],
    });

    expect(steps.map((step) => step.state)).toEqual([
      "done",
      "active",
      "pending",
    ]);
    expect(steps[1]?.detail).toBe("Waiting for you");
  });
});
