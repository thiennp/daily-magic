import { describe, expect, it } from "vitest";

import parseAgentWitchMessage from "./parseAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

describe("parseAgentWitchMessage", () => {
  it("parses valid JSON messages", () => {
    expect(
      parseAgentWitchMessage(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
          payload: { role: "agent" },
        }),
      ),
    ).toEqual({
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
      payload: { role: "agent" },
    });
  });

  it("returns null for invalid JSON", () => {
    expect(parseAgentWitchMessage("{not-json")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(parseAgentWitchMessage("   ")).toBeNull();
  });
});
