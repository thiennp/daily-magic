import { describe, expect, it } from "vitest";

import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";

describe("resolveAgentLiveRunOutcome", () => {
  it("maps cli-fallback marketplace estimate to degraded", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ].join("\n");

    const outcome = resolveAgentLiveRunOutcome({
      status: "finished",
      output,
    });

    expect(outcome.kind).toBe("degraded");
    expect(outcome.chipLabel).toBe("Completed with fallback");
    expect(outcome.summaryLines[0]).toContain("Writer API key missing");
  });

  it("maps healthy finish to passed", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "finished",
      output: "All done",
    });

    expect(outcome.kind).toBe("passed");
    expect(outcome.chipLabel).toBe("Success");
  });

  it("maps pending question to waiting_you", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "streaming",
      output: "",
      pendingQuestion: "Which folder?",
    });

    expect(outcome.kind).toBe("waiting_you");
    expect(outcome.chipLabel).toBe("Waiting on you");
  });
});

describe("buildAgentLiveProgressSteps run UX honesty", () => {
  it("marks work fallback and finish non-success for cli-fallback", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "[[WORKING_ESTIMATE]]",
      "120",
    ].join("\n");

    const result = buildAgentLiveProgressSteps({
      status: "finished",
      output,
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 120,
    });

    expect(result.outcome.kind).toBe("degraded");
    expect(result.steps.find((step) => step.id === "work")).toMatchObject({
      state: "fallback",
    });
    expect(result.steps.find((step) => step.id === "finish")).toMatchObject({
      state: "fallback",
    });
    expect(result.replyPreview).toBeNull();
    expect(result.humanSummary).toContain("Completed with fallback");
  });

  it("shows empty active copy instead of blank work detail while streaming", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "",
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 90,
    });

    expect(result.steps.find((step) => step.id === "work")?.detail).toBe(
      "Waiting for output…",
    );
  });
});
