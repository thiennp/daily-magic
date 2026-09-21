import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/dispatch/dispatchWriterRunForDashboardUser", async () => {
  const { buildMockedDispatchResult } =
    await import("@/lib/workflowOrchestration/officialWorkflowRunEngine.testState");
  return {
    dispatchClaudeRunForDashboardUser: vi.fn(async () =>
      buildMockedDispatchResult(),
    ),
  };
});

const { getWorkflowRunById } =
  await import("@/lib/workflowOrchestration/workflowRunQueries");
const {
  answerPendingEngineTestHumanStep,
  buildEngineTestDefinition,
  finishEngineTestAgentStep,
  readLastEngineTestHumanStep,
  resetEngineTestState,
  startEngineTestRun,
} =
  await import("@/lib/workflowOrchestration/officialWorkflowRunEngine.testHarness");

const reachReviewCheckpoint = async (): Promise<string> => {
  const workflowRunId = await startEngineTestRun(buildEngineTestDefinition());
  await answerPendingEngineTestHumanStep(workflowRunId, "Scope confirmed.");
  await finishEngineTestAgentStep(0, "Draft ready: renamed two files.");
  return workflowRunId;
};

describe("official workflow human checkpoints", () => {
  beforeEach(() => {
    vi.stubEnv("AGENT_WITCH_DEV_DASHBOARD", "1");
    resetEngineTestState();
  });

  it("shows the prior agent output and skip affordance at the checkpoint", async () => {
    await reachReviewCheckpoint();

    expect(readLastEngineTestHumanStep()).toMatchObject({
      stepIndex: 2,
      allowSkip: true,
      priorAgentOutputPreview: "Draft ready: renamed two files.",
    });
  });

  it("skips the fix step when the operator approves without changes", async () => {
    const workflowRunId = await reachReviewCheckpoint();

    await answerPendingEngineTestHumanStep(workflowRunId, "Approve, ship it.");

    expect(readLastEngineTestHumanStep()).toMatchObject({
      stepIndex: 4,
      title: "Confirm fixes",
    });
  });

  it("runs the fix step when the operator asks for changes", async () => {
    const workflowRunId = await reachReviewCheckpoint();

    await answerPendingEngineTestHumanStep(
      workflowRunId,
      "Please rename the hook.",
    );

    const run = await getWorkflowRunById(workflowRunId);
    expect(run?.status).toBe("running");
    expect(run?.currentStepIndex).toBe(3);
  });
});
