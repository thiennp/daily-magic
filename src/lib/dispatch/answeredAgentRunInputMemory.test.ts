import { describe, expect, it } from "vitest";

import {
  ANSWERED_INPUT_HEARTBEAT_GRACE_MS,
  ANSWERED_INPUT_REPLAY_WINDOW_MS,
  AnsweredAgentRunInputMemory,
} from "@/lib/dispatch/answeredAgentRunInputMemory";

const RESPOND = {
  type: "command.claude.input_respond",
  payload: { agentRunId: "run-1", response: "Yes" },
} as const;

describe("AnsweredAgentRunInputMemory (2a17ba21)", () => {
  it("drops a late awaitingInput heartbeat right after an answer", () => {
    const memory = new AnsweredAgentRunInputMemory();
    memory.remember("run-1", "Proceed?", RESPOND, 1_000);
    expect(memory.isInHeartbeatGrace("run-1", 1_500)).toBe(true);
    expect(
      memory.isInHeartbeatGrace(
        "run-1",
        1_000 + ANSWERED_INPUT_HEARTBEAT_GRACE_MS + 1,
      ),
    ).toBe(false);
    expect(memory.isInHeartbeatGrace("run-2", 1_500)).toBe(false);
  });

  it("answers a re-sent ask again instead of reopening it", () => {
    const memory = new AnsweredAgentRunInputMemory();
    memory.remember("run-1", "Proceed  with the plan?", RESPOND, 1_000);
    expect(
      memory.findReplayAnswer("run-1", "proceed with the plan?", 2_000),
    ).toBe(RESPOND);
    expect(memory.findReplayAnswer("run-1", "Another question?", 2_000)).toBe(
      null,
    );
    expect(
      memory.findReplayAnswer(
        "run-1",
        "Proceed with the plan?",
        1_000 + ANSWERED_INPUT_REPLAY_WINDOW_MS + 1,
      ),
    ).toBe(null);
  });
});
