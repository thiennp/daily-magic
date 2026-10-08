import { describe, expect, it } from "vitest";

import { stripAgentRunWriterExecutionHonesty } from "./stripAgentRunWriterExecutionHonesty";

describe("stripAgentRunWriterExecutionHonesty", () => {
  it("drops the header and keeps the run output", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      "agentRunWriterExecutionReasonCode=MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY",
      "",
      "All done.",
    ].join("\n");
    expect(stripAgentRunWriterExecutionHonesty(output)).toBe("All done.");
  });

  it("returns output without a header unchanged", () => {
    expect(stripAgentRunWriterExecutionHonesty("plain")).toBe("plain");
  });
});
