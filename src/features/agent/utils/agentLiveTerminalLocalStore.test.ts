import { describe, expect, it, beforeEach } from "vitest";

import {
  appendAgentRunTerminalOutput,
  loadAgentRunTerminalOutput,
} from "@/features/agent/utils/agentRunTerminalOutputStore";
import {
  loadPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import {
  beginAgentLiveTerminalSession,
  failAgentLiveTerminalSession,
} from "@/features/agent/utils/agentLiveTerminalState.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("agentLiveTerminalLocalStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("AGENT-025 restores streaming session output after remount", () => {
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

  it("AGENT-025 hydrates empty session output from the run output store", () => {
    appendAgentRunTerminalOutput("run-hydrate", "cached stream\n");
    window.localStorage.setItem(
      "daily-magic.agent-live-terminal.v1",
      JSON.stringify({
        current: {
          activeRunId: "run-hydrate",
          output: "",
          status: "streaming",
          pendingCommandLine: null,
          sessionWriterAgent: "claude-cli",
          sessionDeviceId: "mac-a",
          sessionWriterSessionId: null,
          updatedAt: new Date().toISOString(),
        },
      }),
    );

    expect(loadPersistedAgentLiveTerminalState().output).toBe(
      "cached stream\n",
    );
  });

  it("keeps error sessions in localStorage for resume (AGENT-011)", () => {
    const failed = failAgentLiveTerminalSession(
      {
        ...beginAgentLiveTerminalSession(
          'claude -p "run lint"',
          "claude-cli",
          "mac-a",
        ),
        activeRunId: "run-err",
        status: "starting",
      },
      "No Mac agent connected.",
    );
    persistAgentLiveTerminalState(failed);

    const restored = loadPersistedAgentLiveTerminalState();
    expect(restored.status).toBe("error");
    expect(restored.sessionWriterAgent).toBe("claude-cli");
    expect(restored.sessionDeviceId).toBe("mac-a");
    expect(restored.output).toContain("No Mac agent connected.");
    expect(readTerminalStore().current).not.toBeNull();
  });

  it("clears localStorage when the task finishes (AGENT-011)", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession('cursor agent "fix lint"', "cursor"),
      activeRunId: "run-3",
      output: "working\n",
      status: "finished",
    });

    expect(readTerminalStore().current).toBeNull();
    expect(loadPersistedAgentLiveTerminalState().status).toBe("idle");
    expect(loadAgentRunTerminalOutput("run-3")).toBe("working\n");
  });

  it("stores terminal output by run id for report pages", () => {
    appendAgentRunTerminalOutput("run-2", "chunk-1\n");
    appendAgentRunTerminalOutput("run-2", "chunk-2\n");

    expect(loadAgentRunTerminalOutput("run-2")).toBe("chunk-1\nchunk-2\n");
  });
});
