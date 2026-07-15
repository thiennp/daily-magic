import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  finishAgentLiveTerminalSession,
  isAgentLiveTerminalSessionOpen,
  shouldContinueAgentLiveTerminalThread,
} from "@/features/agent/utils/agentLiveTerminalState.type";

describe("agentLiveTerminal session", () => {
  it("opens a session with the selected writer agent", () => {
    const state = beginAgentLiveTerminalSession(
      "claude -p run lint",
      "claude-cli",
      "mac-a",
    );

    expect(state.sessionWriterAgent).toBe("claude-cli");
    expect(state.sessionDeviceId).toBe("mac-a");
    expect(isAgentLiveTerminalSessionOpen(state)).toBe(true);
    expect(shouldContinueAgentLiveTerminalThread(state)).toBe(true);
  });

  it("clears the session when finished", () => {
    const finished = finishAgentLiveTerminalSession();

    expect(finished.sessionWriterAgent).toBeNull();
    expect(finished.sessionDeviceId).toBeNull();
    expect(isAgentLiveTerminalSessionOpen(finished)).toBe(false);
    expect(finished.output).toBe("");
    expect(finished.status).toBe("idle");
  });
});
