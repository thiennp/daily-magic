import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AGENT_WITCH_REOPEN_RUN_INPUT_EVENT,
  requestAgentRunInputModalReopen,
} from "@/features/dispatch/utils/agentRunInputModalEvents";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

describe("requestAgentRunInputModalReopen (afae8216)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("dispatches the reopen event with the request", () => {
    const request: AgentRunInputRequest = {
      agentRunId: "run-1",
      question: "Which branch?",
      partialOutput: "",
    };
    vi.stubGlobal("window", new EventTarget());
    const received: AgentRunInputRequest[] = [];
    const onReopen = (event: Event): void => {
      received.push((event as CustomEvent<AgentRunInputRequest>).detail);
    };
    window.addEventListener(AGENT_WITCH_REOPEN_RUN_INPUT_EVENT, onReopen);
    requestAgentRunInputModalReopen(request);
    window.removeEventListener(AGENT_WITCH_REOPEN_RUN_INPUT_EVENT, onReopen);
    expect(received).toEqual([request]);
  });
});
