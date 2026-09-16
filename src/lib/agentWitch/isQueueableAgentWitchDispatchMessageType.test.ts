import { describe, expect, it } from "vitest";

import { isQueueableAgentWitchDispatchMessageType } from "@/lib/agentWitch/isQueueableAgentWitchDispatchMessageType";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("isQueueableAgentWitchDispatchMessageType", () => {
  it("allows writer runs, harness, and automation messages", () => {
    expect(
      isQueueableAgentWitchDispatchMessageType(
        AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      ),
    ).toBe(true);
    expect(
      isQueueableAgentWitchDispatchMessageType(
        AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      ),
    ).toBe(true);
    expect(
      isQueueableAgentWitchDispatchMessageType(
        AGENT_WITCH_MESSAGE_TYPES.AUTOMATIONS_SYNC,
      ),
    ).toBe(true);
  });

  it("rejects live session message types", () => {
    expect(
      isQueueableAgentWitchDispatchMessageType(
        AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      ),
    ).toBe(false);
  });
});
