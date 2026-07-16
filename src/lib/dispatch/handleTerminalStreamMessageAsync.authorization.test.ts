import { afterEach, describe, expect, it } from "vitest";

import { clearTerminalStreamSlotsForTests } from "@/lib/agentWitch/agentWitchStreamSlotManager";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  registerAgentRunSession,
  removeAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { handleTerminalStreamMessageAsync } from "@/lib/dispatch/handleTerminalStreamMessageAsync";
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

  it("rejects chunks before the stream has started", async () => {
    registerAgentRunSession(buildTerminalStreamTestRun());
    const { runtime, broadcasts } = createTerminalStreamTestRuntime();

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "early\n" },
      },
      buildTerminalStreamExecutorAgent(),
    );

    expect(response?.payload?.errorMessage).toBe(
      "Terminal stream is not active for this run.",
    );
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
