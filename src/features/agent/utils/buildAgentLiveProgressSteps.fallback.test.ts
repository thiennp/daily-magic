import { describe, expect, it } from "vitest";

import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";

describe("buildAgentLiveProgressSteps fallback work detail", () => {
  it("shows live output under the work step before [[PROGRESS]] arrives", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: [
        "Skimming the Nordlicht brief.",
        "Opening Alpine Outfitters case study next.",
      ].join("\n"),
      pendingCommandLine: 'claude -p "proposal"',
    });

    expect(result.steps.find((step) => step.id === "work")).toMatchObject({
      label: "Reading files and requirements",
      detail:
        "Skimming the Nordlicht brief.\nOpening Alpine Outfitters case study next.",
      state: "active",
    });
  });

  it("shows a waiting hint when streaming has no agent text yet", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "",
      pendingCommandLine: 'claude -p "proposal"',
    });

    expect(result.steps.find((step) => step.id === "work")?.detail).toBe(
      "Waiting for the first update from your Mac agent…",
    );
  });

  it("surfaces waiting for input when a question is pending", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "Need a path\n",
      pendingQuestion: "Which folder?",
    });

    expect(result.steps.find((step) => step.id === "work")?.label).toBe(
      "Waiting for your answer",
    );
    expect(result.steps.find((step) => step.id === "work")?.detail).toBe(
      "Need a path\n\nWhich folder?",
    );
  });

  it("keeps [[PROGRESS]] findings visible while waiting for an answer", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "paused",
      pendingQuestion:
        "Checkpoint 1 — does the portfolio fit look right to you?",
      partialOutput: [
        "[[PROGRESS]]",
        "Analyzing portfolio fit",
        "Alpine Outfitters covers the bilingual PDP; Strand & Stein covers the waitlist landing.",
        "",
      ].join("\n"),
    });

    expect(
      result.steps
        .filter(
          (step) =>
            step.id.startsWith("progress-") || step.id === "await-input",
        )
        .map((step) => [step.id, step.label, step.detail, step.state]),
    ).toEqual([
      [
        "progress-0",
        "Analyzing portfolio fit",
        "Alpine Outfitters covers the bilingual PDP; Strand & Stein covers the waitlist landing.",
        "done",
      ],
      [
        "await-input",
        "Waiting for your answer",
        "Checkpoint 1 — does the portfolio fit look right to you?",
        "active",
      ],
    ]);
  });
});
