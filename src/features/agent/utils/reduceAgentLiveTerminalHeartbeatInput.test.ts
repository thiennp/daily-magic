import { describe, expect, it } from "vitest";

import { formatAgentLiveProgressCheckpointRecord } from "@/features/agent/utils/formatAgentLiveProgressCheckpointRecord";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const RUN_ID = "9b899065-cdb2-436d-b3c6-5196c7644ce3";
const QUESTION =
  "Can you confirm that the vibe, target screens, and app folder path are correct to proceed?";

const streamingState = () => ({
  ...beginAgentLiveTerminalSession("agy -p task", "antigravity", "dev-1"),
  activeRunId: RUN_ID,
  status: "streaming" as const,
});

const heartbeat = (payload: Record<string, unknown>) => ({
  type: AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT,
  payload: { agentRunId: RUN_ID, at: "2026-10-08T14:32:05Z", ...payload },
});

describe("floater checkpoint from the paused run's heartbeat (9c8a811d)", () => {
  it("opens the ask when input_required was missed", () => {
    const next = reduceAgentLiveTerminalMessage(
      streamingState(),
      heartbeat({
        awaitingInput: true,
        reportSummary: `Waiting for your answer: ${QUESTION}`,
      }),
    );

    expect(next.pendingInput).toEqual({
      agentRunId: RUN_ID,
      question: QUESTION,
      partialOutput: "",
      fromHeartbeat: true,
    });
  });

  it("ignores other runs, running heartbeats and other summaries", () => {
    const state = streamingState();
    const asks = [
      { ...heartbeat({ awaitingInput: true }), payload: { agentRunId: "x" } },
      heartbeat({ reportSummary: `Waiting for your answer: ${QUESTION}` }),
      heartbeat({ awaitingInput: true, reportSummary: "Working on it." }),
    ];

    for (const message of asks) {
      expect(reduceAgentLiveTerminalMessage(state, message).pendingInput).toBe(
        null,
      );
    }
  });

  it("keeps a real input_required ask and never re-asks an answered one", () => {
    const withAsk = {
      ...streamingState(),
      pendingInput: {
        agentRunId: RUN_ID,
        question: "Full?",
        partialOutput: "",
      },
    };
    const answered = {
      ...streamingState(),
      output: formatAgentLiveProgressCheckpointRecord({
        question: QUESTION,
        answer: "Confirmed.",
      }),
    };
    const message = heartbeat({
      awaitingInput: true,
      reportSummary: `Waiting for your answer: ${QUESTION.slice(0, 40)}...`,
    });

    expect(
      reduceAgentLiveTerminalMessage(withAsk, message).pendingInput?.question,
    ).toBe("Full?");
    expect(reduceAgentLiveTerminalMessage(answered, message).pendingInput).toBe(
      null,
    );
  });
});
