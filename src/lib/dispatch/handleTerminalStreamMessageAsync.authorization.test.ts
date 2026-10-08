import { afterEach, describe, expect, it } from "vitest";

import { clearTerminalStreamSlotsForTests } from "@/lib/agentWitch/agentWitchStreamSlotManager";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  registerAgentRunSession,
  removeAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { handleTerminalStreamMessageAsync } from "@/lib/dispatch/handleTerminalStreamMessageAsync";
import { clearInactiveTerminalStreamReportsForTests } from "@/lib/dispatch/shouldReportInactiveTerminalStream";
import {
  TERMINAL_STREAM_TEST_RUN_ID,
  buildTerminalStreamExecutorAgent,
  buildTerminalStreamTestRun,
  createTerminalStreamTestRuntime,
} from "@/lib/dispatch/handleTerminalStreamMessageAsync.testHelper";

describe("handleTerminalStreamMessageAsync authorization", () => {
  afterEach(() => {
    removeAgentRunSession(TERMINAL_STREAM_TEST_RUN_ID);
    clearTerminalStreamSlotsForTests();
    clearInactiveTerminalStreamReportsForTests();
  });

  it("rejects terminal stream messages from a non-executor agent", async () => {
    registerAgentRunSession(buildTerminalStreamTestRun());
    const { runtime } = createTerminalStreamTestRuntime();

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "leak\n" },
      },
      buildTerminalStreamExecutorAgent({ userId: "intruder-1" }),
    );

    expect(response?.payload?.errorMessage).toBe(
      "Agent is not the run executor.",
    );
  });

  it("re-adopts the stream of a running run after the slot was lost", async () => {
    registerAgentRunSession(buildTerminalStreamTestRun());
    const { runtime, broadcasts, subscribeRun } =
      createTerminalStreamTestRuntime();
    subscribeRun(TERMINAL_STREAM_TEST_RUN_ID);

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "late\n" },
      },
      buildTerminalStreamExecutorAgent(),
    );

    expect(response?.payload?.errorMessage).toBeUndefined();
    expect(broadcasts.length).toBeGreaterThan(0);
  });

  it("still rejects chunks for a run that is no longer running", async () => {
    registerAgentRunSession(
      buildTerminalStreamTestRun({
        status: AgentRunStatus.COMPLETED,
        completedAt: "2026-07-14T20:01:00.000Z",
      }),
    );
    const { runtime, broadcasts } = createTerminalStreamTestRuntime();

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "late\n" },
      },
      buildTerminalStreamExecutorAgent(),
    );

    expect(response?.payload?.errorMessage).toBe("Agent run is not streaming.");
    expect(broadcasts).toHaveLength(0);
  });

  it("rejects start for completed runs", async () => {
    registerAgentRunSession(
      buildTerminalStreamTestRun({
        status: AgentRunStatus.COMPLETED,
        completedAt: "2026-07-14T20:01:00.000Z",
      }),
    );
    const { runtime } = createTerminalStreamTestRuntime();

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID },
      },
      buildTerminalStreamExecutorAgent(),
    );

    expect(response?.payload?.errorMessage).toBe("Agent run is not streaming.");
  });
});
