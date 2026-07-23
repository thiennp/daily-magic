import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  initialAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  bindAgentLiveTerminalDispatchedRunId,
  markAgentLiveTerminalStopRequested,
} from "@/features/agent/utils/agentLiveTerminalStopRun";

describe("agentLiveTerminalStopRun", () => {
  it("binds the dispatched run id while the session is starting", () => {
    const started = beginAgentLiveTerminalSession("claude -p hi", "claude-cli");

    expect(
      bindAgentLiveTerminalDispatchedRunId(started, "run-1"),
    ).toMatchObject({
      activeRunId: "run-1",
      status: "starting",
    });
  });

  it("marks an active run as stopping", () => {
    const streaming = {
      ...beginAgentLiveTerminalSession("claude -p hi", "claude-cli"),
      activeRunId: "run-1",
      status: "streaming" as const,
    };

    expect(markAgentLiveTerminalStopRequested(streaming)).toMatchObject({
      activeRunId: "run-1",
      status: "stopping",
    });
  });

  it("ignores stop requests without an active run id", () => {
    const started = beginAgentLiveTerminalSession("claude -p hi", "claude-cli");

    expect(markAgentLiveTerminalStopRequested(started)).toBe(started);
  });

  it("does not overwrite an existing active run id", () => {
    const started = beginAgentLiveTerminalSession("claude -p hi", "claude-cli");

    expect(
      bindAgentLiveTerminalDispatchedRunId(
        { ...started, activeRunId: "run-existing" },
        "run-new",
      ).activeRunId,
    ).toBe("run-existing");
  });

  it("ignores bind when the session is idle", () => {
    expect(
      bindAgentLiveTerminalDispatchedRunId(
        initialAgentLiveTerminalState(),
        "run-1",
      ),
    ).toEqual(initialAgentLiveTerminalState());
  });
});
