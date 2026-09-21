import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@agent-witch/install-runtime-client", () => ({
  runHeadlessWriter: vi.fn(),
  runMarketplacePlanEstimateHeadlessWriter: vi.fn(),
}));

import {
  runHeadlessWriter,
  runMarketplacePlanEstimateHeadlessWriter,
} from "@agent-witch/install-runtime-client";

import { runAgentRunPreEstimate } from "./runAgentRunPreEstimate";

describe("runAgentRunPreEstimate (marketplace plan/estimate routing)", () => {
  beforeEach(() => {
    vi.mocked(runHeadlessWriter).mockReset();
    vi.mocked(runMarketplacePlanEstimateHeadlessWriter).mockReset();
  });

  it("uses Writer API path when only preset capabilityId is provided", async () => {
    vi.mocked(runMarketplacePlanEstimateHeadlessWriter).mockResolvedValue({
      exitCode: 0,
      output: "[[WORKING_ESTIMATE]]\n120\n",
      execution: {
        backend: "anthropic-writer-api",
        modelOverride: "claude-3-5-haiku-20241022",
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

    expect(runMarketplacePlanEstimateHeadlessWriter).toHaveBeenCalledWith(
      expect.anything(),
      "claude-cli",
      expect.stringContaining("Marketplace vibe-coding run"),
      "claude-3-5-haiku-20241022",
    );
    expect(runHeadlessWriter).not.toHaveBeenCalled();
    expect(result.marketplacePlanEstimate?.backend).toBe(
      "anthropic-writer-api",
    );
    expect(result.marketplacePlanEstimate?.catalogModelId).toBe(
      "claude-3-5-haiku-20241022",
    );
  });
});
