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
      output: "Claude is ready on your Mac.\nSend a task from the box below.\n",
    });

    expect(result.steps.map((step) => [step.label, step.state])).toEqual([
      ["Preparing agent on your Mac", "done"],
      ["Ready for your message", "active"],
      ["Working on your request", "pending"],
      ["Finishing up", "pending"],
    ]);
    expect(result.replyPreview).toBeNull();
  });

  it("marks agent started and working while streaming", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "Reading package.json\n",
      pendingCommandLine: 'claude -p "do work"',
    });

    expect(result.steps.find((step) => step.id === "start")?.state).toBe(
      "done",
    );
    expect(result.steps.find((step) => step.id === "work")).toMatchObject({
      label: "Reading files and requirements",
      state: "active",
      detail: null,
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
    expect(result.replyPreview).toBe("Proposal draft coming next.");
  });

  it("strips CLI chrome from the reply preview", () => {
    const result = buildAgentLiveProgressSteps({
      status: "finished",
      output:
        'agent-witch@mac ~ % claude -p "hi"\nHello there\nagent-witch@mac ~ % ',
    });

    expect(result.replyPreview).toBe("Hello there");
    expect(result.steps.find((step) => step.id === "finish")?.state).toBe(
      "done",
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
  });
});
