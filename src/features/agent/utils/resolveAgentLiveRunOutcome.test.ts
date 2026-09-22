import { describe, expect, it } from "vitest";

import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

import { MARKETPLACE_CLI_FALLBACK_LOCKED_REASON } from "@/features/agent/utils/agentLiveRunHonestyCopy.constant";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";

describe("resolveAgentLiveRunOutcome", () => {
  it("maps cli-fallback marketplace estimate to degraded with locked copy", () => {
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
    expect(outcome.summaryLines[0]).toContain(
      MARKETPLACE_CLI_FALLBACK_LOCKED_REASON,
    );
  });

  it("maps healthy finish to Success", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "finished",
      output: "All done",
    });

    expect(outcome.kind).toBe("passed");
    expect(outcome.chipLabel).toBe("Success");
  });

  it("never maps streaming to Success", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "streaming",
      output: "",
    });

    expect(outcome.kind).toBe("running");
    expect(outcome.chipLabel).toBe("In progress");
  });

  it("maps pending question to Waiting on you", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "streaming",
      output: "",
      pendingQuestion: "Which folder?",
    });

    expect(outcome.kind).toBe("waiting_you");
    expect(outcome.chipLabel).toBe("Waiting on you");
  });

  it("maps session limit output to Timed out", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "finished",
      output: "You've hit your session limit for now.",
    });

    expect(outcome.kind).toBe("timed_out");
    expect(outcome.chipLabel).toBe("Timed out");
  });

  it("maps stopped by user output to Stopped", () => {
    const outcome = resolveAgentLiveRunOutcome({
      status: "finished",
      output: "Partial\n\nStopped by user.",
    });

    expect(outcome.kind).toBe("stopped");
    expect(outcome.chipLabel).toBe("Stopped");
  });
});
