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

const { dispatchClaudeRunForDashboardUser } =
  await import("@/lib/dispatch/dispatchWriterRunForDashboardUser");
const { getWorkflowRunById } =
  await import("@/lib/workflowOrchestration/workflowRunQueries");
const { registerWorkflowRunSession } =
  await import("@/lib/workflowOrchestration/workflowRunSessionRegistry");
const {
  answerPendingEngineTestHumanStep,
  buildEngineTestDefinition,
  finishEngineTestAgentStep,
  readLastEngineTestHumanStep,
  resetEngineTestState,
  startEngineTestRun,
} =
  await import("@/lib/workflowOrchestration/officialWorkflowRunEngine.testHarness");

describe("official workflow run with a stale cached run record", () => {
  beforeEach(() => {
    vi.stubEnv("AGENT_WITCH_DEV_DASHBOARD", "1");
    resetEngineTestState();
    vi.mocked(dispatchClaudeRunForDashboardUser).mockClear();
  });

  it("advances from the finished step instead of re-dispatching it", async () => {
    const workflowRunId = await startEngineTestRun(buildEngineTestDefinition());
    await answerPendingEngineTestHumanStep(workflowRunId, "Scope confirmed.");
    const run = await getWorkflowRunById(workflowRunId);
    if (!run) throw new Error("run missing");
    registerWorkflowRunSession({ ...run, currentStepIndex: 0 });

    await finishEngineTestAgentStep(0, "Draft ready.");

    expect(dispatchClaudeRunForDashboardUser).toHaveBeenCalledTimes(1);
    expect(readLastEngineTestHumanStep()).toMatchObject({ stepIndex: 2 });
  });
});
