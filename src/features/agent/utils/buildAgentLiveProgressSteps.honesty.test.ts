import { describe, expect, it } from "vitest";

import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

import { CLAUDE_LOGIN_EXPIRED_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";

import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";

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
    expect(result.steps.some((step) => step.id === "finish")).toBe(false);
    expect(result.replyPreview).toBeNull();
    expect(result.humanSummary).toContain("Completed with fallback");
    expect(result.humanSummary).toContain("ran via CLI fallback");
  });

  it("never shows Success when finished with empty work body", () => {
    const result = buildAgentLiveProgressSteps({
      status: "finished",
      output: "",
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 90,
    });

    expect(result.outcome.kind).toBe("failed");
    expect(result.outcome.chipLabel).toBe("Failed");
    expect(result.steps.some((step) => step.id === "finish")).toBe(false);
  });

  it("shows Connecting while starting before log attaches", () => {
    const result = buildAgentLiveProgressSteps({
      status: "starting",
      output: "",
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 90,
    });

    expect(result.outcome.kind).toBe("connecting");
    expect(result.outcome.chipLabel).toBe("Connecting");
    expect(result.steps.some((step) => step.id === "finish")).toBe(false);
  });

  it("maps ensure-writer timeout to Waiting on you on the floater (Testi state 3)", () => {
    const output =
      "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s";

    const result = buildAgentLiveProgressSteps({
      status: "finished",
      output,
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 120,
    });

    expect(result.outcome.kind).toBe("waiting_you");
    expect(result.outcome.chipLabel).toBe("Waiting on you");
    expect(result.humanSummary).toContain(CLAUDE_LOGIN_EXPIRED_LOCKED_REASON);
  });

  it("shows Waiting for output… while streaming with empty work body", () => {
    const result = buildAgentLiveProgressSteps({
      status: "streaming",
      output: "",
      pendingCommandLine: 'claude -p "demo"',
      estimateSeconds: 90,
    });

    expect(result.outcome.chipLabel).toBe("In progress");
    expect(result.steps.find((step) => step.id === "work")?.detail).toBe(
      "Waiting for output…",
    );
  });
});
