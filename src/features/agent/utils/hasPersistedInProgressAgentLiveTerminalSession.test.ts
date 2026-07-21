import { beforeEach, describe, expect, it } from "vitest";

import {
  clearPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { beginAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { hasPersistedInProgressAgentLiveTerminalSession } from "@/features/agent/utils/hasPersistedInProgressAgentLiveTerminalSession";
import { isInProgressAgentLiveTerminalStatus } from "@/features/agent/utils/isInProgressAgentLiveTerminalStatus";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("hasPersistedInProgressAgentLiveTerminalSession (AGENT-048)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    clearPersistedAgentLiveTerminalState();
  });

  it("is true for in-progress sessions and false when empty", () => {
    expect(hasPersistedInProgressAgentLiveTerminalSession()).toBe(false);

    persistAgentLiveTerminalState(
      beginAgentLiveTerminalSession("cursor agent run", "cursor", "mac-1"),
    );

    expect(hasPersistedInProgressAgentLiveTerminalSession()).toBe(true);
    expect(isInProgressAgentLiveTerminalStatus("streaming")).toBe(true);
    expect(isInProgressAgentLiveTerminalStatus("finished")).toBe(false);
  });
});
