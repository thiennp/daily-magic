import { beforeEach, describe, expect, it, vi } from "vitest";

const runMock = vi.hoisted(() => vi.fn());
const completeMock = vi.hoisted(() => vi.fn(async () => undefined));
const summaryMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@/lib/dispatch/agentRunQueries", () => ({ getAgentRunById: runMock }));
vi.mock("@/lib/dispatch/dispatchWriterRunToAgent", () => ({
  markAgentRunCompleted: completeMock,
}));
vi.mock("@/lib/dispatch/saveAgentRunReportSummary", () => ({
  readAgentRunReportFields: () => null,
  saveAgentRunReportSummary: summaryMock,
}));
vi.mock(
  "@/lib/agentWitch/deliverAgentWitchCursorLoginIfAuthenticationRequired",
  () => ({ deliverAgentWitchCursorLoginIfAuthenticationRequired: vi.fn() }),
);
vi.mock(
  "@/lib/workflowOrchestration/advanceOfficialWorkflowRunAfterAgentRun",
  () => ({
    advanceOfficialWorkflowRunAfterAgentRun: vi.fn(),
  }),
);

import { handleClaudeResultMessageAsync } from "@/lib/dispatch/handleWriterResultMessageAsync";

const runtime = { broadcastToDashboardUser: vi.fn() } as never;
const message = {
  type: "command.claude.result",
  requestId: "r1",
  payload: { agentRunId: "run-1", exitCode: 0, output: "done" },
} as never;

describe("handleClaudeResultMessageAsync ownership", () => {
  beforeEach(() => {
    runMock.mockReset();
    completeMock.mockClear();
  });

  it("does not let another user's agent complete a run", async () => {
    runMock.mockResolvedValue({ executorUserId: "victim" });
    const reply = await handleClaudeResultMessageAsync(runtime, message, {
      role: "agent",
      userId: "attacker",
    } as never);
    expect(reply).toMatchObject({ type: "system.error" });
    expect(completeMock).not.toHaveBeenCalled();
  });

  it("completes the run for its executor", async () => {
    runMock.mockResolvedValue({ executorUserId: "me" });
    await handleClaudeResultMessageAsync(runtime, message, {
      role: "agent",
      userId: "me",
    } as never);
    expect(completeMock).toHaveBeenCalled();
  });
});
