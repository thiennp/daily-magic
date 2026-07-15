import { describe, expect, it, beforeEach } from "vitest";

import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { readOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentStore";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("trackOnboardingFromAgentWitchSocketMessage", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("marks first task sent when dispatch is acknowledged", () => {
    trackOnboardingFromAgentWitchSocketMessage(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      }),
    );

    expect(readOnboardingFirstTaskSent()).toBe(true);
  });

  it("marks first task sent when approval is required", () => {
    trackOnboardingFromAgentWitchSocketMessage(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          pendingApproval: true,
          agentRunId: "run-2",
        },
      }),
    );

    expect(readOnboardingFirstTaskSent()).toBe(true);
  });
});
