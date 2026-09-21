import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@agent-witch/install-runtime-client", () => ({
  runHeadlessWriter: vi.fn(),
  runMarketplacePlanEstimateHeadlessWriter: vi.fn(),
}));

import {
  runHeadlessWriter,
  runMarketplacePlanEstimateHeadlessWriter,
} from "@agent-witch/install-runtime-client";

import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "./dispatch/marketplacePlanEstimateReasonCode.constant";

import { runAgentRunPreEstimate } from "./runAgentRunPreEstimate";

describe("runAgentRunPreEstimate (marketplace plan/estimate routing)", () => {
  beforeEach(() => {
    vi.mocked(runHeadlessWriter).mockReset();
    vi.mocked(runMarketplacePlanEstimateHeadlessWriter).mockReset();
  });

  it("uses observable CLI fallback path when Writer API key missing", async () => {
    vi.mocked(runMarketplacePlanEstimateHeadlessWriter).mockResolvedValue({
      exitCode: 0,
      output: "[[WORKING_ESTIMATE]]\n120\n",
      execution: {
        backend: "cli-fallback-missing-anthropic-writer-api-key",
        modelOverride: "claude-3-5-haiku-20241022",
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
      },
    });

    const result = await runAgentRunPreEstimate({
      config: {
        layout: { configPath: "/tmp/.agent-witch/config.json" },
      } as never,
      writerAgent: "claude-cli",
      wrappedPrompt: "Task: build feature",
      reportKey: "report-key",
      agentRunId: "run-1",
      capabilityId: "preset:vibe-coding-app-feature",
    });

    expect(runMarketplacePlanEstimateHeadlessWriter).toHaveBeenCalled();
    expect(result.marketplacePlanEstimate?.backend).toBe(
      "cli-fallback-missing-anthropic-writer-api-key",
    );
    expect(result.estimateSeconds).toBe(120);
  });
});
