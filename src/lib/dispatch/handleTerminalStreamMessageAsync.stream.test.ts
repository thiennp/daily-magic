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

describe("handleTerminalStreamMessageAsync stream flow", () => {
  afterEach(() => {
    removeAgentRunSession(TERMINAL_STREAM_TEST_RUN_ID);
    clearTerminalStreamSlotsForTests();
  });

  it("accepts start, relays chunks, and ends a stream for the run executor", async () => {
    registerAgentRunSession(
      buildTerminalStreamTestRun({
        requesterUserId: "executor-1",
        executorUserId: "executor-1",
      }),
    );
    const { runtime, broadcasts, subscribeRun } =
      createTerminalStreamTestRuntime();
    subscribeRun(TERMINAL_STREAM_TEST_RUN_ID);
    const sender = buildTerminalStreamExecutorAgent();

    const start = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID },
      },
      sender,
    );

    expect(start?.type).toBe(
      AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_ACCEPTED,
    );

    const chunk = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "hello\n" },
      },
      sender,
    );

    expect(chunk?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(broadcasts).toHaveLength(1);
    expect(broadcasts[0]?.payload?.chunk).toBe("hello\n");

    const end = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID },
      },
      sender,
    );

    expect(end?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(broadcasts).toHaveLength(2);
  });

  it("acks empty chunks without broadcasting", async () => {
    registerAgentRunSession(buildTerminalStreamTestRun());
    const { runtime, broadcasts, subscribeRun } =
      createTerminalStreamTestRuntime();
    subscribeRun(TERMINAL_STREAM_TEST_RUN_ID);
    const sender = buildTerminalStreamExecutorAgent();

    await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID },
      },
      sender,
    );

    const response = await handleTerminalStreamMessageAsync(
      runtime,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
        payload: { runId: TERMINAL_STREAM_TEST_RUN_ID, chunk: "" },
      },
      sender,
    );

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(broadcasts).toHaveLength(0);
  });
});
