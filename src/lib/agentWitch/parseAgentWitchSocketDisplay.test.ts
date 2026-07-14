import { describe, expect, it } from "vitest";

import parseAgentWitchSocketDisplay from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("parseAgentWitchSocketDisplay", () => {
  it("shows system.error payload text instead of raw JSON", () => {
    const raw = JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "The selected Mac is not online right now.",
      },
      requestId: "d31d87a3-6f81-4b8d-9abd-44b952e8752c",
    });

    expect(parseAgentWitchSocketDisplay(raw)).toEqual({
      text: "The selected Mac is not online right now.",
      isError: true,
    });
  });

  it("formats dispatched ack messages", () => {
    const raw = JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { dispatched: true, agentRunId: "run-1" },
    });

    expect(parseAgentWitchSocketDisplay(raw)).toEqual({
      text: "Task sent to your Mac.",
      isError: false,
    });
  });
});
