import { describe, expect, it } from "vitest";

import {
  AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND,
  AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
  AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE,
} from "@agent-witch/shared/dispatch";

import { resolveWriterApiMissingCliFallbackHonesty } from "@/lib/dispatch/resolveWriterApiMissingCliFallbackHonesty";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

describe("resolveWriterApiMissingCliFallbackHonesty", () => {
  it("detects writer execution honesty marker", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
    ].join("\n");

    expect(resolveWriterApiMissingCliFallbackHonesty(output)).toEqual({
      reasonCode: AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE,
    });
  });

  it("still detects marketplace cli-fallback marker", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ].join("\n");

    expect(resolveWriterApiMissingCliFallbackHonesty(output)?.reasonCode).toBe(
      MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
    );
  });
});
