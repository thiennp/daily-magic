import { beforeEach, describe, expect, it, vi } from "vitest";

import { runMarketplacePlanEstimateHeadlessWriter } from "./runMarketplacePlanEstimateHeadlessWriter";
import {
  MARKETPLACE_PLAN_ESTIMATE_LOG_FAIL_PREFIX,
  MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX,
  MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
} from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

vi.mock("./callWriterApi", () => ({
  callWriterApi: vi.fn(),
}));

vi.mock("./readWriterApiSecrets", () => ({
  readWriterApiProviderSecret: vi.fn(),
}));

vi.mock("../agentWitchHeadlessWriterRun", () => ({
  runHeadlessWriter: vi.fn(),
}));

import { callWriterApi } from "./callWriterApi";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { runHeadlessWriter } from "../agentWitchHeadlessWriterRun";

const baseConfig = {
  layout: { configPath: "/tmp/.agent-witch/config.json" },
  workspace: "/tmp/project",
} as const;

describe("runMarketplacePlanEstimateHeadlessWriter", () => {
  beforeEach(() => {
    vi.mocked(callWriterApi).mockReset();
    vi.mocked(readWriterApiProviderSecret).mockReset();
    vi.mocked(runHeadlessWriter).mockReset();
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("calls Anthropic Writer API with catalog model override when key exists", async () => {
    vi.mocked(readWriterApiProviderSecret).mockReturnValue({
      apiKey: "sk-test",
    });
    vi.mocked(callWriterApi).mockResolvedValue({
      exitCode: 0,
      output: "plan output",
    });

    const result = await runMarketplacePlanEstimateHeadlessWriter(
      baseConfig as never,
      "claude-cli",
      "estimate task",
      "claude-3-5-haiku-20241022",
    );

    expect(callWriterApi).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "anthropic",
        modelOverride: "claude-3-5-haiku-20241022",
        prompt: "estimate task",
      }),
    );
    expect(runHeadlessWriter).not.toHaveBeenCalled();
    expect(result.exitCode).toBe(0);
    expect(result.execution.backend).toBe("anthropic-writer-api");
    expect(console.log).toHaveBeenCalledWith(
      `${MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX}claude-3-5-haiku-20241022`,
    );
  });

  it("fails plan/estimate when no Anthropic API key (no claude-cli fallback)", async () => {
    vi.mocked(readWriterApiProviderSecret).mockReturnValue(null);

    const result = await runMarketplacePlanEstimateHeadlessWriter(
      baseConfig as never,
      "claude-cli",
      "estimate task",
      "claude-3-5-haiku-20241022",
    );

    expect(callWriterApi).not.toHaveBeenCalled();
    expect(runHeadlessWriter).not.toHaveBeenCalled();
    expect(result.exitCode).toBe(-1);
    expect(result.execution.reasonCode).toBe(
      MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
    );
    expect(console.error).toHaveBeenCalledWith(
      `${MARKETPLACE_PLAN_ESTIMATE_LOG_FAIL_PREFIX}${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY} modelOverride=claude-3-5-haiku-20241022`,
    );
  });
});
