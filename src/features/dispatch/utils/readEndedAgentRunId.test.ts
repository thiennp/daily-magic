import { describe, expect, it } from "vitest";

import { readEndedAgentRunId } from "@/features/dispatch/utils/readEndedAgentRunId";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("readEndedAgentRunId (afae8216)", () => {
  it("reads the run id from a result frame", () => {
    expect(
      readEndedAgentRunId(AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT, {
        agentRunId: "run-1",
      }),
    ).toBe("run-1");
  });

  it("ends on a run record only once the run left running", () => {
    const record = AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD;
    expect(
      readEndedAgentRunId(record, { run: { id: "run-1", status: "running" } }),
    ).toBeNull();
    expect(
      readEndedAgentRunId(record, { run: { id: "run-1", status: "failed" } }),
    ).toBe("run-1");
    expect(readEndedAgentRunId(record, { id: "run-1" })).toBeNull();
  });

  it("ignores other frames", () => {
    expect(readEndedAgentRunId("other", { agentRunId: "run-1" })).toBeNull();
  });
});
