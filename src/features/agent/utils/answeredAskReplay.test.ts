import { describe, expect, it } from "vitest";

import { formatAgentLiveProgressCheckpointRecord } from "@/features/agent/utils/formatAgentLiveProgressCheckpointRecord";
import { isAgentRunQuestionAlreadyAnswered } from "@/features/agent/utils/isAgentRunQuestionAlreadyAnswered";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const RUN_ID = "a0d519de-6635-4657-b1bc-28019d919682";
const QUESTION =
  "Please confirm the app folder, target screen and vibe before I start building.";
const answeredState = () => ({
  ...beginAgentLiveTerminalSession("agy -p task", "antigravity", "dev-1"),
  activeRunId: RUN_ID,
  status: "streaming" as const,
  output: formatAgentLiveProgressCheckpointRecord({
    question: QUESTION,
    answer: "Yes, proceed with your best judgment.",
  }),
});

describe("answered ask replay (2a17ba21)", () => {
  it("matches a capped or prefixed copy of an answered question", () => {
    const output = answeredState().output;
    expect(
      isAgentRunQuestionAlreadyAnswered(
        output,
        `Waiting for your answer: ${QUESTION.slice(0, 50)}…`,
      ),
    ).toBe(true);
    expect(
      isAgentRunQuestionAlreadyAnswered(output, "Which database should I use?"),
    ).toBe(false);
  });

  it("ignores a replayed input_required for an answered ask", () => {
    const next = reduceAgentLiveTerminalMessage(answeredState(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
      payload: { agentRunId: RUN_ID, question: QUESTION },
    });
    expect(next.pendingInput).toBeNull();
  });

  it("closes a heartbeat-opened ask once the host stops waiting", () => {
    const waiting = {
      ...answeredState(),
      output: "",
      pendingInput: {
        agentRunId: RUN_ID,
        question: "Other question?",
        partialOutput: "",
        fromHeartbeat: true,
      },
    };
    const next = reduceAgentLiveTerminalMessage(waiting, {
      type: AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT,
      payload: { agentRunId: RUN_ID, at: "2026-10-08T22:47:49Z" },
    });
    expect(next.pendingInput).toBeNull();
  });
});
