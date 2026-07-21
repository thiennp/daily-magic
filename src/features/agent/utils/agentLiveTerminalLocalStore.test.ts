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

  it("AGENT-026 keeps finished sessions so follow-ups can continue", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession('cursor agent "fix lint"', "cursor"),
      activeRunId: "run-3",
      output: "working\n",
      status: "finished",
    });

    const restored = loadPersistedAgentLiveTerminalState();
    expect(readTerminalStore().current).not.toBeNull();
    expect(restored.status).toBe("finished");
    expect(restored.output).toContain("working");
    expect(restored.sessionWriterAgent).toBe("cursor");
    expect(loadAgentRunTerminalOutput("run-3")).toBe("working\n");
  });

  it("clears localStorage when the session returns to idle", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession('cursor agent "fix lint"', "cursor"),
      activeRunId: "run-idle",
      output: "",
      status: "idle",
    });

    expect(readTerminalStore().current).toBeNull();
    expect(loadPersistedAgentLiveTerminalState().status).toBe("idle");
  });
});
