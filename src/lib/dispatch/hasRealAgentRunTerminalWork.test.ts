import { describe, expect, it } from "vitest";

import {
  AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND,
  AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
  AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE,
} from "@agent-witch/shared/dispatch";

import { hasRealAgentRunTerminalWork } from "@/lib/dispatch/hasRealAgentRunTerminalWork";

describe("hasRealAgentRunTerminalWork", () => {
  it("returns false when only honesty marker and stop line are present", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "Stopped by user.",
    ].join("\n");

    expect(hasRealAgentRunTerminalWork(output)).toBe(false);
  });

  it("returns true when CLI output exists beyond diagnostics", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "claude -p hello",
      "Stopped by user.",
    ].join("\n");

    expect(hasRealAgentRunTerminalWork(output)).toBe(true);
  });
});
