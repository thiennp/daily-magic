import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  failAgentLiveTerminalSession,
} from "@/features/agent/utils/agentLiveTerminalState.type";

describe("failAgentLiveTerminalSession (AGENT-011)", () => {
  it("keeps session identity and marks error", () => {
    const started = beginAgentLiveTerminalSession(
      "claude -p hello",
      "claude-cli",
      "mac-1",
    );
    const failed = failAgentLiveTerminalSession(started, "Mac offline");

    expect(failed.status).toBe("error");
    expect(failed.sessionWriterAgent).toBe("claude-cli");
    expect(failed.sessionDeviceId).toBe("mac-1");
    expect(failed.pendingCommandLine).toBe("claude -p hello");
    expect(failed.output).toContain("Mac offline");
  });

  it("falls back when error message is blank", () => {
    const started = beginAgentLiveTerminalSession("claude -p hello", "cursor");
    const failed = failAgentLiveTerminalSession(started, "   ");

    expect(failed.output).toContain("Something went wrong.");
  });
});
