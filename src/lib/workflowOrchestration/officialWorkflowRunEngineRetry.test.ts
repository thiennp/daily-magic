import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

vi.mock("@/lib/dispatch/dispatchWriterRunForDashboardUser", async () => {
  const { buildMockedDispatchResult } =
    await import("@/lib/workflowOrchestration/officialWorkflowRunEngine.testState");
  return {
    dispatchClaudeRunForDashboardUser: vi.fn(async () =>
      buildMockedDispatchResult(),
    ),
  };
});

const { retryOfficialWorkflowRunStep } =
  await import("@/lib/workflowOrchestration/retryOfficialWorkflowRunStep");
const { getWorkflowRunById } =
  await import("@/lib/workflowOrchestration/workflowRunQueries");
const {
  ENGINE_TEST_REQUESTER_USER_ID,
  answerPendingEngineTestHumanStep,
  buildEngineTestDefinition,
  engineTestBroadcasts,
  engineTestRuntime,
  finishEngineTestAgentStep,
  readLastEngineTestHumanStep,
  resetEngineTestState,
  startEngineTestRun,
} =
  await import("@/lib/workflowOrchestration/officialWorkflowRunEngine.testHarness");

describe("official workflow run retry", () => {
  beforeEach(() => {
    vi.stubEnv("AGENT_WITCH_DEV_DASHBOARD", "1");
    resetEngineTestState();
  });

  it("pauses on the first human step with progress metadata", async () => {
    await startEngineTestRun(buildEngineTestDefinition());

    expect(readLastEngineTestHumanStep()).toMatchObject({
      stepIndex: 0,
      totalSteps: 5,
      title: "Confirm scope",
    });
  });

  it("keeps the failed step index and retries it without losing answers", async () => {
    const workflowRunId = await startEngineTestRun(buildEngineTestDefinition());
    await answerPendingEngineTestHumanStep(workflowRunId, "Scope confirmed.");

    await finishEngineTestAgentStep(1, "boom");

    const failedRun = await getWorkflowRunById(workflowRunId);
    expect(failedRun?.status).toBe("failed");
    expect(failedRun?.currentStepIndex).toBe(1);
    expect(
      engineTestBroadcasts.some(
        (entry) =>
          entry.type === AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_STEP_FAILED,
      ),
    ).toBe(true);

    const retried = await retryOfficialWorkflowRunStep({
      runtime: engineTestRuntime,
      requesterUserId: ENGINE_TEST_REQUESTER_USER_ID,
      workflowRunId,
      dispatchBodyBase: { writerAgent: "claude-cli" },
    });

    expect(retried.ok).toBe(true);
    expect(retried.agentRunId).not.toBe("");

    const retriedRun = await getWorkflowRunById(workflowRunId);
    expect(retriedRun?.status).toBe("running");
    expect(retriedRun?.currentStepIndex).toBe(1);
    expect(retriedRun?.errorMessage).toBeNull();
    expect(retriedRun?.stepOutputs.human_0).toMatchObject({
      response: "Scope confirmed.",
    });
  });

  it("refuses to retry a run that is not failed", async () => {
    const workflowRunId = await startEngineTestRun(buildEngineTestDefinition());

    const result = await retryOfficialWorkflowRunStep({
      runtime: engineTestRuntime,
      requesterUserId: ENGINE_TEST_REQUESTER_USER_ID,
      workflowRunId,
      dispatchBodyBase: { writerAgent: "claude-cli" },
    });

    expect(result.ok).toBe(false);
  });
});
