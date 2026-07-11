import { describe, expect, it } from "vitest";

import isAgentWitchMessage from "./isAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("isAgentWitchMessage", () => {
  it("accepts valid protocol messages", () => {
    expect(
      isAgentWitchMessage({
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
        payload: { prompt: "hello" },
        requestId: "req-1",
      }),
    ).toBe(true);
  });

  it("rejects unknown message types", () => {
    expect(
      isAgentWitchMessage({
        type: "unknown.type",
        payload: {},
      }),
    ).toBe(false);
  });

  it("rejects invalid payload shapes", () => {
    expect(
      isAgentWitchMessage({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: "invalid",
      }),
    ).toBe(false);
  });
});
