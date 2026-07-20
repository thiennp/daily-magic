import { describe, expect, it } from "vitest";

import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { formatAgentLiveProgressCheckpointRecord } from "@/features/agent/utils/formatAgentLiveProgressCheckpointRecord";

describe("buildAgentLiveProgressSteps checkpoint history (AGENT-042)", () => {
  it("shows prior checkpoint questions and answers as progress steps", () => {
    const firstCheckpoint = formatAgentLiveProgressCheckpointRecord({
      question: "Checkpoint 1 — does the portfolio fit look right?",
      answer: "Yes, looks good.",
    });
    const secondCheckpoint = formatAgentLiveProgressCheckpointRecord({
      question: "Checkpoint 2 — approve the draft?",
      answer: "Go ahead.",
    });

    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: [
        "[[PROGRESS]]",
        "Analyzing portfolio fit",
        "Compared Alpine Outfitters and Strand & Stein.",
        "",
        firstCheckpoint,
        "[[PROGRESS]]",
        "Drafting client proposal",
        "Framing Nordlicht Outdoor scope at 5800 EUR.",
        "",
        secondCheckpoint,
      ].join("\n"),
      pendingCommandLine: 'claude -p "proposal"',
    });

    expect(
      result.steps
        .filter((step) => step.id.startsWith("checkpoint-"))
        .map((step) => [step.label, step.detail]),
    ).toEqual([
      ["Agent asked", "Checkpoint 1 — does the portfolio fit look right?"],
      ["Your answer", "Yes, looks good."],
      ["Agent asked", "Checkpoint 2 — approve the draft?"],
      ["Your answer", "Go ahead."],
    ]);
    expect(result.replyPreview).toBeNull();
  });

  it("keeps the active checkpoint question visible while waiting for an answer", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "paused",
      pendingQuestion: "Checkpoint 3 — send the proposal?",
      partialOutput: [
        "[[PROGRESS]]",
        "Analyzing portfolio fit",
        "Compared Alpine Outfitters and Strand & Stein.",
        "",
        formatAgentLiveProgressCheckpointRecord({
          question: "Checkpoint 1 — does the portfolio fit look right?",
          answer: "Yes.",
        }),
      ].join("\n"),
    });

    expect(
      result.steps
        .filter(
          (step) =>
            step.id.startsWith("checkpoint-") || step.id === "await-input",
        )
        .map((step) => [step.id, step.label, step.detail, step.state]),
    ).toEqual([
      [
        "checkpoint-q-1",
        "Agent asked",
        "Checkpoint 1 — does the portfolio fit look right?",
        "done",
      ],
      ["checkpoint-a-2", "Your answer", "Yes.", "done"],
      [
        "await-input",
        "Waiting for your answer",
        "Checkpoint 3 — send the proposal?",
        "active",
      ],
    ]);
  });
});
