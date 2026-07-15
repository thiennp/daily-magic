import { describe, expect, it, beforeEach } from "vitest";

import {
  appendAgentRunTerminalOutput,
  loadAgentRunTerminalOutput,
} from "@/features/agent/utils/agentRunTerminalOutputStore";
import {
  loadPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { beginAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("agentLiveTerminalLocalStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("restores the latest terminal session after navigation", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession(
        'claude -p "run lint"',
        "claude-cli",
        "mac-a",
      ),
      activeRunId: "run-1",
      output: 'agent-witch@mac ~ % claude -p "run lint"\nhello\n',
      status: "streaming",
    });

    const restored = loadPersistedAgentLiveTerminalState();
    expect(restored.activeRunId).toBe("run-1");
    expect(restored.output).toContain("hello");
    expect(restored.status).toBe("streaming");
    expect(restored.sessionWriterAgent).toBe("claude-cli");
    expect(restored.sessionDeviceId).toBe("mac-a");
  });

  it("restores the locked writer agent for an open Mac session", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession('cursor agent "fix lint"', "cursor"),
      activeRunId: "run-3",
      output: "working\n",
      status: "finished",
    });

    const restored = loadPersistedAgentLiveTerminalState();
    expect(restored.sessionWriterAgent).toBe("cursor");
  });

  it("stores terminal output by run id for report pages", () => {
    appendAgentRunTerminalOutput("run-2", "chunk-1\n");
    appendAgentRunTerminalOutput("run-2", "chunk-2\n");

    expect(loadAgentRunTerminalOutput("run-2")).toBe("chunk-1\nchunk-2\n");
  });
});
