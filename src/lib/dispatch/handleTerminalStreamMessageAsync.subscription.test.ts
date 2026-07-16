import { afterEach, describe, expect, it } from "vitest";

import { clearTerminalStreamSlotsForTests } from "@/lib/agentWitch/agentWitchStreamSlotManager";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
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

describe("handleTerminalStreamMessageAsync subscription filtering", () => {
  afterEach(() => {
    removeAgentRunSession(TERMINAL_STREAM_TEST_RUN_ID);
    clearTerminalStreamSlotsForTests();
  });

  it("does not broadcast chunks when no dashboard client is subscribed", async () => {
    registerAgentRunSession(
      buildTerminalStreamTestRun({
        requesterUserId: "executor-1",
        executorUserId: "executor-1",
      }),
    );
    const { runtime, broadcasts } = createTerminalStreamTestRuntime();
    const sender = buildTerminalStreamExecutorAgent();

    await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID },
      },
      sender,
    );

    await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "hidden\n" },
      },
      sender,
    );

    expect(broadcasts).toHaveLength(0);
  });
});
