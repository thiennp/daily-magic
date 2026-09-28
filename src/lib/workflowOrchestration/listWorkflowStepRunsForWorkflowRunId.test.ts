import { beforeEach, describe, expect, it, vi } from "vitest";

import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: (): boolean => false,
}));

const buildDbRow = (step: WorkflowStepRunRecord): Record<string, unknown> => ({
  id: step.id,
  workflow_run_id: step.workflowRunId,
  step_index: step.stepIndex,
  node_id: step.nodeId,
  node_kind: step.nodeKind,
  status: step.status,
  title: step.title,
  agent_run_id: step.agentRunId,
  output: step.output,
  created_at: step.createdAt,
  updated_at: step.updatedAt,
  completed_at: step.completedAt,
});

const buildStep = (
  stepIndex: number,
  overrides?: Partial<WorkflowStepRunRecord>,
): WorkflowStepRunRecord => ({
  id: `step-${stepIndex}`,
  workflowRunId: "wr-1",
  stepIndex,
  nodeId: `node-${stepIndex}`,
  nodeKind: "agent",
  status: stepIndex === 0 ? "completed" : "waiting_human",
  title: `Step ${stepIndex}`,
  agentRunId: null,
  output: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  completedAt: stepIndex === 0 ? "2026-01-01T00:01:00.000Z" : null,
  ...overrides,
});

describe("listWorkflowStepRunsForWorkflowRunId (DISPATCH-004)", () => {
  beforeEach(async () => {
    sqlMock.mockReset();
    const { clearWorkflowRunSessions } =
      await import("@/lib/workflowOrchestration/workflowRunSessionRegistry");
    clearWorkflowRunSessions("wr-1");
  });

  it("merges Neon rows with a partial in-memory session instead of returning session only", async () => {
    const step0 = buildStep(0, { status: "completed" });
    const step1Db = buildStep(1, {
      id: "step-1-db",
      status: "waiting_human",
      title: "Approve deploy",
    });
    const step1Session = buildStep(1, {
      id: "step-1-session",
      status: "waiting_human",
      title: "Approve deploy (live)",
    });

    sqlMock.mockResolvedValue([
      buildDbRow(step0),
      buildDbRow(step1Db),
      buildDbRow(buildStep(2, { status: "pending", title: "Ship" })),
    ]);

    const { registerWorkflowStepRunSession } =
      await import("@/lib/workflowOrchestration/workflowRunSessionRegistry");
    registerWorkflowStepRunSession(step1Session);

    const { listWorkflowStepRunsForWorkflowRunId } =
      await import("@/lib/workflowOrchestration/workflowRunQueries");

    const steps = await listWorkflowStepRunsForWorkflowRunId("wr-1");

    expect(steps.map((step) => step.stepIndex)).toEqual([0, 1, 2]);
    expect(steps.find((step) => step.stepIndex === 1)?.title).toBe(
      "Approve deploy (live)",
    );
  });
});
