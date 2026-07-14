import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("reduceAgentLiveTerminalMessage", () => {
  it("enters starting state when a session begins", () => {
    const next = beginAgentLiveTerminalSession();
    expect(next.status).toBe("starting");
    expect(next.output).toContain("waiting for your Mac");
  });

  it("tracks dispatched runs and appends stream chunks", () => {
    const dispatched = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      },
    );

    const streamed = reduceAgentLiveTerminalMessage(dispatched, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
      payload: {
        runId: "run-1",
        chunk: "hello\n",
      },
    });

    expect(streamed.status).toBe("streaming");
    expect(streamed.output).toContain("hello");
  });

  it("finishes on claude result for the active run", () => {
    const active = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-2",
        },
      },
    );

    const finished = reduceAgentLiveTerminalMessage(active, {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: {
        agentRunId: "run-2",
        exitCode: 0,
        output: "done",
      },
    });

    expect(finished.status).toBe("finished");
  });
});
