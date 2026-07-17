import { describe, expect, it } from "vitest";

import { shouldUpdateAgentWitchSocketDisplay } from "@/lib/agentWitch/shouldUpdateAgentWitchSocketDisplay";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("shouldUpdateAgentWitchSocketDisplay", () => {
  it("keeps system.error as a display update", () => {
    expect(
      shouldUpdateAgentWitchSocketDisplay(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: { errorMessage: "Mac offline" },
        }),
      ),
    ).toBe(true);
  });

  it("skips shell.data so stream chunks do not clear errors", () => {
    expect(
      shouldUpdateAgentWitchSocketDisplay(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA,
          payload: { chunk: "$ ls\n" },
        }),
      ),
    ).toBe(false);
  });

  it("skips terminal.stream.chunk", () => {
    expect(
      shouldUpdateAgentWitchSocketDisplay(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
          payload: { chunk: "hello" },
        }),
      ),
    ).toBe(false);
  });

  it("skips shell-only system.ack so open/attach does not clear errors", () => {
    expect(
      shouldUpdateAgentWitchSocketDisplay(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
          payload: { shellSessionId: "shell-1", opened: true },
        }),
      ),
    ).toBe(false);
  });
});
