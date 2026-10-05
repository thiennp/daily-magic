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

  it("returns false when only OAuth auth failure remains after diagnostics", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "Failed to authenticate. API Error: 401 OAuth access token has expired. Re-authenticate to continue.",
    ].join("\n");

    expect(hasRealAgentRunTerminalWork(output)).toBe(false);
  });

  it("returns false when the only leftover text is a missing CLI binary (AGENT-129)", () => {
    const output = [
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "execvp(3) failed.: No such file or directory",
    ].join("\n");

    expect(hasRealAgentRunTerminalWork(output)).toBe(false);
  });

  it("returns false when a spawn failure is only wrapped in the live shell prompt", () => {
    const output = [
      'agent-witch@mac ~ % claude -p --dangerously-skip-permissions "Draft a proposal"',
      AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
      `agentRunWriterExecutionBackend=${AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND}`,
      `agentRunWriterExecutionReasonCode=${AGENT_RUN_WRITER_EXECUTION_MISSING_WRITER_API_KEY_REASON_CODE}`,
      "execvp(3) failed.: No such file or directory",
      "agent-witch@mac ~ % ",
    ].join("\n");

    expect(hasRealAgentRunTerminalWork(output)).toBe(false);
  });

  it("returns false when only ensure-writer auth timeout remains", () => {
    const output =
      "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s";

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
