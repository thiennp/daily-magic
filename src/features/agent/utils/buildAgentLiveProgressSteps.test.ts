import { describe, expect, it } from "vitest";

import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";

describe("buildAgentLiveProgressSteps", () => {
  it("shows prepare as active before any work starts", () => {
    const result = buildAgentLiveProgressSteps({
      status: "idle",
      output: "",
    });

    expect(result.steps.map((step) => step.state)).toEqual([
      "active",
      "pending",
      "pending",
      "pending",
    ]);
    expect(result.replyPreview).toBeNull();
  });

  it("stays on prepare when only the ready banner is present", () => {
    const result = buildAgentLiveProgressSteps({
      status: "idle",
      output:
        "Claude is ready on your Mac.\nUse New task below when you are ready.\n",
    });

    expect(result.steps.map((step) => [step.label, step.state])).toEqual([
      ["Preparing agent", "done"],
      ["Ready for your message", "active"],
      ["Analyzing…", "pending"],
      ["Working…", "pending"],
    ]);
    expect(result.replyPreview).toBeNull();
  });

  it("marks agent started and working while streaming", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "Reading package.json\n",
      pendingCommandLine: 'claude -p "do work"',
      estimateSeconds: 120,
    });

    expect(result.steps.find((step) => step.id === "start")?.state).toBe(
      "done",
    );
    expect(result.steps.find((step) => step.id === "estimate")).toMatchObject({
      label: "Analyzing…",
      state: "done",
      detail: "About 2 min for this run planned",
    });
    expect(result.steps.find((step) => step.id === "work")).toMatchObject({
      label: "Reading files and requirements",
      state: "active",
      detail: "Reading package.json",
    });
  });

  it("expands agent [[PROGRESS]] blocks into detailed steps", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: [
        "[[PROGRESS]]",
        "Reading portfolio files",
        "Opened brief.md and quotes.md",
        "",
        "[[PROGRESS]]",
        "Drafting client proposal",
        "Framing Nordlicht Outdoor scope at 5800 EUR",
        "",
        "Proposal draft coming next.",
      ].join("\n"),
      pendingCommandLine: 'claude -p "proposal"',
    });

    expect(
      result.steps
        .filter((step) => step.id.startsWith("progress-"))
        .map((step) => [step.label, step.detail, step.state]),
    ).toEqual([
      ["Reading portfolio files", "Opened brief.md and quotes.md", "done"],
      [
        "Drafting client proposal",
        "Framing Nordlicht Outdoor scope at 5800 EUR",
        "active",
      ],
    ]);
    expect(result.replyPreview).toBeNull();
    expect(result.humanSummary).toBeNull();
  });

  it("strips CLI chrome and surfaces Success outcome on finish", () => {
    const result = buildAgentLiveProgressSteps({
      status: "finished",
      output:
        'agent-witch@mac ~ % claude -p "hi"\nHello there\nagent-witch@mac ~ % ',
    });

    expect(result.replyPreview).toBeNull();
    expect(result.outcome.kind).toBe("passed");
    expect(result.outcome.chipLabel).toBe("Success");
    expect(result.steps.some((step) => step.id === "finish")).toBe(false);
  });
});
