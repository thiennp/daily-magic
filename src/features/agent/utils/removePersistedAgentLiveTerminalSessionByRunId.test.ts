import { beforeEach, describe, expect, it } from "vitest";

import { removePersistedAgentLiveTerminalSessionByRunId } from "@/features/agent/utils/removePersistedAgentLiveTerminalSessionByRunId";
import {
  AGENT_LIVE_TERMINAL_STORE_KEY,
  readTerminalStore,
} from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("removePersistedAgentLiveTerminalSessionByRunId (AGENT-059)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("removes archived and current sessions for a run id", () => {
    window.localStorage.setItem(
      AGENT_LIVE_TERMINAL_STORE_KEY,
      JSON.stringify({
        current: {
          activeRunId: "run-1",
          output: "working",
          status: "streaming",
          pendingCommandLine: null,
          sessionWriterAgent: "claude-cli",
          sessionDeviceId: "mac-1",
          sessionWriterSessionId: "session-1",
          updatedAt: "2026-07-23T00:00:00.000Z",
        },
        byRunId: {
          "run-2": {
            activeRunId: "run-2",
            output: "done",
            status: "finished",
            pendingCommandLine: null,
            sessionWriterAgent: "claude-cli",
            sessionDeviceId: "mac-1",
            sessionWriterSessionId: "session-2",
            updatedAt: "2026-07-23T00:00:00.000Z",
          },
        },
      }),
    );

    removePersistedAgentLiveTerminalSessionByRunId("run-1");
    removePersistedAgentLiveTerminalSessionByRunId("run-2");

    const store = readTerminalStore();
    expect(store.current).toBeNull();
    expect(store.byRunId).toEqual({});
  });
});
