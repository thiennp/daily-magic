import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
} from "@/features/agent/utils/agentLiveTerminalState.type";
import { reduceAgentLiveTerminalWriterSessionChunk } from "@/features/agent/utils/reduceAgentLiveTerminalWriterSessionChunk";

describe("reduceAgentLiveTerminalWriterSessionChunk", () => {
  it("appends streamed writer session output for the active writer", () => {
    const state = beginAgentLiveTerminalSession(
      "cursor agent",
      "cursor",
      "device-1",
    );

    const next = reduceAgentLiveTerminalWriterSessionChunk(state, {
      writerAgent: "cursor",
      chunk: "Logged in as thien\n",
    });

    expect(next.status).toBe("streaming");
    expect(next.output).toContain("Logged in as thien");
  });

  it("ignores chunks for a different writer session", () => {
    const state = {
      ...beginAgentLiveTerminalSession("cursor agent", "cursor", "device-1"),
      sessionWriterSessionId: "session-a",
    };

    const next = reduceAgentLiveTerminalWriterSessionChunk(state, {
      writerAgent: "cursor",
      writerSessionId: "session-b",
      chunk: "ignored\n",
    });

    expect(next).toBe(state);
  });

  it("accepts chunks for a restarted writer session before the new ack arrives", () => {
    const finishedState = {
      ...beginAgentLiveTerminalSession("cursor agent", "cursor", "device-1"),
      sessionWriterSessionId: "session-a",
      status: "finished" as const,
    };

    const state = continueAgentLiveTerminalSession(
      finishedState,
      "cursor agent",
    );

    expect(state.sessionWriterSessionId).toBeNull();

    const next = reduceAgentLiveTerminalWriterSessionChunk(state, {
      writerAgent: "cursor",
      writerSessionId: "session-b",
      chunk: "2.5.0\n",
    });

    expect(next.status).toBe("streaming");
    expect(next.output).toContain("2.5.0");
  });
});
