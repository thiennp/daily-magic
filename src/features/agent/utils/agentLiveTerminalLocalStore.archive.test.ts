import { describe, expect, it, beforeEach } from "vitest";

import {
  clearPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { beginAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("agentLiveTerminalLocalStore archive (AGENT-053)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("archives the focused run when Start clears the live slot", () => {
    persistAgentLiveTerminalState({
      ...beginAgentLiveTerminalSession(
        'cursor agent "ship"',
        "cursor",
        "mac-a",
      ),
      activeRunId: "run-keep",
      output: "still going\n",
      status: "streaming",
    });

    clearPersistedAgentLiveTerminalState();

    const store = readTerminalStore();
    expect(store.current).toBeNull();
    expect(store.byRunId["run-keep"]?.status).toBe("streaming");
    expect(store.byRunId["run-keep"]?.output).toContain("still going");
  });
});
